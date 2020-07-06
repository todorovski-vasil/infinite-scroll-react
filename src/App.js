import React, { useEffect, createContext, useCallback } from 'react';

import './App.css';

import BooksList from './components/BooksList';
import {
    booksReducer,
    initialState as initialBooksState,
} from './store/reducers/books';
import * as actions from './store/actions/books';
import { useReducerWithMiddleware } from './hooks/useReducerWithMiddleware';
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
            dispatch(actions.getGenres());
            dispatch(actions.getVisibleBooks({}));
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
