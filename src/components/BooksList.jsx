import React, { useCallback, useReducer, useEffect } from 'react';

import Navbar from './Navbar/Navbar';
import InfiniteList from './InfiniteList';
import Loader from './Loader/Loader';
import * as actions from '../store/actions/books';
import {
    booksReducer,
    initialState as initialBooksState,
} from '../store/reducers/books';
import { applyBooksMiddleware } from '../store/middleware/booksMiddleware';

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
    const [state, booksDispatch] = useReducer(booksReducer, initialBooksState);

    const dispatch = applyBooksMiddleware(state, booksDispatch);

    const {
        visibleBooks,
        genres,
        availableBooks,
        startIndex,
        genreFilter,
        authorGenderFilter,
        isLoading,
    } = state;

    useEffect(() => {
        booksDispatch(actions.setLoading(true));
        booksDispatch(
            actions.setBooks({ books: props.books, genres: props.genres })
        );
    }, [props.books, props.genres, booksDispatch]);

    // const initState = useCallback(
    //     (books, genres) => {
    //         dispatch(actions.setLoading(true));
    //         dispatch(actions.setBooks({ books, genres }));
    //     },
    //     [dispatch]
    // );

    // useEffect(() => initState(props.books, props.genres), [
    //     props.books,
    //     props.genres,
    //     initState,
    // ]);

    const changeScrollIndex = useCallback(
        (newIndex) => {
            dispatch(actions.setStartIndex(newIndex));
        },
        [dispatch]
    );

    const handleScroll = useCallback(
        (direction) => {
            switch (direction) {
                case 'down':
                    if (startIndex + PAGE_SIZE < availableBooks.length) {
                        changeScrollIndex(
                            startIndex + PAGE_SIZE * PAGE_WINDOW_SHIFT
                        );
                    }
                    break;
                case 'up':
                    if (startIndex >= PAGE_SIZE * PAGE_WINDOW_SHIFT) {
                        changeScrollIndex(
                            startIndex - PAGE_SIZE * PAGE_WINDOW_SHIFT
                        );
                    }
                    break;
                default:
                    console.error(
                        'unsuported scroll direction received in Booklist.jsx handleScroll handler: ' +
                            direction
                    );
            }
        },
        [startIndex, availableBooks, changeScrollIndex]
    );

    return (
        <div>
            {isLoading ? <Loader /> : null}
            <Navbar
                genreFilter={genreFilter}
                genderFilter={authorGenderFilter}
                genres={['', ...genres]}
                onOrderByBookName={() => {
                    // setOrderByName();
                    dispatch(actions.setOrderByName());
                }}
                onOrderByAuthorName={() => {
                    // setOrderByAuthorName();
                    dispatch(actions.setOrderByAuthorName());
                }}
                onAuthorGenderChange={(event) => {
                    const filter =
                        event.target.value === ALL ? null : event.target.value;
                    // setAuthorGenderFilter(filter);
                    dispatch(actions.setAuthorGenderFilter(filter));
                }}
                onGenreChange={(event) => {
                    const filter =
                        event.target.value === ALL ? null : event.target.value;
                    // setGenreFilter(filter);
                    dispatch(actions.setGenreFilter(filter));
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
