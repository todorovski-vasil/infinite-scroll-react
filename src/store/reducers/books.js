import * as actions from '../actions/actionTypes';

const initialState = {
    orderByName: false,
    orderByAuthorName: false,
    genreFilter: null,
    actorGenderFiler: null
};

const setOrderByName = (state, order) => {
    return {
        ...state,
        orderByName: order
    };
};

const setOrderByAuthorName = (state, order) => {
    return {
        ...state,
        orderByAuthorName: order
    };
};

const setGenreFilter = (state, filter) => {
    return {
        ...state,
        genreFilter: filter
    };
};

const setAuthorGenderFilter = (state, filter) => {
    return {
        ...state,
        actorGenderFiler: filter
    };
};

export const booksReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_ORDER_BY_BOOK_NAME:
            return setOrderByName(state, action.order);
        case actions.SET_ORDER_BY_AUTHOR_NAME:
            return setOrderByAuthorName(state, action.order);
        case actions.SET_GENRE_FILTER:
            return setGenreFilter(state, action.filter);
        case actions.SET_AUTHOR_GENDER_FILTER:
            return setAuthorGenderFilter(state, action.filter);
        default:
            return state;
    }
};
