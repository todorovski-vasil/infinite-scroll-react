import * as actionTypes from '../actions/actionTypes';
import * as actions from '../actions/books';
import * as transform from '../../utils/bookListTransformations';

const setOrderByName = ({ availableBooks }, dispatch) => {
    dispatch(actions.setLoading(true));

    transform
        .sortByBookNameAsync(availableBooks)
        .then((sortedBooks) => dispatch(actions.setAvailableBooks(sortedBooks)))
        .catch((error) => console.error('in setOrderByBookNameSaga: ' + error))
        .finally(() => dispatch(actions.setLoading(false)));
};

const setOrderByAuthorName = ({ availableBooks }, dispatch) => {
    dispatch(actions.setLoading(true));

    transform
        .sortByAuthorNameAsync(availableBooks)
        .then((sortedBooks) => dispatch(actions.setAvailableBooks(sortedBooks)))
        .catch((error) =>
            console.error('in setOrderByAuthorNameSaga: ' + error)
        )
        .finally(() => dispatch(actions.setLoading(false)));
};

const applyFilters = (books, genreFilter, authorGenderFilter, dispatch) =>
    transform
        .applyFiltersAsync(books, {
            genreFilter,
            authorGenderFilter,
        })
        .then((filteredBooks) =>
            dispatch(actions.setAvailableBooks(filteredBooks))
        )
        .catch((error) =>
            console.error('in setAuthorGenderFilterSaga: ' + error)
        )
        .finally(() => dispatch(actions.setLoading(false)));

const setAuthorGenderFilter = (
    authorGenderFilter,
    { genreFilter, books },
    dispatch
) => {
    dispatch(actions.setLoading(true));
    dispatch(actions.saveAuthorGenderFilter(authorGenderFilter));

    applyFilters(books, genreFilter, authorGenderFilter, dispatch);
};

const setGenreFilter = (
    genreFilter,
    { authorGenderFilter, books },
    dispatch
) => {
    dispatch(actions.setLoading(true));
    dispatch(actions.saveGenreFilter(genreFilter));

    applyFilters(books, genreFilter, authorGenderFilter, dispatch);
};

export const booksMiddleware = (state) => (dispatch) => (action) => {
    switch (action.type) {
        case actionTypes.SET_ORDER_BY_BOOK_NAME:
            return setOrderByName(state, dispatch);
        case actionTypes.SET_ORDER_BY_AUTHOR_NAME:
            return setOrderByAuthorName(state, dispatch);
        case actionTypes.SET_GENRE_FILTER:
            return setGenreFilter(action.filter, state, dispatch);
        case actionTypes.SET_AUTHOR_GENDER_FILTER:
            return setAuthorGenderFilter(action.filter, state, dispatch);
        default:
            return dispatch(action);
    }
};