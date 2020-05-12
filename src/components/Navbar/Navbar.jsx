import React, { useContext } from 'react';

import GenreButton from './GenreButton';
import { booksContext } from '../../App';
import * as actions from '../../store/actions/books';

const ALL = 'all';
const MALE = 'M',
    FEMALE = 'F';

const Navbar = (props) => {
    const { state, dispatch } = useContext(booksContext);

    const genres = ['', ...state.genres];

    const { genreFilter, authorGenderFilter } = state;

    const orderByBookName = (e) => {
        e.stopPropagation();
        dispatch(actions.setOrderByName());
    };

    const orderByAuthorName = (e) => {
        e.stopPropagation();
        dispatch(actions.setOrderByAuthorName());
    };

    const genreChange = (e) => {
        e.stopPropagation();
        const filter = e.target.value === ALL ? null : e.target.value;
        dispatch(actions.setGenreFilter(filter));
    };

    const authorGenderChange = (e) => {
        e.stopPropagation();
        const filter = e.target.value === ALL ? null : e.target.value;
        dispatch(actions.setAuthorGenderFilter(filter));
    };

    const allGendersLabel = 'all authors';
    const maleAuthorsLabel = 'male authors';
    const femaleAuthorsLabel = 'female authors';

    let genderAllClasses = 'btn btn-secondary';
    let genderMClasses = 'btn btn-secondary';
    let genderFClasses = 'btn btn-secondary';

    if (!authorGenderFilter) {
        genderAllClasses += ' active';
    } else if (authorGenderFilter === MALE) {
        genderMClasses += ' active';
    } else if (authorGenderFilter === FEMALE) {
        genderFClasses += ' active';
    }

    return (
        <div className='bookListNavbar'>
            <button
                onClick={orderByBookName}
                className='btn btn-primary mt-1 ml-1 mb-1'
            >
                order by book name
            </button>
            <button onClick={orderByAuthorName} className='btn btn-primary m-1'>
                order by author name
            </button>
            <div
                className='btn-group btn-group-toggle ml-1 mr-1'
                data-toggle='buttons'
            >
                {genres.map((genre) => {
                    const selected =
                        genre === genreFilter || (!genreFilter && genre === '');
                    return (
                        <GenreButton
                            key={genre ? genre : 'allGenres'}
                            genre={genre}
                            selected={selected}
                            onClick={genreChange}
                        ></GenreButton>
                    );
                })}
            </div>
            <div
                className='btn-group btn-group-toggle m-1'
                data-toggle='buttons'
            >
                <label className={genderAllClasses}>
                    <input
                        type='radio'
                        name='gender'
                        onClick={authorGenderChange}
                        value={ALL}
                    />
                    {allGendersLabel}
                </label>
                <label className={genderMClasses}>
                    <input
                        type='radio'
                        name='gender'
                        onClick={authorGenderChange}
                        value={MALE}
                    />
                    {maleAuthorsLabel}
                </label>
                <label className={genderFClasses}>
                    <input
                        type='radio'
                        name='gender'
                        onClick={authorGenderChange}
                        value={FEMALE}
                    />
                    {femaleAuthorsLabel}
                </label>
            </div>
        </div>
    );
};

export default Navbar;
