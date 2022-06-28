import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import React from 'react';
import './bottombar.css'

const Bottombar = () => {
    return (
        <div className='bottom'>
            <Pagination count={10} variant="outlined" />
        </div>
    );
}

export default Bottombar;
