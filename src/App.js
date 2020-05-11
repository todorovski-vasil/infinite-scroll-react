import React, { useEffect, createContext, useCallback } from 'react';

import './App.css';

import BooksList from './components/BooksList';
import { getBookstore } from './utils/generateBookstoreData';
import {
    booksReducer,
    initialState as initialBooksState,
} from './store/reducers/books';
import * as actions from './store/actions/books';
import { useReducerWithMiddleware } from './store/middleware/useReducerWithMiddleware';
import { loggerMiddleware } from './store/middleware/loggerMiddleware';
import { booksMiddleware } from './store/middleware/booksMiddleware';

const middleware = [booksMiddleware, loggerMiddleware];

export const booksContext = createContext();

function App() {
    const [state, dispatch] = useReducerWithMiddleware(
        booksReducer,
        initialBooksState,
        middleware
    );

    const initData = useCallback(() => {
        dispatch(actions.setLoading(true));
        setTimeout(() => {
            const bookstore = getBookstore();
            dispatch(
                actions.setBooks({
                    books: bookstore.books,
                    genres: bookstore.genres,
                })
            );
        }, 0);
    }, [dispatch]);

    useEffect(initData, []);

    return (
        <>
            <booksContext.Provider value={{ state, dispatch }}>
                <BooksList />
            </booksContext.Provider>
        </>
    );
}

export default App;
