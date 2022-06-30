import Pagination from '@mui/material/Pagination';
import React from 'react';
import PaginationItem from '@mui/material/PaginationItem';
import { Link } from 'react-router-dom';
import './bottombar.css'

const Bottombar = ({ props }) => {
    const page = props[0]
    const total = props[1].length

    return (
        <div className='bottom'>
            <Pagination count={total} page={page} variant="outlined"
                renderItem={(item) => (
                    <PaginationItem
                        component={Link}
                        to={`/${item.page === 1 ? '' : `?page=${item.page}`}`}
                        {...item}
                    />
                )} />
        </div>
    );
}

export default Bottombar;
