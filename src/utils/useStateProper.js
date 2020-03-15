import React from 'react';

function useStateProper(initialState) {
    const [stateProper, setStateProper] = React.useState(initialState);

    const stateProperRef = React.useRef(stateProper);
    React.useEffect(() => {
        stateProperRef.current = stateProper;
    }, [stateProper]);

    const _setStateProper = (newStateProper, callback) => {
        if (callback) {
            if (typeof newStateProper == 'function') {
                setStateProper(s => {
                    setTimeout(callback, 0);
                    return newStateProper(s);
                });
            } else {
                setStateProper(() => {
                    setTimeout(callback, 0);
                    return newStateProper;
                });
            }
        } else {
            if (typeof newStateProper == 'function') {
                return new Promise(resolve => {
                    setStateProper(s => {
                        setTimeout(resolve, 0, stateProperRef.current);
                        return newStateProper(s);
                    });
                });
            } else {
                return new Promise(resolve => {
                    setStateProper(() => {
                        setTimeout(resolve, 0, stateProperRef.current);
                        return newStateProper;
                    });
                });
            }
        }
    };

    return [stateProper, _setStateProper];
}

export { useStateProper };
