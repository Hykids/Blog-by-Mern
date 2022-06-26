import { useLocation, Link } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react'
import { Context } from '../../context/Context'
import axios from "axios"
import './singlePost.css'

export default function SinglePost() {
    const PF = "http://localhost:3001/images/";
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({})
    const { user } = useContext(Context)

    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [update, setUpdate] = useState(false)

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get("/posts/" + path)
            setPost(res.data)
            setTitle(res.data.title)
            setDesc(res.data.desc)
        };
        getPost()
    }, [path]);

    const handleUpdate = async () => {
        try {
            await axios.put("/posts/" + path, {
                username: user._doc.username,
                title,
                desc,
            })
            setUpdate(false)
        } catch (err) { }
    }

    const handleDelete = async () => {
        try {
            await axios.delete("/posts/" + path, {
                data: { username: user._doc.username }
            })
            window.location.replace("/")
        } catch (err) { }
    }
    return (
        <div className='singlePost'>
            <div className="singlePostWrapper">
                {post.photo && <img className="singlePostImg" src={PF + post.photo} alt="" />}
                {update ? <input type="text" value={title} onChange={e => { setTitle(e.target.value) }} className="singlePostTitleInput" /> : (
                    <h1 className="singlePostTitle">
                        {title}
                        {post.username === user._doc.username && (
                            <div className="singlePostEdit">
                                <i className="singlePostIcon fa-solid fa-pen-to-square" onClick={e => setUpdate(true)}></i>
                                <i className="singlePostIcon fa-solid fa-trash-can" onClick={handleDelete}></i>
                            </div>
                        )}
                    </h1>
                )}
                <div className="singlePostInfo">
                    <span className='singlePostAutor'>
                        <i className="singlePostUserIcon fa-solid fa-user"></i>
                        Author:
                        <Link to={'/?user=' + post.username} className='link'>
                            <b>{post.username}</b>
                        </Link>
                    </span>
                    <span className='singlePostDate'>{new Date(post.createdAt).toDateString()}</span>
                </div>
                {update ? <textarea type="text" value={desc} className="singlePostDescInput" onChange={e => setDesc(e.target.value)} /> :
                    (<p className="singlePostDesc">
                        {desc}
                    </p>
                    )}
                {update && <button className="singlePostButton" onClick={handleUpdate}>保存</button>}
            </div>
        </div>
    )
}
