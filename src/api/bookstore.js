const API = '/books';

export const getBooks = ({
    orderByBookName,
    orderByAuthorName,
    genreFilter,
    authorGenderFilter,
    startIndex,
}) => {
    let queryParams = {};
    if (orderByBookName) {
        queryParams['orderByName'] = '1';
    } else if (orderByAuthorName) {
        queryParams['orderByAuthorName'] = '1';
    }

    if (genreFilter) {
        queryParams['genre'] = genreFilter;
    }

    if (authorGenderFilter) {
        queryParams['authorGender'] = authorGenderFilter;
    }

    if (startIndex) {
        queryParams['offset'] = startIndex + '';
    }

    const query = Object.keys(queryParams)
        .map(
            (k) =>
                encodeURIComponent(k) + '=' + encodeURIComponent(queryParams[k])
        )
        .join('&');

    const url = API + (query ? '?' + query : '');

    console.log(`url: ${url}`);

    return fetch(url)
        .then((res) => {
            console.log(`res: ${res.ok}`);
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(
                    'Status: ' + res.status + ', on fetching from ' + url
                );
            }
        })
        .then((books) =>
            books.map((book) => ({
                ...book,
                publishedDate: new Date(book.publishedDate),
            }))
        )
        .catch((err) => {
            throw err;
        });
};
