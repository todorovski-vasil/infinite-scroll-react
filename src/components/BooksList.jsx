import React, { useState, useEffect, useCallback } from 'react';
import {
    sortByBookName,
    sortByAuthorName,
    applyFilters
} from '../utils/bookListTransformations';
import Navbar from './Navbar/Navbar';
import InfiniteList from './InfiniteList';
import Loader from './Loader/Loader';

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

    useEffect(() => {
        setLoading(false);
    }, [visibleBooks]);

    const handleScroll = useCallback(
        direction => {
            switch (direction) {
                case 'down':
                    if (startIndex + PAGE_SIZE < availableBooks.length) {
                        setStartIndex(i => i + PAGE_SIZE * PAGE_WINDOW_SHIFT);
                    }
                    break;
                case 'up':
                    if (startIndex >= PAGE_SIZE * PAGE_WINDOW_SHIFT) {
                        setStartIndex(i => i - PAGE_SIZE * PAGE_WINDOW_SHIFT);
                    }
                    break;
                default:
                    console.error(
                        'unsuported scroll direction received in Booklist.jsx handleScroll handler: ' +
                            direction
                    );
            }
        },
        [startIndex, availableBooks]
    );

    return (
        <div>
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
                    setStartIndex(0);
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
            <InfiniteList
                visibleBooks={visibleBooks}
                handleScroll={handleScroll}
                scrollTriggerRatio={PAGE_WINDOW_SHIFT}
            />
        </div>
    );
}

export default BooksList;
