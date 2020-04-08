import * as actionTypes from './actionTypes';

export const setOrderByName = order => {
    return {
        type: actionTypes.SET_ORDER_BY_BOOK_NAME,
        order: order
    };
};

export const setOrderByAuthorName = order => {
    return {
        type: actionTypes.SET_ORDER_BY_AUTHOR_NAME,
        order: order
    };
};

export const setGenreFilter = filter => {
    return {
        type: actionTypes.SET_GENRE_FILTER,
        filter: filter
    };
};

export const setAuthorGenderFilter = filter => {
    return {
        type: actionTypes.SET_AUTHOR_GENDER_FILTER,
        filter: filter
    };
};

export const setAvailableBooks = books => {
    return {
        type: actionTypes.SET_AVAILABLE_BOOKS,
        avBooks: books
    };
};

export const setBooks = books => {
    return {
        type: actionTypes.SET_BOOKS,
        books: books
    };
};
