import React from 'react';

function useStateProper(initialState) {
    const [stateProper, setStateProper] = React.useState(initialState);

    const _setStateProper = React.useCallback(
        (newStateProper, callback) => {
            if (callback) {
                // use a callback
                if (typeof newStateProper == 'function') {
                    setStateProper(s => {
                        let newState = newStateProper(s);
                        setTimeout(callback, 0, newState);
                        return newState;
                    });
                } else {
                    setStateProper(() => {
                        setTimeout(callback, 0, newStateProper);
                        return newStateProper;
                    });
                }
            } else {
                // return a promise
                if (typeof newStateProper == 'function') {
                    return new Promise(resolve => {
                        setStateProper(s => {
                            let newState = newStateProper(s);
                            setTimeout(resolve, 0, newState);
                            return newState;
                        });
                    });
                } else {
                    return new Promise(resolve => {
                        setStateProper(() => {
                            setTimeout(resolve, 0, newStateProper);
                            return newStateProper;
                        });
                    });
                }
            }
        },
        [setStateProper]
    );

    return [stateProper, _setStateProper];
}

export { useStateProper };
