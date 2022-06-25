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
        };
        getPost()
    }, [path]);

    const handleUpdate = async () => {

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
                {update ? <input type="text" value={post.title} className="singlePostTitleInput" /> : (
                    <h1 className="singlePostTitle">
                        {post.title}
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
                        Author:
                        <Link to={'/?user=' + post.username} className='link'>
                            <b>{post.username}</b>
                        </Link>
                    </span>
                    <span className='singlePostDate'>{new Date(post.createdAt).toDateString()}</span>
                </div>
                {update ? <textarea type="text" value={post.desc} className="singlePostDescInput" /> :
                    (<p className="singlePostDesc">
                        {post.desc}
                    </p>)}
            </div>
        </div>
    )
}
