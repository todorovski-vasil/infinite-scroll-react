import React from 'react';
import './App.css';
// import List from './components/List';
import BooksList from './components/BooksList';
import { getBookstore } from './utils/generateBookstoreData';

function App() {
    const bookstoreData = getBookstore();
    return (
        <>
            {/* <List /> */}
            <BooksList
                authors={bookstoreData.authors}
                books={bookstoreData.books}
                genres={bookstoreData.genres}
            ></BooksList>
        </>
    );
}

export default App;
