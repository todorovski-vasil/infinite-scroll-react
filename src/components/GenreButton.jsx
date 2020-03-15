import React from 'react';

const ALL = 'all';

function GenreButton(props) {
    let genreLabel = 'all genres';
    let defaultChecked = false;
    let labelClasses = 'btn btn-secondary';
    if (props.genre !== '') {
        defaultChecked = true;
        genreLabel = props.genre;
    }
    if (
        props.genreFilter === props.genre ||
        (!props.genreFilter && props.genre === '')
    ) {
        labelClasses += ' active';
    }
    return (
        <label className={labelClasses}>
            <input
                type='radio'
                name='genres'
                onClick={e => {
                    e.stopPropagation();
                    props.onClick(e);
                }}
                value={props.genre !== '' ? props.genre : ALL}
                defaultChecked={defaultChecked}
            />
            {genreLabel}
        </label>
    );
}

export default GenreButton;
