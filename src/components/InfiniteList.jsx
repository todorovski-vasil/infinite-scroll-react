import React from 'react';

const FICTION = 'fiction',
    DRAMA = 'drama',
    POETRY = 'poetry',
    FINANCE = 'finance',
    HOROR = 'horror';

const getCSSClasses = book => {
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

const getLabel = book =>
    book.name +
    ' by ' +
    (book.author.gender === 'M' ? 'Mr. ' : 'Mrs. ') +
    book.author.name +
    ', genre: ' +
    book.genre +
    ', published on: ' +
    book.publishedDate.toDateString();

function InfiniteList(props) {
    return (
        <div className='container infiniteList'>
            <ul className='list-group'>
                {props.visibleBooks.map(book => {
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
