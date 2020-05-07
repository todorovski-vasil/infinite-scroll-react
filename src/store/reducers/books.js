import * as actionTypes from '../actions/actionTypes';

const PAGE_SIZE = 1000;

export const initialState = {
    books: [],
    authors: [],
    genres: [],
    availableBooks: [],
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

const setAvailableBooks = (state, books) => {
    return {
        ...state,
        availableBooks: books,
        visibleBooks: books.slice(
            state.startIndex,
            state.startIndex + PAGE_SIZE
        ),
    };
};

const setBooks = (state, data) => {
    const startIndex = 0;
    const availableBooks = [...data.books];
    const visibleBooks = availableBooks.slice(
        startIndex,
        startIndex + PAGE_SIZE
    );
    return {
        ...state,
        books: [...data.books],
        genres: [...data.genres],
        availableBooks: availableBooks,
        visibleBooks: visibleBooks,
        startIndex: startIndex,
        isLoading: false,
    };
};

export const booksReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SAVE_GENRE_FILTER:
            return saveGenreFilter(state, action.filter);
        case actionTypes.SAVE_AUTHOR_GENDER_FILTER:
            return saveAuthorGenderFilter(state, action.filter);
        case actionTypes.SET_AVAILABLE_BOOKS:
            return setAvailableBooks(state, action.avBooks);
        case actionTypes.SET_BOOKS:
            return setBooks(state, action.data);
        case actionTypes.SET_LOADING:
            return { ...state, isLoading: action.loading };
        case actionTypes.SET_START_INDEX:
            return {
                ...state,
                startIndex: action.index,
                visibleBooks: state.availableBooks.slice(
                    action.index,
                    action.index + PAGE_SIZE
                ),
            };
        default:
            return state;
    }
};
