import React from 'react'
import './topbar.css'
import { Link } from 'react-router-dom';

export default function topbar() {
    const user = false
    return (
        <div className='top'>
            <div className='topLeft'>
                <i class="topIcon fa-solid fa-cube"></i>
            </div>
            <div className='topCenter'>
                <ul className='topList'>
                    <li className='topListItem'>
                        <Link to="/" className='link'>Home</Link>
                    </li>
                    <li className='topListItem'>About</li>
                    <li className='topListItem'>Contact</li>
                    <li className='topListItem'>
                        <Link to="/write" className='link'>Write</Link>
                    </li>
                    <li className='topListItem'>
                        {user && "Logout"}
                    </li>
                </ul>
            </div>
            <div className='topRight'>
                {
                    user ? (
                        <img className='topImg' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxzIe5lDEHN528qVe-g88NWgiI6LFuMEKihw&usqp=CAU" alt="" />
                    ) : (
                        <ul className='topList'>
                            <li className='topListItem'>
                                <Link to="/login" className='link'>登录</Link>
                            </li>
                            <li className='topListItem'>
                                <Link to="/register" className='link'>注册</Link>
                            </li>
                        </ul>
                    )
                }

                <i class="topSearchIcon fa-solid fa-magnifying-glass"></i>
            </div>
        </div>
    )
}
