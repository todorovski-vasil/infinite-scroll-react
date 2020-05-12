import React, { useContext } from 'react';

import { booksContext } from '../App';

const FINANCE = 'finance',
    HOROR = 'horror';
const MALE = 'M';

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

function InfiniteList(props) {
    const { state } = useContext(booksContext);

    const onScroll = (event) => {
        event.preventDefault();

        const { scrollTop, scrollHeight } = event.nativeEvent.target;

        if (scrollTop > scrollHeight * (1 - props.scrollTriggerRatio)) {
            props.handleScroll('down');
        } else if (scrollTop < scrollHeight * props.scrollTriggerRatio) {
            props.handleScroll('up');
        }
    };

    return (
        <div className='infiniteList' onScroll={onScroll}>
            <ul className='container list-group'>
                {props.visibleBooks.map((book) => {
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
