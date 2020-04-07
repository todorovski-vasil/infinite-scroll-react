import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import './App.css';

// import List from './components/List';
import BooksList from './components/BooksList';
import { getBookstore } from './utils/generateBookstoreData';
import { booksReducer } from './store/reducers/books';

const store = createStore(booksReducer, composeWithDevTools());

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
