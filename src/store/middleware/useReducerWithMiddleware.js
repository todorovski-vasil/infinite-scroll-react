import { useReducer } from 'react';

// const loggingMiddleware = (state) => (next) => (action) => {
//     console.log('dispatching', action);
//     let result = next(action);
//     console.log('next state', state);
//     return result;
// };

export const useReducerWithMiddleware = (
    reducer,
    initialState,
    middlewareList = []
) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const enhancedDispatch = middlewareList.reduce(
        (accDispatch, middleware) => middleware(state)(accDispatch),
        dispatch
    );

    return [state, enhancedDispatch];
};
