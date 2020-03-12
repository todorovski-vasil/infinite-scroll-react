import React from 'react';

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
                onClick={props.onClick}
                value={props.genre !== '' ? props.genre : 'all'}
                defaultChecked={defaultChecked}
            />
            {genreLabel}
        </label>
    );
}

function Navbar(props) {
    const allGendersLabel = 'all genders';
    const maleAuthorsLabel = 'male authors';
    const femaleAuthorsLabel = 'female authors';

    // const allGenresSelector = (
    //     <GenreButton
    //         genre={''}
    //         genreFilter={props.genreFilter}
    //         onClick={props.genreChange}
    //     ></GenreButton>
    // );
    const genreSelector = ['', ...props.genres].map(genre => (
        <GenreButton
            key={genre}
            genre={genre}
            genreFilter={props.genreFilter}
            onClick={props.onGenreChange}
        ></GenreButton>
    ));
    const genreSelectors = (
        <div
            className='btn-group btn-group-toggle ml-1 mr-1'
            data-toggle='buttons'
        >
            {/* {allGenresSelector} */}
            {genreSelector}
        </div>
    );

    let genderAllClasses = 'btn btn-secondary';
    let genderMClasses = 'btn btn-secondary';
    let genderFClasses = 'btn btn-secondary';

    if (!props.genderFilter) {
        genderAllClasses += ' active';
    } else if (props.genderFilter === 'M') {
        genderMClasses += ' active';
    } else if (props.genderFilter === 'F') {
        genderFClasses += ' active';
    }

    return (
        <div className='navbar'>
            <button
                onClick={props.onOrderByBookName}
                className='btn btn-primary mt-1 ml-1 mb-1'
            >
                order by book name
            </button>
            <button
                onClick={props.onOrderByAuthorName}
                className='btn btn-primary m-1'
            >
                order by author name
            </button>
            <br />
            {genreSelectors}
            <br />
            <div
                className='btn-group btn-group-toggle m-1'
                data-toggle='buttons'
            >
                <label className={genderAllClasses}>
                    <input
                        type='radio'
                        name='gender'
                        onClick={props.onGenderChange}
                        value='all'
                    />
                    {allGendersLabel}
                </label>
                <label className={genderMClasses}>
                    <input
                        type='radio'
                        name='gender'
                        onClick={props.onGenderChange}
                        value='M'
                    />
                    {maleAuthorsLabel}
                </label>
                <label className={genderFClasses}>
                    <input
                        type='radio'
                        name='gender'
                        onClick={props.onGenderChange}
                        value='F'
                    />
                    {femaleAuthorsLabel}
                </label>
            </div>
        </div>
    );
}

export default Navbar;
