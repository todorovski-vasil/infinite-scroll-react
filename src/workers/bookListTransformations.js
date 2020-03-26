const LOAD_BOOKS = 'load books',
    LOAD_AUTHORS = 'load_authors';

window.indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction ||
    window.webkitIDBTransaction ||
    window.msIDBTransaction || { READ_WRITE: 'readwrite' }; // This line should only be needed if it is needed to support the object's constants for older browsers
window.IDBKeyRange =
    window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

if (!window.indexedDB) {
    console.log(
        "Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available."
    );
}

// // try {
// const req = indexedDB.open('bookstoredb', 1);
// req.addEventListener('upgradeneeded', ev => {
//     const db = req.result;
//     db.createObjectStore('books', { keyPath: 'imdb' });
// });
// req.addEventListener('success', () => {
//     const db = req.result;
//     // ...
// });
// // }

const dbName = 'bookstoredb';

var request = indexedDB.open(dbName, 1);

request.onerror = function(event) {
    // Handle errors.
};
request.onupgradeneeded = function(event) {
    var db = event.target.result;

    // Create an objectStore to hold information about our books. We're
    // going to use "isbn" as our key path because it's guaranteed to be
    // unique - or at least that's what I was told during the kickoff meeting.
    var objectStore = db.createObjectStore('books', { keyPath: 'isbn' });

    // Create an index to search books by name. We may have duplicates
    // so we can't use a unique index.
    objectStore.createIndex('name', 'name', { unique: false });

    // Create an index to search books by author.
    objectStore.createIndex('author', 'author', { unique: false });

    // Use transaction oncomplete to make sure the objectStore creation is
    // finished before adding data into it.
    objectStore.transaction.oncomplete = function(event) {
        // Store values in the newly created objectStore.
        var booksObjectStore = db
            .transaction('books', 'readwrite')
            .objectStore('books');
        // booksData.forEach(function(book) {
        //     booksObjectStore.add(book);
        // });
    };
};

const loadBooks = books => {};

const loadAuthors = authors => {};

self.addEventListener(
    'message',
    function(e) {
        const data = e.data;
        switch (data.cmd) {
            case LAOD_BOOKS:
                loadBooks(data.books).then(() =>
                    self.postMessage({ message: 'Books loaded' })
                );
                break;
            case LAOD_BOOKS:
                break;
            case 'start':
                self.postMessage('WORKER STARTED: ' + data.msg);
                break;
            case 'stop':
                self.postMessage(
                    'WORKER STOPPED: ' +
                        data.msg +
                        '. (buttons will no longer work)'
                );
                self.close(); // Terminates the worker.
                break;
            default:
                self.postMessage('Unknown command: ' + data.msg);
        }
    },
    false
);
