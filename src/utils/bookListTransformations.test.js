import {
    sortByBookName,
    sortByBookNameAsync,
    sortByAuthorName,
    sortByAuthorNameAsync,
    filterByGender,
    filterByGenre,
    applyFilters,
    orderByBookName,
    orderByAuthorName,
} from './bookListTransformations';

test('sortByBookName sorts correctly', () => {
    const testBooks = [
        {
            isbn: '1000000-4265253843.5273874',
            name: 'Book about 758728',
            author: { name: 'Author 4744000', gender: 'F' },
            genre: 'drama',
            publishedDate: new Date(
                'Wed Sep 17 1738 00:00:00 GMT+0122 (Central European Summer Time)'
            ),
        },
        {
            isbn: '1000000-4265253843.526669',
            name: 'Book about 728000',
            author: { name: 'Author 4744000', gender: 'F' },
            genre: 'drama',
            publishedDate: new Date(
                'Wed Sep 17 1738 00:00:00 GMT+0122 (Central European Summer Time)'
            ),
        },
    ];
    const sortedTestBooks = sortByBookName(testBooks);
    expect(sortedTestBooks.length).toBe(testBooks.length);
    expect(sortedTestBooks[0].isbn).toBe(testBooks[1].isbn);
});

test('sortByBookNameAsync sorts correctly', () => {
    const testBooks = [
        {
            isbn: '1000000-4265253843.5273874',
            name: 'Book about 758728',
            author: { name: 'Author 4744000', gender: 'F' },
            genre: 'drama',
            publishedDate: new Date(
                'Wed Sep 17 1738 00:00:00 GMT+0122 (Central European Summer Time)'
            ),
        },
        {
            isbn: '1000000-4265253843.526669',
            name: 'Book about 728000',
            author: { name: 'Author 4744000', gender: 'F' },
            genre: 'drama',
            publishedDate: new Date(
                'Wed Sep 17 1738 00:00:00 GMT+0122 (Central European Summer Time)'
            ),
        },
    ];

    expect.assertions(2);
    return sortByBookNameAsync(testBooks).then((sortedTestBooks) => {
        // console.table(sortedTestBooks);
        expect(sortedTestBooks.length).toBe(testBooks.length);
        expect(sortedTestBooks[0].isbn).toBe(testBooks[1].isbn);
    });
});

test('sortByAuthorName sorts correctly', () => {
    const testBooks = [
        {
            isbn: '1000000-4265253843.5273874',
            name: 'Book about 758728',
            author: { name: 'Author 4744000', gender: 'F' },
            genre: 'drama',
            publishedDate: new Date(
                'Wed Sep 17 1738 00:00:00 GMT+0122 (Central European Summer Time)'
            ),
        },
        {
            isbn: '1000000-4265253843.526669',
            name: 'Book about 123000',
            author: { name: 'Author 4744000', gender: 'F' },
            genre: 'drama',
            publishedDate: new Date(
                'Wed Sep 17 1738 00:00:00 GMT+0122 (Central European Summer Time)'
            ),
        },
    ];
    const sortedTestBooks = sortByAuthorName(testBooks);
    expect(sortedTestBooks.length).toBe(testBooks.length);
    expect(sortedTestBooks[0].isbn).toBe(testBooks[1].isbn);
});

test('sortByAuthorNameAsync sorts correctly', () => {
    const testBooks = [
        {
            isbn: '1000000-4265253843.5273874',
            name: 'Book about 758728',
            author: { name: 'Author 4744000', gender: 'F' },
            genre: 'drama',
            publishedDate: new Date(
                'Wed Sep 17 1738 00:00:00 GMT+0122 (Central European Summer Time)'
            ),
        },
        {
            isbn: '1000000-4265253843.526669',
            name: 'Book about 123000',
            author: { name: 'Author 4744000', gender: 'F' },
            genre: 'drama',
            publishedDate: new Date(
                'Wed Sep 17 1738 00:00:00 GMT+0122 (Central European Summer Time)'
            ),
        },
    ];

    expect.assertions(2);
    return sortByAuthorNameAsync(testBooks).then((sortedTestBooks) => {
        // console.table(sortedTestBooks);
        expect(sortedTestBooks.length).toBe(testBooks.length);
        expect(sortedTestBooks[0].isbn).toBe(testBooks[1].isbn);
    });
});

