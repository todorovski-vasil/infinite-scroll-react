import * as actionTypes from '../actions/actionTypes';
import * as actions from '../actions/books';
import { getBooks } from '../../api/bookstore';

const getVisibleBooks = (
    {
        orderByBookName,
        orderByAuthorName,
        genreFilter,
        authorGenderFilter,
        startIndex,
    },
    dispatch
) => {
    dispatch(actions.setLoading(true));

    getBooks({
        orderByBookName,
        orderByAuthorName,
        genreFilter,
        authorGenderFilter,
        startIndex,
    })
        .then((books) => dispatch(actions.setVisibleBooks(books)))
        .catch((err) => console.error(err))
        .finally(() => dispatch(actions.setLoading(false)));
};

const setOrderByName = (state, dispatch) => {
    dispatch(actions.setLoading(true));
    dispatch(actions.saveOrderByAuthorName(false));
    dispatch(actions.saveOrderByName(true));

    getVisibleBooks(
        { ...state, orderByBookName: true, orderByAuthorName: false },
        dispatch
    );
};

const setOrderByAuthorName = (state, dispatch) => {
    dispatch(actions.setLoading(true));
    dispatch(actions.saveOrderByName(false));
    dispatch(actions.saveOrderByAuthorName(true));

    getVisibleBooks(
        { ...state, orderByBookName: false, orderByAuthorName: true },
        dispatch
    );
};

const setAuthorGenderFilter = (authorGenderFilter, state, dispatch) => {
    dispatch(actions.setLoading(true));
    dispatch(actions.saveAuthorGenderFilter(authorGenderFilter));

    getVisibleBooks(
        { ...state, authorGenderFilter: authorGenderFilter },
        dispatch
    );
};

const setGenreFilter = (genreFilter, state, dispatch) => {
    dispatch(actions.setLoading(true));
    dispatch(actions.saveGenreFilter(genreFilter));

    getVisibleBooks({ ...state, genreFilter: genreFilter }, dispatch);
};

const setStartIndex = (startIndex, state, dispatch) => {
    dispatch(actions.setLoading(true));
    dispatch(actions.saveStartIndex(startIndex));

    getVisibleBooks({ ...state, startIndex }, dispatch);
};

export const booksMiddleware = (state) => (dispatch) => (action) => {
    switch (action.type) {
        case actionTypes.GET_VISIBLE_BOOKS:
            return getVisibleBooks(action.query, dispatch);
        case actionTypes.SET_ORDER_BY_BOOK_NAME:
            return setOrderByName(state, dispatch);
        case actionTypes.SET_ORDER_BY_AUTHOR_NAME:
            return setOrderByAuthorName(state, dispatch);
        case actionTypes.SET_GENRE_FILTER:
            return setGenreFilter(action.filter, state, dispatch);
        case actionTypes.SET_AUTHOR_GENDER_FILTER:
            return setAuthorGenderFilter(action.filter, state, dispatch);
        case actionTypes.SET_START_INDEX:
            return setStartIndex(action.index, state, dispatch);
        default:
            return dispatch(action);
    }
};
