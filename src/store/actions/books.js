import * as actions from './actionTypes';

export const setOrderByName = order => {
    return {
        type: actions.SET_ORDER_BY_BOOK_NAME,
        order: order
    };
};

export const setOrderByAuthorName = order => {
    return {
        type: actions.SET_ORDER_BY_AUTHOR_NAME,
        order: order
    };
};

export const setGenreFilter = filter => {
    return {
        type: actions.SET_GENRE_FILTER,
        filter: filter
    };
};

export const setAuthorGenderFilter = filter => {
    return {
        type: actions.SET_AUTHOR_GENDER_FILTER,
        filter: filter
    };
};
