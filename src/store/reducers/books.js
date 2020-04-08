import * as actionTypes from '../actions/actionTypes';

const initialState = {
    books: [],
    availableBooks: [],
    visibleBooks: [],
    startIndex: 0,
    orderByBookName: false,
    orderByAuthorName: false,
    genreFilter: null,
    actorGenderFiler: null
};

const getNextState = (state, changes) => {
    const arrayNames = ['books', 'availableBooks', 'visibleBooks'];
    const updatedArrays = [];

    const newState = { ...state };
    for (const prop in changes) {
        if (arrayNames.includes(prop)) {
            newState[prop] = [...changes[prop]];
            updatedArrays.push(prop);
        } else {
            newState[prop] = changes.prop;
        }
    }
    const unchangedArrays = arrayNames.filter(a => !updatedArrays.includes(a));
    unchangedArrays.forEach(arrayName => {
        newState[arrayName] = [...state[arrayName]];
    });

    return newState;
};

const setOrderByBookName = (state, order) => {
    return getNextState(state, { orderByBookName: order });
};

const setOrderByAuthorName = (state, order) => {
    return getNextState(state, { orderByAuthorName: order });
};

const setGenreFilter = (state, filter) => {
    return getNextState(state, { genreFilter: filter });
};

const setAuthorGenderFilter = (state, filter) => {
    return getNextState(state, { actorGenderFiler: filter });
};

const setAvailableBooks = (state, books) => {
    return getNextState(state, { availableBooks: books });
};

export const booksReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_ORDER_BY_BOOK_NAME:
            return setOrderByBookName(state, action.order);
        case actionTypes.SET_ORDER_BY_AUTHOR_NAME:
            return setOrderByAuthorName(state, action.order);
        case actionTypes.SET_GENRE_FILTER:
            return setGenreFilter(state, action.filter);
        case actionTypes.SET_AUTHOR_GENDER_FILTER:
            return setAuthorGenderFilter(state, action.filter);
        case actionTypes.SET_AVAILABLE_BOOKS:
            return setAvailableBooks(state, action.avBooks);
        case actionTypes.SET_BOOKS:
            return getNextState(state, { books: action.books });
        default:
            return state;
    }
};
