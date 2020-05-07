import * as actionTypes from './actionTypes';

export const setOrderByName = (order) => ({
    type: actionTypes.SET_ORDER_BY_BOOK_NAME,
    order: order,
});

export const setOrderByAuthorName = (order) => ({
    type: actionTypes.SET_ORDER_BY_AUTHOR_NAME,
    order: order,
});

export const setGenreFilter = (filter) => ({
    type: actionTypes.SET_GENRE_FILTER,
    filter: filter,
});

export const saveGenreFilter = (filter) => ({
    type: actionTypes.SAVE_GENRE_FILTER,
    filter: filter,
});

export const setAuthorGenderFilter = (filter) => ({
    type: actionTypes.SET_AUTHOR_GENDER_FILTER,
    filter: filter,
});

export const saveAuthorGenderFilter = (filter) => ({
    type: actionTypes.SAVE_AUTHOR_GENDER_FILTER,
    filter: filter,
});

export const setAvailableBooks = (books) => ({
    type: actionTypes.SET_AVAILABLE_BOOKS,
    avBooks: books,
});

export const setBooks = (data) => ({
    type: actionTypes.SET_BOOKS,
    data: data,
});

export const setLoading = (loading) => ({
    type: actionTypes.SET_LOADING,
    loading: loading,
});

export const setStartIndex = (index) => ({
    type: actionTypes.SET_START_INDEX,
    index: index,
});