test('filterByGender filters correctly', () => {
    const testBooks = [
        {
            isbn: '1000000-4265253843.5273874',
            name: 'Book about 758728',
            author: { name: 'Author 4744000', gender: 'F' },
            genre: 'drama',
            publishedDate: new Date(
                'Wed Sep 17 1738 00:00:00 GMT+0122 (Central European Summer Time)'
            ),
        },
        {
            isbn: '1000000-4265253843.526669',
            name: 'Book about 728000',
            author: { name: 'Author 4744000', gender: 'M' },
            genre: 'drama',
            publishedDate: new Date(
                'Wed Sep 17 1738 00:00:00 GMT+0122 (Central European Summer Time)'
            ),
        },
    ];
    const filteredTestBooksByMaleAuthor = filterByGender(testBooks, 'M');
    expect(filteredTestBooksByMaleAuthor.length).toBe(1);
    expect(filteredTestBooksByMaleAuthor[0].isbn).toBe(testBooks[1].isbn);

    const filteredTestBooksByFemaleAuthor = filterByGender(testBooks, 'F');
    expect(filteredTestBooksByFemaleAuthor.length).toBe(1);
    expect(filteredTestBooksByFemaleAuthor[0].isbn).toBe(testBooks[0].isbn);

    const filteredTestBooksByTAuthor = filterByGender(testBooks, 'T');
    expect(filteredTestBooksByTAuthor.length).toBe(0);

    const notFilteredTestBooks = filterByGender(testBooks, null);
    expect(notFilteredTestBooks.length).toBe(testBooks.length);
    expect(notFilteredTestBooks[0]).toEqual(testBooks[0]);
});

test('filterByGenre filters correctly', () => {
    const testBooks = [
        {
            isbn: '1000000-4265253843.5273874',
            name: 'Book about 758728',
            author: { name: 'Author 4744000', gender: 'F' },
            genre: 'drama',
            publishedDate: new Date(
                'Wed Sep 17 1738 00:00:00 GMT+0122 (Central European Summer Time)'
            ),
        },
        {
            isbn: '1000000-4265253843.526669',
            name: 'Book about 728000',
            author: { name: 'Author 4744000', gender: 'M' },
            genre: 'finance',
            publishedDate: new Date(
                'Wed Sep 17 1738 00:00:00 GMT+0122 (Central European Summer Time)'
            ),
        },
    ];
    const financeTestBooks = filterByGenre(testBooks, 'finance');
    expect(financeTestBooks.length).toBe(1);
    expect(financeTestBooks[0].isbn).toBe(testBooks[1].isbn);

    const dramaTestBooks = filterByGenre(testBooks, 'drama');
    expect(dramaTestBooks.length).toBe(1);
    expect(dramaTestBooks[0].isbn).toBe(testBooks[0].isbn);

    const sfTestBooks = filterByGenre(testBooks, 'sf');
    expect(sfTestBooks.length).toBe(0);

    const notFilteredTestBooks = filterByGenre(testBooks, null);
    expect(notFilteredTestBooks.length).toBe(testBooks.length);
    expect(notFilteredTestBooks[1]).toEqual(testBooks[1]);
});

test('ordering by book name works correctly', () => {
    const testBooks = [
        {
            isbn: '1000000-4265253843.5273874',
            name: 'Book about 758728',
            author: { name: 'Author 4744000', gender: 'F' },
            genre: 'finance',
            publishedDate: new Date(
                'Wed Sep 17 1738 00:00:00 GMT+0122 (Central European Summer Time)'
            ),
        },
        {
            isbn: '1000000-4265253843.526669',
            name: 'Book about 728000',
            author: { name: 'Author 4744000', gender: 'M' },
            genre: 'drama',
            publishedDate: new Date(
                'Wed Sep 17 1738 00:00:00 GMT+0122 (Central European Summer Time)'
            ),
        },
        {
            isbn: '1000000-4265253843.525467',
            name: 'Book about 728078',
            author: { name: 'Author 4744566', gender: 'M' },
            genre: 'poetry',
            publishedDate: new Date(
                'Wed Sep 17 1738 00:00:00 GMT+0122 (Central European Summer Time)'
            ),
        },
        {
            isbn: '1000000-4265253843.521234',
            name: 'Book about 728120',
            author: { name: 'Author 4744186', gender: 'M' },
            genre: 'poetry',
            publishedDate: new Date(
                'Wed Sep 17 1738 00:00:00 GMT+0122 (Central European Summer Time)'
            ),
        },
    ];

    const orderedBookstoreByMaleAuthors = orderByBookName(testBooks, {
        genreFilter: null,
        genderFilter: 'M',
    });
    expect(orderedBookstoreByMaleAuthors.length).toBe(3);
    expect(orderedBookstoreByMaleAuthors[0].isbn).toBe(testBooks[1].isbn);

    const orderedFinanceBookstore = orderByBookName(testBooks, {
        genreFilter: 'finance',
        genderFilter: null,
    });
    expect(orderedFinanceBookstore.length).toBe(1);
    expect(orderedFinanceBookstore[0].isbn).toBe(testBooks[0].isbn);

    const orderedPoetryByMaleBookstore = orderByBookName(testBooks, {
        genreFilter: 'poetry',
        genderFilter: 'M',
    });
    expect(orderedPoetryByMaleBookstore.length).toBe(2);
    expect(orderedPoetryByMaleBookstore[0].isbn).toBe(testBooks[2].isbn);

    const orderedBookstore = orderByBookName(testBooks, {
        genreFilter: null,
        genderFilter: null,
    });
    expect(orderedBookstore.length).toBe(testBooks.length);
    expect(orderedBookstore[0].isbn).toBe(testBooks[1].isbn);
});

