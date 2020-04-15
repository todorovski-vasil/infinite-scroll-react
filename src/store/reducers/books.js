import * as actionTypes from '../actions/actionTypes';
// import * as booksActions from '../actions/books';

const PAGE_SIZE = 1000;
// const PAGE_WINDOW_SHIFT = 0.1;

const initialState = {
    books: [],
    authors: [],
    genres: [],
    availableBooks: [],
    visibleBooks: [],
    startIndex: 0,
    orderByBookName: false,
    orderByAuthorName: false,
    genreFilter: null,
    actorGenderFiler: null,
    isLoading: true,
};

// const setOrderByBookName = (state, order) => {
//     return getNextState(state, { orderByBookName: order });
// };

// const setOrderByAuthorName = (state, order) => {
//     return { ...state, orderByAuthorName: order };
// };

const setGenreFilter = (state, filter) => {
    return { ...state, genreFilter: filter };
};

const setAuthorGenderFilter = (state, filter) => {
    return { ...state, actorGenderFiler: filter };
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

// const setLoading = (state, loading) => {
//     return getNextState(state, { isLoading: loading });
// };

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
        // case actionTypes.SET_ORDER_BY_BOOK_NAME:
        //     return setOrderByBookName(state, action.order);
        // case actionTypes.SET_ORDER_BY_AUTHOR_NAME:
        //     return setOrderByAuthorName(state, action.order);
        case actionTypes.SET_GENRE_FILTER:
            return setGenreFilter(state, action.filter);
        case actionTypes.SET_AUTHOR_GENDER_FILTER:
            return setAuthorGenderFilter(state, action.filter);
        case actionTypes.SET_AVAILABLE_BOOKS:
            return setAvailableBooks(state, action.avBooks);
        case actionTypes.SET_BOOKS:
            return setBooks(state, action.data);
        case actionTypes.SET_LOADING:
            return { ...state, isLoading: action.loading };
        // return { ...state, books: action.books };
        // case actionTypes.SCROLL_POSITION_CHANGE:
        //     return moveSlidingWindow;
        default:
            return state;
    }
};
