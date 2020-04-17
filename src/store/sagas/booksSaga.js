import { put, takeLatest, select } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import * as actions from '../actions/books';
import * as transform from '../../utils/bookListTransformations';

const getBooks = (state) => state.books;
const getAvBooks = (state) => state.availableBooks;
const getGenreFilter = (state) => state.genreFilter;
const getAuthorGenderFilter = (state) => state.authorGenderFilter;

function* setOrderByBookNameSaga(action) {
    yield put(actions.setLoading(true));

    const avBooks = yield select(getAvBooks);

    try {
        const sortedBooks = yield transform.sortByBookNameAsync(avBooks);
        yield put(actions.setAvailableBooks(sortedBooks));
    } catch (error) {
        // log error
        console.error('in setOrderByBookNameSaga: ' + error);
    } finally {
        yield put(actions.setLoading(false));
    }
}

function* setOrderByAuthorNameSaga(action) {
    yield put(actions.setLoading(true));

    const avBooks = yield select(getAvBooks);

    try {
        const sortedBooks = yield transform.sortByAuthorNameAsync(avBooks);
        yield put(actions.setAvailableBooks(sortedBooks));
    } catch (error) {
        // log error
        console.error('in setOrderByAuthorNameSaga: ' + error);
    } finally {
        yield put(actions.setLoading(false));
    }
}

function* setGenreFilterSaga(action) {
    yield put(actions.setLoading(true));
    yield put(actions.saveGenreFilter(action.filter));

    const books = yield select(getBooks);
    const genreFilter = yield action.filter;
    const authorGenderFilter = yield select(getAuthorGenderFilter);

    try {
        const filteredBooks = yield transform.applyFiltersAsync(books, {
            genreFilter,
            authorGenderFilter,
        });
        // const sortedBooks = yield transform.sortByAuthorNameAsync(
        //     filteredBooks
        // );
        yield put(actions.setAvailableBooks(filteredBooks));
    } catch (error) {
        // log error
        console.error('in setGenreFilterSaga: ' + error);
    } finally {
        yield put(actions.setLoading(false));
    }
}

function* setAuthorGenderFilterSaga(action) {
    yield put(actions.setLoading(true));
    yield put(actions.saveAuthorGenderFilter(action.filter));

    const books = yield select(getBooks);
    const genreFilter = yield select(getGenreFilter);
    const authorGenderFilter = yield action.filter;

    try {
        const filteredBooks = yield transform.applyFiltersAsync(books, {
            genreFilter,
            authorGenderFilter,
        });
        // const sortedBooks = yield transform.sortByAuthorNameAsync(
        //     filteredBooks
        // );
        yield put(actions.setAvailableBooks(filteredBooks));
    } catch (error) {
        // log error
        console.error('in setAuthorGenderFilterSaga: ' + error);
    } finally {
        yield put(actions.setLoading(false));
    }
}

// function* setBooks(action) {
//     yield put(actions.setLoading(true));

//     const books = yield select(getBooks);

//     try {
//         yield put({actions.setAvailableBooks(sortedBooks));
//     } catch (error) {
//         // log error
//         console.error('in setOrderByBookNameSaga: ' + error);
//     } finally {
//         yield put(actions.setLoading(false));
//     }
// }

// use them in parallel
export function* rootSaga() {
    yield takeLatest(
        actionTypes.SET_ORDER_BY_BOOK_NAME,
        setOrderByBookNameSaga
    );
    yield takeLatest(
        actionTypes.SET_ORDER_BY_AUTHOR_NAME,
        setOrderByAuthorNameSaga
    );
    yield takeLatest(actionTypes.SET_GENRE_FILTER, setGenreFilterSaga);
    yield takeLatest(
        actionTypes.SET_AUTHOR_GENDER_FILTER,
        setAuthorGenderFilterSaga
    );
    // yield takeLatest('CREATE_USER', createUser);
}
