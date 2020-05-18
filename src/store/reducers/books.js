import * as actionTypes from '../actions/actionTypes';

export const initialState = {
    genres: [],
    visibleBooks: [],
    startIndex: 0,
    orderByBookName: false,
    orderByAuthorName: false,
    genreFilter: null,
    authorGenderFilter: null,
    isLoading: true,
};

const saveGenreFilter = (state, filter) => {
    return { ...state, genreFilter: filter };
};

const saveAuthorGenderFilter = (state, filter) => {
    return { ...state, authorGenderFilter: filter };
};

export const booksReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_GENRES:
            return { ...state, genres: action.genres };
        case actionTypes.SAVE_ORDER_BY_BOOK_NAME:
            return { ...state, orderByBookName: action.order };
        case actionTypes.SAVE_ORDER_BY_AUTHOR_NAME:
            return { ...state, orderByAuthorName: action.order };
        case actionTypes.SAVE_GENRE_FILTER:
            return saveGenreFilter(state, action.filter);
        case actionTypes.SAVE_AUTHOR_GENDER_FILTER:
            return saveAuthorGenderFilter(state, action.filter);
        case actionTypes.SET_VISIBLE_BOOKS:
            return { ...state, visibleBooks: action.books };
        case actionTypes.SET_LOADING:
            return { ...state, isLoading: action.loading };
        case actionTypes.SAVE_START_INDEX:
            return { ...state, startIndex: action.index };
        default:
            return state;
    }
};
