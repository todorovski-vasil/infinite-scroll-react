import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';

import './App.css';

// import List from './components/List';
import BooksList from './components/BooksList';
import { getBookstore } from './utils/generateBookstoreData';
// import Loader from './components/Loader/Loader';
// import { SET_BOOKS } from './store/actions/actionTypes';

// console.log({ createSagaMiddleware });

function App() {
    // const dispatch = useDispatch();
    // const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //     const bookstoreData = getBookstore();
    //     dispatch({
    //         type: SET_BOOKS,
    //         data: {
    //             books: bookstoreData.books,
    //             genres: bookstoreData.genres,
    //         },
    //     });
    //     setIsLoading(false);
    // }, [dispatch]);

    const [bookstoreData, setBookstoreData] = useState({
        authors: [],
        books: [],
        genres: [],
    });

    useEffect(() => setBookstoreData(getBookstore()), []);

    return (
        <>
            {/* <List /> */}
            {/* {isLoading ? (
                <Loader />
            ) : ( */}
            <BooksList
                authors={bookstoreData.authors}
                books={bookstoreData.books}
                genres={bookstoreData.genres}
            ></BooksList>
            {/* )} */}
        </>
    );
}

export default App;
