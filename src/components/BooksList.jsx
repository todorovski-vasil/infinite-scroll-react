import React, { useState, useRef, useCallback } from 'react';
import {
    sortByBookName,
    sortByAuthorName,
    applyFilters
} from '../utils/bookListTransformations';
import Navbar from './Navbar';
import { useEffect } from 'react';
import InfiniteList from './InfiniteList';
import Loader from './Loader/Loader';

const ALL = 'all';
const PAGE_SIZE = 1000;
const PAGE_WINDOW_SHIFT = 0.1;

const generateSetterWithCallback = hookStateSetter => {
    return (loading, callback) => {
        if (callback) {
            if (typeof loading == 'function') {
                hookStateSetter(l => {
                    setTimeout(callback, 0);
                    return loading(l);
                });
            } else {
                hookStateSetter(() => {
                    setTimeout(callback, 0);
                    return loading;
                });
            }
        } else {
            if (typeof loading == 'function') {
                return new Promise(resolve => {
                    hookStateSetter(l => {
                        setTimeout(resolve, 0);
                        return loading(l);
                    });
                });
            } else {
                return new Promise(resolve => {
                    hookStateSetter(() => {
                        setTimeout(resolve, 0);
                        return loading;
                    });
                });
            }
        }
    };
};

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
    const [loading, setLoading] = useState(false);
    const setLoadingState = generateSetterWithCallback(setLoading);

    const availableBooksRef = useRef(availableBooks);
    useEffect(() => {
        availableBooksRef.current = availableBooks;
    }, [availableBooks]);
    // const loadingRef = useRef(loading);
    // useEffect(() => {
    //     loadingRef.current = loading;
    // }, [loading]);

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
    }, [visibleBooks, handleScroll]);

    return (
        <>
            <Navbar
                genreFilter={genreFilter}
                genderFilter={genderFilter}
                genres={['', ...props.genres]}
                onOrderByBookName={() => {
                    setLoadingState(
                        l => true,
                        () => {
                            setStartIndex(i => 0);
                            setAvailableBooks(a => sortByBookName(a));
                        }
                    );
                }}
                onOrderByAuthorName={() => {
                    // setLoadingState(true, () => {
                    //     setStartIndex(i => 0);
                    //     setAvailableBooks(a => sortByAuthorName(a));
                    // });
                    setLoadingState(true).then(() => {
                        // if (loadingRef.current) {
                        setStartIndex(i => 0);
                        setAvailableBooks(a => sortByAuthorName(a));
                        // }
                    });
                }}
                onGenderChange={event => {
                    setLoading(true);
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
                    setLoading(true);
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
            {loading ? <Loader /> : null}
            <InfiniteList visibleBooks={visibleBooks} />
        </>
    );
}

export default BooksList;
