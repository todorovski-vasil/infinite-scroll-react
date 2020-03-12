import React, { useState, useRef, useCallback } from 'react';
import {
    orderByBookName,
    orderByAuthorName,
    applyFilters
} from '../utils/bookListTransformations';
import Navbar from './Navbar';
import { useEffect } from 'react';
import InfiniteList from './InfiniteList';

// const FICTION = 'fiction',
//     DRAMA = 'drama',
//     POETRY = 'poetry',
//     FINANCE = 'finance',
//     HOROR = 'horror';
const PAGE_SIZE = 1000;

let handleScrollEvents = true;

function BooksList(props) {
    let [startIndex, setStartIndex] = useState(0);
    const [genreFilter, setGenreFilter] = useState(null);
    const [genderFilter, setGenderFilter] = useState(null);
    const [availableBooks, _setAvailableBooks] = useState([...props.books]);
    const availableBooksRef = useRef(availableBooks);
    const setAvailableBooks = a => {
        _setAvailableBooks(a);
    };
    const [visibleBooks, setVisibleBooks] = useState(
        props.books.filter(
            (book, index) =>
                index > startIndex && index < startIndex + PAGE_SIZE
        )
    );

    const loadDown = useCallback(() => {
        // console.log('loadDown: startIndex = ' + startIndex);
        setStartIndex(i => {
            // console.log(
            //     'loadDown: startIndex = ' + i + ' (inside setStartIndex)'
            // );
            // console.log(
            //     'availableBooks.length: ' +
            //         availableBooksRef.current.length +
            //         ' (inside setStartIndex)'
            // );
            if (i + PAGE_SIZE < availableBooksRef.current.length) {
                return i + 100;
            } else {
                handleScrollEvents = true;
                return i;
            }
        });
    }, [startIndex, availableBooks]);

    const loadUp = () => {
        // console.log('loadUp: startIndex = ' + startIndex);
        setStartIndex(i => {
            // console.log(
            //     'loadUp: startIndex = ' + i + ' (inside setStartIndex)'
            // );
            if (i >= 100) {
                return i - 100;
            } else {
                handleScrollEvents = true;
                return i;
            }
        });
    };

    const handleScroll = event => {
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
    };

    useEffect(() => {
        document.addEventListener('scroll', handleScroll, true);
        return () => document.removeEventListener('scroll', handleScroll, true);
    }, []);

    // useEffect(() => {
    //     // console.log('startIndex: ' + startIndex);
    //     // return () => console.log('startIndex old value: ' + startIndex);
    // }, [startIndex]);

    // useEffect(() => {
    //     // console.log('availableBooks changed');
    //     // return () => console.log('availableBooks will change');
    // }, [availableBooks]);

    useEffect(() => {
        setVisibleBooks(() => {
            handleScrollEvents = true;
            return availableBooks.slice(startIndex, startIndex + PAGE_SIZE);
        });
        // console.log('availableBooks or startIndex changed');
        // return () => console.log('availableBooks or startIndex will change');
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
                        event.target.value === 'all'
                            ? null
                            : event.target.value;
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
                        event.target.value === 'all'
                            ? null
                            : event.target.value;
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