test('ordering by author name works correctly', () => {
    const testBooks = [
        {
            isbn: '1000000-4265253843.5273874',
            name: 'Book about 758728',
            author: { name: 'Author 4744000', gender: 'F' },
            genre: 'finance',
            publishedDate: new Date(
                'Wed Sep 17 1738 00:00:00 GMT+0122 (Central European Summer Time)'
            ),
        },
        {
            isbn: '1000000-4265253843.526669',
            name: 'Book about 728000',
            author: { name: 'Author 1213142', gender: 'M' },
            genre: 'drama',
            publishedDate: new Date(
                'Wed Sep 17 1738 00:00:00 GMT+0122 (Central European Summer Time)'
            ),
        },
    ];

    const orderedBookstoreByMaleAuthors = orderByAuthorName(testBooks, {
        genreFilter: null,
        genderFilter: 'M',
    });
    expect(orderedBookstoreByMaleAuthors.length).toBe(1);
    expect(orderedBookstoreByMaleAuthors[0].isbn).toBe(testBooks[1].isbn);

    const orderedFinanceBookstore = orderByAuthorName(testBooks, {
        genreFilter: 'finance',
        genderFilter: null,
    });
    expect(orderedFinanceBookstore.length).toBe(1);
    expect(orderedFinanceBookstore[0].isbn).toBe(testBooks[0].isbn);

    const orderedBookstore = orderByAuthorName(testBooks, {
        genreFilter: null,
        genderFilter: null,
    });
    expect(orderedBookstore.length).toBe(testBooks.length);
    expect(orderedBookstore[0].isbn).toBe(testBooks[1].isbn);
});

test('applyFilters works correctly when filtering by author gender', () => {
    const testBooks = [
        {
            isbn: '1000000-4265253843.5273874',
            name: 'Book about 758728',
            author: { name: 'Author 4744000', gender: 'F' },
            genre: 'finance',
            publishedDate: new Date(
                'Wed Sep 17 1738 00:00:00 GMT+0122 (Central European Summer Time)'
            ),
        },
        {
            isbn: '1000000-4265253843.526669',
            name: 'Book about 728000',
            author: { name: 'Author 1213142', gender: 'M' },
            genre: 'drama',
            publishedDate: new Date(
                'Wed Sep 17 1738 00:00:00 GMT+0122 (Central European Summer Time)'
            ),
        },
    ];

    const bookstoreByMaleAuthors = applyFilters(testBooks, {
        genreFilter: null,
        genderFilter: 'M',
    });
    expect(bookstoreByMaleAuthors.length).toBe(1);
    expect(bookstoreByMaleAuthors[0].isbn).toBe(testBooks[1].isbn);

    const bookstoreByFemaleAuthors = applyFilters(testBooks, {
        genreFilter: null,
        genderFilter: 'F',
    });
    expect(bookstoreByFemaleAuthors.length).toBe(1);
    expect(bookstoreByFemaleAuthors[0].isbn).toBe(testBooks[0].isbn);

    const bookstoreTAuthors = applyFilters(testBooks, {
        genreFilter: null,
        genderFilter: 'T',
    });
    expect(bookstoreTAuthors.length).toBe(0);

    const bookstoreAllAuthors = applyFilters(testBooks, {
        genreFilter: null,
        genderFilter: null,
    });
    expect(bookstoreAllAuthors.length).toBe(2);
    expect(bookstoreAllAuthors[0].isbn).toBe(testBooks[0].isbn);
    expect(bookstoreAllAuthors[1].isbn).toBe(testBooks[1].isbn);
});
