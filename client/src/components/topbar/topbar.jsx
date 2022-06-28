import './topbar.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from "react"
import { Context } from "../../context/Context"
import axios from 'axios';


export default function Topbar() {
    const { user, dispatch } = useContext(Context);
    const [keyword, setKeyword] = useState("");
    let navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        await axios.get("/posts?title=" + keyword)
        //window.location.replace("/?title=" + keyword)
        navigate("../?title=" + keyword, { replace: true });
    }
    const handleLogout = () => {
        dispatch({ type: "LOGOUT" })
    }
    return (
        <div className='top'>
            <div className='topLeft'>
                <i className="topIcon fa-solid fa-blog"></i>
                <ul className='topList'>
                    <li className='topListItem'>
                        <Link to="/" className='link'>Home</Link>
                    </li>
                    <li className='topListItem'>
                        <Link to="/write" className='link'>Write</Link>
                    </li>
                    <li className='topListItem' onClick={handleLogout}>
                        {user && "Logout"}
                    </li>
                </ul>
            </div>
            <div className="topCenter"></div>
            <div className='topRight'>
                <i className="topSearchIcon fa-solid fa-magnifying-glass" onClick={handleSearch}></i>
                <input className='topSearchInput' type="search" onChange={e => setKeyword(e.target.value)} />
                {
                    user ? (
                        <p>登录用户：<b>{user._doc.username}</b></p>
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
            </div>
        </div >
    )
}
