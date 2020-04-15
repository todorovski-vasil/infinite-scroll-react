import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import {
//     sortByBookName,
//     sortByAuthorName,
//     applyFilters,
// } from '../utils/bookListTransformations';
import Navbar from './Navbar/Navbar';
import InfiniteList from './InfiniteList';
import Loader from './Loader/Loader';
import * as actions from '../store/actions/books';

const ALL = 'all';
const PAGE_SIZE = 1000;
const PAGE_WINDOW_SHIFT = 0.1;

const indexedDBAvailable = window.indexedDB ? true : false;
if (indexedDBAvailable) {
    console.log(
        'Your browser supports a stable version of IndexedDB. High performance operation will be available.'
    );
} else {
    console.log(
        "Your browser doesn't support a stable version of IndexedDB. High performance operation will not be available."
    );
}

function BooksList(props) {
    // let [startIndex, setStartIndex] = useState(0);
    // const [genreFilter, setGenreFilter] = useState(null);
    // const [genderFilter, setGenderFilter] = useState(null);
    // const [scheduledSortByBookName, setScheduledSortByBookName] = useState(
    //     false
    // );
    // const [scheduledSortByAuthorName, setScheduledSortByAuthorName] = useState(
    //     false
    // );
    // const [availableBooks, setAvailableBooks] = useState([...props.books]);
    // const [visibleBooks, setVisibleBooks] = useState(
    //     props.books.filter(
    //         (book, index) =>
    //             index > startIndex && index < startIndex + PAGE_SIZE
    //     )
    // );
    // const [loading, setLoading] = useState(false);

    // const books = useSelector((state) => state.books);
    const genres = useSelector((state) => state.genres);
    // const authors = useSelector((state) => state.authors);
    const availableBooks = useSelector((state) => state.availableBooks);
    const visibleBooks = useSelector((state) => state.visibleBooks);
    const startIndex = useSelector((state) => state.startIndex);
    // const orderByBookName = useSelector((state) => state.orderByBookName);
    // const orderByAuthorName = useSelector((state) => state.orderByAuthorName);
    const genreFilter = useSelector((state) => state.genreFilter);
    const authorGenderFiler = useSelector((state) => state.authorGenderFiler);
    const isLoading = useSelector((state) => state.isLoading);

    const dispatch = useDispatch();

    // useEffect(() => {
    //     if (scheduledSortByBookName) {
    //         setTimeout(() => {
    //             setAvailableBooks((a) => sortByBookName(a));
    //             setScheduledSortByBookName(false);
    //         }, 0);
    //     }
    // }, [scheduledSortByBookName]);

    // useEffect(() => {
    //     if (scheduledSortByAuthorName) {
    //         setTimeout(() => {
    //             setAvailableBooks((a) => sortByAuthorName(a));
    //             setScheduledSortByAuthorName(false);
    //         }, 0);
    //     }
    // }, [scheduledSortByAuthorName]);

    // useEffect(() => {
    //     setTimeout(() => {
    //         setAvailableBooks(
    //             applyFilters(props.books, {
    //                 genreFilter,
    //                 genderFilter,
    //             })
    //         );
    //         setLoading(false);
    //     }, 0);
    // }, [genreFilter, genderFilter, props.books]);

    // useEffect(() => {
    //     setVisibleBooks(() => {
    //         return availableBooks.slice(startIndex, startIndex + PAGE_SIZE);
    //     });
    // }, [availableBooks, startIndex]);

    // useEffect(() => {
    //     setLoading(false);
    // }, [visibleBooks]);

    // useEffect(() => {
    //     props.setBooks(props.books);
    // }, [props.books, props.setBooks]);

    // useEffect(() => {
    //     dispatch(actions.setBooks(books));
    // }, [books, dispatch]);

    const handleScroll = useCallback(
        (direction) => {
            switch (direction) {
                case 'down':
                    if (startIndex + PAGE_SIZE < availableBooks.length) {
                        // setStartIndex((i) => i + PAGE_SIZE * PAGE_WINDOW_SHIFT);
                    }
                    break;
                case 'up':
                    if (startIndex >= PAGE_SIZE * PAGE_WINDOW_SHIFT) {
                        // setStartIndex((i) => i - PAGE_SIZE * PAGE_WINDOW_SHIFT);
                    }
                    break;
                default:
                    console.error(
                        'unsuported scroll direction received in Booklist.jsx handleScroll handler: ' +
                            direction
                    );
            }
        },
        [startIndex, availableBooks]
    );

    return (
        <div>
            {isLoading ? <Loader /> : null}
            <Navbar
                genreFilter={genreFilter}
                genderFilter={authorGenderFiler}
                genres={['', ...genres]}
                onOrderByBookName={() => {
                    dispatch(actions.setOrderByName());
                    // setLoading(true);
                    // setScheduledSortByBookName(true);
                    // setStartIndex(0);
                }}
                onOrderByAuthorName={() => {
                    dispatch(actions.setOrderByAuthorName());
                    // setLoading(true);
                    // setScheduledSortByAuthorName(true);
                    // setStartIndex(0);
                }}
                onGenderChange={(event) => {
                    const filter =
                        event.target.value === ALL ? null : event.target.value;
                    props.setAuthorGenderFilter(filter);
                    // setLoading(true);
                    // setGenderFilter(filter);
                    // setStartIndex(0);
                }}
                onGenreChange={(event) => {
                    const filter =
                        event.target.value === ALL ? null : event.target.value;
                    props.setGenreFilter(filter);
                    // setLoading(true);
                    // setGenreFilter(filter);
                    // setStartIndex(0);
                }}
            ></Navbar>
            <InfiniteList
                visibleBooks={visibleBooks}
                handleScroll={handleScroll}
                scrollTriggerRatio={PAGE_WINDOW_SHIFT}
            />
        </div>
    );
}

// const mapStateToProps = state => {
//     return {
//         genreFilter: state.genreFilter,
//         authorGenderFilter: state.authorGenderFilter
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         setBooks: books => dispatch(actions.setBooks(books)),
//         setOrderByName: order => dispatch(actions.setOrderByName(order)),
//         setOrderByAuthorName: order =>
//             dispatch(actions.setOrderByAuthorName(order)),
//         setGenreFilter: filter => dispatch(actions.setGenreFilter(filter)),
//         setAuthorGenderFilter: filter =>
//             dispatch(actions.setAuthorGenderFilter(filter))
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(BooksList);
export default BooksList;
