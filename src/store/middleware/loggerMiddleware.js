export const loggerMiddleware = (state) => (next) => (action) => {
    console.group(action.type);
    console.info('dispatching', action);
    console.log('state', state);
    console.groupEnd();
    return next(action);
};
