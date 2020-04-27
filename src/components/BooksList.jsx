import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Navbar from './Navbar/Navbar';
import InfiniteList from './InfiniteList';
import Loader from './Loader/Loader';
import * as actions from '../store/actions/books';

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
    const genres = useSelector((state) => state.genres);
    const availableBooks = useSelector((state) => state.availableBooks);
    // const visibleBooks = useSelector((state) => state.visibleBooks);
    const books = useSelector((state) =>
        state.availableBooks.slice(
            state.startIndex,
            state.startIndex + PAGE_SIZE
        )
    );
    const startIndex = useSelector((state) => state.startIndex);
    const genreFilter = useSelector((state) => state.genreFilter);
    const authorGenderFilter = useSelector((state) => state.authorGenderFilter);
    const isLoading = useSelector((state) => state.isLoading);

    const dispatch = useDispatch();

    const handleScroll = useCallback(
        (direction) => {
            switch (direction) {
                case 'down':
                    if (startIndex + PAGE_SIZE < availableBooks.length) {
                        dispatch(
                            actions.setStartIndex(
                                startIndex + PAGE_SIZE * PAGE_WINDOW_SHIFT
                            )
                        );
                    }
                    break;
                case 'up':
                    if (startIndex >= PAGE_SIZE * PAGE_WINDOW_SHIFT) {
                        dispatch(
                            actions.setStartIndex(
                                startIndex - PAGE_SIZE * PAGE_WINDOW_SHIFT
                            )
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
        [startIndex, availableBooks, dispatch]
    );

    return (
        <div>
            {isLoading ? <Loader /> : null}
            <Navbar
                genreFilter={genreFilter}
                genderFilter={authorGenderFilter}
                genres={['', ...genres]}
                onOrderByBookName={() => {
                    dispatch(actions.setOrderByName());
                }}
                onOrderByAuthorName={() => {
                    dispatch(actions.setOrderByAuthorName());
                }}
                onAuthorGenderChange={(event) => {
                    const filter =
                        event.target.value === ALL ? null : event.target.value;
                    dispatch(actions.setAuthorGenderFilter(filter));
                }}
                onGenreChange={(event) => {
                    const filter =
                        event.target.value === ALL ? null : event.target.value;
                    dispatch(actions.setGenreFilter(filter));
                }}
            ></Navbar>
            <InfiniteList
                // visibleBooks={visibleBooks}
                visibleBooks={books}
                handleScroll={handleScroll}
                scrollTriggerRatio={PAGE_WINDOW_SHIFT}
            />
        </div>
    );
}

export default BooksList;
