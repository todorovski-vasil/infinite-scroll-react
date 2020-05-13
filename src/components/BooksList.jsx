import React, { useContext } from 'react';

import Navbar from './Navbar/Navbar';
import InfiniteList from './InfiniteList';
import Loader from './Loader/Loader';
import { booksContext } from '../App';

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

    const { isLoading } = context.state;

    return (
        <div>
            {isLoading ? <Loader /> : null}
            <Navbar />
            <InfiniteList />
        </div>
    );
}

export default BooksList;
