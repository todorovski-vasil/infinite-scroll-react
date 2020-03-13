import React, { useState, useRef, useCallback } from 'react';
import {
    orderByBookName,
    orderByAuthorName,
    applyFilters
} from '../utils/bookListTransformations';
import Navbar from './Navbar';
import { useEffect } from 'react';
import InfiniteList from './InfiniteList';

const ALL = 'all';
const PAGE_SIZE = 1000;

let handleScrollEvents = true;

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

    const availableBooksRef = useRef(availableBooks);
    useEffect(() => {
        availableBooksRef.current = availableBooks;
    }, [availableBooks]);

    const loadDown = useCallback(() => {
        setStartIndex(i => {
            if (i + PAGE_SIZE < availableBooksRef.current.length) {
                return i + 100;
            } else {
                handleScrollEvents = true;
                return i;
            }
        });
    }, [setStartIndex]);

    const loadUp = useCallback(() => {
        setStartIndex(i => {
            if (i >= 100) {
                return i - 100;
            } else {
                handleScrollEvents = true;
                return i;
            }
        });
    }, [setStartIndex]);

    const handleScroll = useCallback(
        event => {
            if (handleScrollEvents) {
                var lastLi = document.querySelector('ul > li:last-child');
                var lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
                var pageOffset = window.pageYOffset + window.innerHeight;
                if (pageOffset > lastLiOffset * 0.9) {
                    handleScrollEvents = false;
                    loadDown();
                } else if (pageOffset < lastLiOffset * 0.1) {
                    handleScrollEvents = false;
                    loadUp();
                }
            }
        },
        [loadDown, loadUp]
    );

    useEffect(() => {
        document.addEventListener('scroll', handleScroll, true);
        return () => document.removeEventListener('scroll', handleScroll, true);
    }, [handleScroll]);

    useEffect(() => {
        setVisibleBooks(() => {
            handleScrollEvents = true;
            return availableBooks.slice(startIndex, startIndex + PAGE_SIZE);
        });
    }, [availableBooks, startIndex]);

    return (
        <>
            <Navbar
                onOrderByBookName={() => {
                    setStartIndex(i => 0);
                    setAvailableBooks(a =>
                        orderByBookName(a, {
                            genreFilter,
                            genderFilter
                        })
                    );
                }}
                onOrderByAuthorName={() => {
                    setStartIndex(i => 0);
                    setAvailableBooks(a =>
                        orderByAuthorName(a, {
                            genreFilter,
                            genderFilter
                        })
                    );
                }}
                genreFilter={genreFilter}
                genderFilter={genderFilter}
                genres={props.genres}
                onGenderChange={event => {
                    const genderFilter =
                        event.target.value === ALL ? null : event.target.value;
                    setGenderFilter(genderFilter);
                    setStartIndex(i => 0);
                    setAvailableBooks(
                        applyFilters(props.books, {
                            genreFilter,
                            genderFilter
                        })
                    );
                }}
                onGenreChange={event => {
                    const genreFilter =
                        event.target.value === ALL ? null : event.target.value;
                    setGenreFilter(genreFilter);
                    setStartIndex(i => 0);
                    setAvailableBooks(
                        applyFilters(props.books, {
                            genreFilter,
                            genderFilter
                        })
                    );
                }}
            ></Navbar>
            <InfiniteList visibleBooks={visibleBooks} />
        </>
    );
}

export default BooksList;
