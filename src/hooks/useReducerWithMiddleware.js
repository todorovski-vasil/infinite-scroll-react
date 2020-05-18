import { useReducer } from 'react';

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
