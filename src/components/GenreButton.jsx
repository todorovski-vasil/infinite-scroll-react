import React from 'react';

const ALL = 'all';

const GenreButton = React.memo(props => {
    const genreLabel = props.genre ? props.genre : 'all genres';
    const value = props.genre ? props.genre : ALL;
    const defaultChecked = !props.genre;
    const labelClasses = props.selected
        ? 'btn btn-secondary active'
        : 'btn btn-secondary';

    return (
        <label className={labelClasses}>
            <input
                type='radio'
                name='genres'
                onClick={e => {
                    e.stopPropagation();
                    props.onClick(e);
                }}
                value={value}
                defaultChecked={defaultChecked}
            />
            {genreLabel}
        </label>
    );
});

export default GenreButton;
