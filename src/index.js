import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import createSagaMiddleware from 'redux-saga';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import { booksReducer } from './store/reducers/books';
// import { rootSaga } from './store/sagas/booksSaga';

// const sagaMiddleware = createSagaMiddleware();

// const actionSanitizer = (action) =>
//     action.type === 'SET_BOOKS' && action.books
//         ? {
//               ...action,
//               books: JSON.stringify(action.books),
//               availableBooks: JSON.stringify(action.books),
//           }
//         : action;

// const composeEnhancers = composeWithDevTools({
//     actionSanitizer,
//     stateSanitizer: (state) =>
//         state.books
//             ? {
//                   ...state,
//                   books: JSON.stringify(state.books),
//                   availableBooks: JSON.stringify(state.books),
//               }
//             : state,
// });

// const store = createStore(
//     booksReducer,
//     // composeWithDevTools(applyMiddleware(sagaMiddleware))
//     composeEnhancers(applyMiddleware(sagaMiddleware))
// );
// sagaMiddleware.run(rootSaga);

ReactDOM.render(
    // <Provider store={store}>
    <App />,
    // </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
