import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    sortByBookName,
    sortByAuthorName,
    applyFilters
} from '../utils/bookListTransformations';
import Navbar from './Navbar/Navbar';
import InfiniteList from './InfiniteList';
import Loader from './Loader/Loader';
// import { useStateProper } from '../hooks/useStateProper';

const ALL = 'all';
const PAGE_SIZE = 1000;
const PAGE_WINDOW_SHIFT = 0.1;

const indexedDBAvailable = window.indexedDB ? true : false;
if (indexedDBAvailable) {
    console.log(
        'Your browser supports a stable version of IndexedDB. High performance operation will be available.'
    );
} else {
    console.log(
        "Your browser doesn't support a stable version of IndexedDB. High performance operation will not be available."
    );
}

function BooksList(props) {
    let [startIndex, setStartIndex] = useState(0);
    const [genreFilter, setGenreFilter] = useState(null);
    const [genderFilter, setGenderFilter] = useState(null);
    const [scheduledSortByBookName, setScheduledSortByBookName] = useState(
        false
    );
    const [scheduledSortByAuthorName, setScheduledSortByAuthorName] = useState(
        false
    );
    const [availableBooks, setAvailableBooks] = useState([...props.books]);
    const [visibleBooks, setVisibleBooks] = useState(
        props.books.filter(
            (book, index) =>
                index > startIndex && index < startIndex + PAGE_SIZE
        )
    );
    // const [loading, setLoading] = useStateProper(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (scheduledSortByBookName) {
            setTimeout(() => {
                setAvailableBooks(a => sortByBookName(a));
                setScheduledSortByBookName(false);
            }, 0);
        }
    }, [scheduledSortByBookName]);

    useEffect(() => {
        if (scheduledSortByAuthorName) {
            setTimeout(() => {
                setAvailableBooks(a => sortByAuthorName(a));
                setScheduledSortByAuthorName(false);
            }, 0);
        }
    }, [scheduledSortByAuthorName]);

    useEffect(() => {
        setTimeout(() => {
            setAvailableBooks(
                applyFilters(props.books, {
                    genreFilter,
                    genderFilter
                })
            );
            setLoading(false);
        }, 0);
    }, [genreFilter, genderFilter, props.books]);

    useEffect(() => {
        setVisibleBooks(() => {
            return availableBooks.slice(startIndex, startIndex + PAGE_SIZE);
        });
    }, [availableBooks, startIndex]);

    const availableBooksRef = useRef(availableBooks);
    useEffect(() => {
        availableBooksRef.current = availableBooks;
    }, [availableBooks]);

    const handleScroll = useCallback(() => {
        const loadUp = () => {
            setStartIndex(i => {
                if (i >= PAGE_SIZE * PAGE_WINDOW_SHIFT) {
                    return i - PAGE_SIZE * PAGE_WINDOW_SHIFT;
                } else {
                    document.addEventListener('scroll', handleScroll, true);
                    return i;
                }
            });
        };

        const loadDown = () => {
            setStartIndex(i => {
                if (i + PAGE_SIZE < availableBooksRef.current.length) {
                    return i + PAGE_SIZE * PAGE_WINDOW_SHIFT;
                } else {
                    document.addEventListener('scroll', handleScroll, true);
                    return i;
                }
            });
        };

        document.removeEventListener('scroll', handleScroll, true);

        var lastLi = document.querySelector('ul > li:last-child');
        var lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
        var pageOffset = window.pageYOffset + window.innerHeight;
        if (pageOffset > lastLiOffset * (1 - PAGE_WINDOW_SHIFT)) {
            loadDown();
        } else if (pageOffset < lastLiOffset * PAGE_WINDOW_SHIFT) {
            loadUp();
        } else {
            document.addEventListener('scroll', handleScroll, true);
        }
    }, [setStartIndex]);

    useEffect(() => {
        document.addEventListener('scroll', handleScroll, true);
        return () => document.removeEventListener('scroll', handleScroll, true);
    }, [handleScroll]);

    useEffect(() => {
        setLoading(false);
        document.addEventListener('scroll', handleScroll, true);
    }, [visibleBooks, handleScroll]);

    return (
        <>
            {loading ? <Loader /> : null}
            <Navbar
                genreFilter={genreFilter}
                genderFilter={genderFilter}
                genres={['', ...props.genres]}
                onOrderByBookName={() => {
                    setLoading(true);
                    setScheduledSortByBookName(true);
                    setStartIndex(0);
                }}
                onOrderByAuthorName={() => {
                    setLoading(true);
                    setScheduledSortByAuthorName(true);
                    setStartIndex(i => 0);
                }}
                onGenderChange={event => {
                    setLoading(true);
                    setGenderFilter(
                        event.target.value === ALL ? null : event.target.value
                    );
                    setStartIndex(0);
                }}
                onGenreChange={event => {
                    setLoading(true);
                    setGenreFilter(
                        event.target.value === ALL ? null : event.target.value
                    );
                    setStartIndex(0);
                }}
            ></Navbar>
            <InfiniteList visibleBooks={visibleBooks} />
        </>
    );
}

export default BooksList;
