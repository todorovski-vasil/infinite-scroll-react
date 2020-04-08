import { call, put, takeLatest, select } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import * as actions from '../actions/books';
import * as booklistTransformations from '../../utils/bookListTransformations';

const getBooks = state => state.books;

function* setOrderByBookNameSaga(action) {
    const books = yield select(getBooks);

    yield put(
        actions.setAvailableBooks(booklistTransformations.sortByBookName(books))
    );
}

// use them in parallel
export function* rootSaga() {
    yield takeLatest(
        actionTypes.SET_ORDER_BY_BOOK_NAME,
        setOrderByBookNameSaga
    );
    // yield takeLatest('CREATE_USER', createUser);
}
