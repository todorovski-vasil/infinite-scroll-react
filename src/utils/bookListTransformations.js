const sortByBookName = books =>
    [...books].sort((a, b) => (a.name > b.name ? 1 : -1));

const sortByAuthorName = books =>
    [...books].sort((a, b) => (a.author.name > b.author.name ? 1 : -1));

const filterByGender = (books, genderFilter) =>
    genderFilter !== null
        ? books.filter(book => book.author.gender === genderFilter)
        : [...books];

const filterByGenre = (books, genreFilter) =>
    genreFilter !== null
        ? books.filter(book => book.genre === genreFilter)
        : [...books];

const applyFilters = (books, { genreFilter, genderFilter }) =>
    filterByGender(filterByGenre(books, genreFilter), genderFilter);

const orderByBookName = (books, { genreFilter, genderFilter }) => {
    let sortedBooks = sortByBookName(books);
    return applyFilters(sortedBooks, { genreFilter, genderFilter });
};

const orderByAuthorName = (books, { genreFilter, genderFilter }) => {
    const sortedBooks = sortByAuthorName(books);
    return applyFilters(sortedBooks, { genreFilter, genderFilter });
};

export {
    sortByBookName,
    sortByAuthorName,
    filterByGender,
    filterByGenre,
    applyFilters,
    orderByBookName,
    orderByAuthorName
};
