import React, { useContext, useCallback } from 'react';

import { booksContext } from '../App';
import * as actions from '../store/actions/books';

const FINANCE = 'finance',
    HOROR = 'horror';
const MALE = 'M';

const PAGE_SIZE = 1000;
const PAGE_WINDOW_SHIFT = 0.1;

const getCSSClasses = (book) => {
    let bookClasses = 'list-group-item ';
    if (
        book.genre === HOROR &&
        book.publishedDate.getMonth() === 9 &&
        book.publishedDate.getDate() === 31
    ) {
        bookClasses += 'halloween';
    } else if (book.genre === FINANCE && book.publishedDate.getDay() === 5) {
        let nextFriday = new Date(book.publishedDate.getTime());
        nextFriday.setDate(nextFriday.getDate() + 7);
        if (nextFriday.getMonth() !== book.publishedDate.getMonth()) {
            bookClasses += 'business';
        }
    }

    return bookClasses;
};

const getLabel = (book) =>
    book.name +
    ' by ' +
    (book.author.gender === MALE ? 'Mr. ' : 'Mrs. ') +
    book.author.name +
    ', genre: ' +
    book.genre +
    ', published on: ' +
    book.publishedDate.toDateString();

function InfiniteList() {
    const { state, dispatch } = useContext(booksContext);

    const { startIndex, visibleBooks, isLoading } = state;

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
                    if (visibleBooks.length === PAGE_SIZE) {
                        changeScrollIndex(
                            startIndex + PAGE_SIZE * PAGE_WINDOW_SHIFT
                        );
                    }
                    break;
                case 'up':
                    if (startIndex > 0) {
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
        [startIndex, visibleBooks, changeScrollIndex]
    );

    const onScroll = (event) => {
        event.preventDefault();

        if (!isLoading) {
            const { scrollTop, scrollHeight } = event.nativeEvent.target;

            if (scrollTop > scrollHeight * (1 - PAGE_WINDOW_SHIFT)) {
                handleScroll('down');
            } else if (scrollTop < scrollHeight * PAGE_WINDOW_SHIFT) {
                handleScroll('up');
            }
        }
    };

    return (
        <div className='infiniteList' onScroll={onScroll}>
            <ul className='container list-group'>
                {visibleBooks.map((book) => {
                    return (
                        <li key={book.isbn} className={getCSSClasses(book)}>
                            {getLabel(book)}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default InfiniteList;
