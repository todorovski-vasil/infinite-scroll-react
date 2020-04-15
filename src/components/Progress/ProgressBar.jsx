import React from 'react';

function ProgressBar({ label, percentage }) {
    return (
        <div>
            <label for='file'>{label}:</label>
            <progress id='file' value={percentage} max='100'>
                {' ' + percentage + '%' + ' '}
            </progress>
        </div>
    );
}

export default ProgressBar;
