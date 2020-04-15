import { put, takeLatest, select } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import * as actions from '../actions/books';
import * as transform from '../../utils/bookListTransformations';

// const getBooks = (state) => state.books;
const getAvBooks = (state) => state.availableBooks;

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
        console.error('in setOrderByBookNameSaga: ' + error);
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
    // yield takeLatest('CREATE_USER', createUser);
}
