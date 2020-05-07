export const loggerMiddleware = (state) => (next) => (action) => {
    console.group(action.type);
    console.info('dispatching', action);
    console.log('state', state);
    let result = next(action);
    console.log('next state', state);
    console.groupEnd();
    return result;
};