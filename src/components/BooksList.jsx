import React, { useCallback, useContext } from 'react';

import Navbar from './Navbar/Navbar';
import InfiniteList from './InfiniteList';
import Loader from './Loader/Loader';
import { booksContext } from '../App';
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

function BooksList() {
    const context = useContext(booksContext);

    const {
        visibleBooks,
        genres,
        availableBooks,
        startIndex,
        isLoading,
    } = context.state;
    const dispatch = context.dispatch;

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
            {genres.length !== 0 ? <Navbar /> : <h5>Loading data...</h5>}
            <InfiniteList
                visibleBooks={visibleBooks}
                handleScroll={handleScroll}
                scrollTriggerRatio={PAGE_WINDOW_SHIFT}
            />
        </div>
    );
}

export default BooksList;
