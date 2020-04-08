import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import './App.css';

// import List from './components/List';
import BooksList from './components/BooksList';
import { getBookstore } from './utils/generateBookstoreData';
import { booksReducer } from './store/reducers/books';
import { rootSaga } from './store/sagas/booksSaga';

// console.log({ createSagaMiddleware });

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    booksReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);

function App() {
    const bookstoreData = getBookstore();
    return (
        <Provider store={store}>
            {/* <List /> */}
            <BooksList
                authors={bookstoreData.authors}
                books={bookstoreData.books}
                genres={bookstoreData.genres}
            ></BooksList>
        </Provider>
    );
}

export default App;
