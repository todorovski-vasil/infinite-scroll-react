import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    sortByBookName,
    sortByAuthorName,
    applyFilters
} from '../utils/bookListTransformations';
import Navbar from './Navbar/Navbar';
import InfiniteList from './InfiniteList';
import Loader from './Loader/Loader';
import { useStateProper } from '../hooks/useStateProper';

const ALL = 'all';
const PAGE_SIZE = 1000;
const PAGE_WINDOW_SHIFT = 0.1;

function BooksList(props) {
    let [startIndex, setStartIndex] = useState(0);
    const [genreFilter, setGenreFilter] = useState(null);
    const [genderFilter, setGenderFilter] = useState(null);
    const [availableBooks, setAvailableBooks] = useState([...props.books]);
    const [visibleBooks, setVisibleBooks] = useState(
        props.books.filter(
            (book, index) =>
                index > startIndex && index < startIndex + PAGE_SIZE
        )
    );
    const [loading, setLoading] = useStateProper(false);

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
        setVisibleBooks(() => {
            return availableBooks.slice(startIndex, startIndex + PAGE_SIZE);
        });
    }, [availableBooks, startIndex]);

    useEffect(() => {
        setLoading(false);
        document.addEventListener('scroll', handleScroll, true);
    }, [visibleBooks, handleScroll, setLoading]);

    return (
        <>
            {loading ? <Loader /> : null}
            <Navbar
                genreFilter={genreFilter}
                genderFilter={genderFilter}
                genres={['', ...props.genres]}
                onOrderByBookName={() => {
                    setLoading(true, ld => {
                        setStartIndex(i => 0);
                        setAvailableBooks(a => sortByBookName(a));
                        setLoading(!ld);
                    });
                }}
                onOrderByAuthorName={() => {
                    setLoading(l => true).then(ld => {
                        setStartIndex(i => 0);
                        setAvailableBooks(a => sortByAuthorName(a));
                        setLoading(!ld);
                    });
                }}
                onGenderChange={event => {
                    const selectedGender = event.target.value;
                    setLoading(true).then(ld => {
                        const genderFilter =
                            selectedGender === ALL ? null : selectedGender;
                        setGenderFilter(genderFilter);
                        setStartIndex(i => 0);
                        setAvailableBooks(
                            applyFilters(props.books, {
                                genreFilter,
                                genderFilter
                            })
                        );
                        setLoading(!ld);
                    });
                }}
                onGenreChange={event => {
                    const selectedGenre = event.target.value;
                    setLoading(
                        l => true,
                        ld => {
                            const genreFilter =
                                selectedGenre === ALL ? null : selectedGenre;
                            setGenreFilter(genreFilter);
                            setStartIndex(i => 0);
                            setAvailableBooks(
                                applyFilters(props.books, {
                                    genreFilter,
                                    genderFilter
                                })
                            );
                            setLoading(!ld);
                        }
                    );
                }}
            ></Navbar>
            <InfiniteList visibleBooks={visibleBooks} />
        </>
    );
}

export default BooksList;
