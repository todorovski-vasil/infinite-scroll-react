import React from 'react';
import GenreButton from './GenreButton';

const ALL = 'all';
const MALE = 'M',
    FEMALE = 'F';

function Navbar(props) {
    const allGendersLabel = 'all genders';
    const maleAuthorsLabel = 'male authors';
    const femaleAuthorsLabel = 'female authors';

    let genderAllClasses = 'btn btn-secondary';
    let genderMClasses = 'btn btn-secondary';
    let genderFClasses = 'btn btn-secondary';

    if (!props.genderFilter) {
        genderAllClasses += ' active';
    } else if (props.genderFilter === MALE) {
        genderMClasses += ' active';
    } else if (props.genderFilter === FEMALE) {
        genderFClasses += ' active';
    }

    return (
        <div className='bookListNavbar'>
            <button
                onClick={e => {
                    e.stopPropagation();
                    props.onOrderByBookName(e);
                }}
                className='btn btn-primary mt-1 ml-1 mb-1'
            >
                order by book name
            </button>
            <button
                onClick={e => {
                    e.stopPropagation();
                    props.onOrderByAuthorName(e);
                }}
                className='btn btn-primary m-1'
            >
                order by author name
            </button>
            <div
                className='btn-group btn-group-toggle ml-1 mr-1'
                data-toggle='buttons'
            >
                {props.genres.map(genre => (
                    <GenreButton
                        key={genre}
                        genre={genre}
                        genreFilter={props.genreFilter}
                        onClick={e => {
                            e.stopPropagation();
                            props.onGenreChange(e);
                        }}
                    ></GenreButton>
                ))}
            </div>
            <div
                className='btn-group btn-group-toggle m-1'
                data-toggle='buttons'
            >
                <label className={genderAllClasses}>
                    <input
                        type='radio'
                        name='gender'
                        onClick={e => {
                            e.stopPropagation();
                            props.onGenderChange(e);
                        }}
                        value={ALL}
                    />
                    {allGendersLabel}
                </label>
                <label className={genderMClasses}>
                    <input
                        type='radio'
                        name='gender'
                        onClick={e => {
                            e.stopPropagation();
                            props.onGenderChange(e);
                        }}
                        value={MALE}
                    />
                    {maleAuthorsLabel}
                </label>
                <label className={genderFClasses}>
                    <input
                        type='radio'
                        name='gender'
                        onClick={e => {
                            e.stopPropagation();
                            props.onGenderChange(e);
                        }}
                        value={FEMALE}
                    />
                    {femaleAuthorsLabel}
                </label>
            </div>
        </div>
    );
}

export default Navbar;
