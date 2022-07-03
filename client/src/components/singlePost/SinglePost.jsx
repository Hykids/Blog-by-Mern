import { useLocation, Link } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react'
import { Context } from '../../context/Context'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Toast from '../toast/index'
import ReactMarkdown from 'react-markdown'
import axios from "axios"
import './singlePost.css'

export default function SinglePost() {
    const PF = "http://localhost:3001/images/";
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({})
    const { user } = useContext(Context)

    const [title, setTitle] = useState("")
    const [tabs, setTabs] = useState([])
    const [desc, setDesc] = useState("")
    const [update, setUpdate] = useState(false)
    const [menuList, setMenuList] = useState([])

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get("/posts/" + path)
            setPost(res.data)
            setTitle(res.data.title)
            setDesc(res.data.desc)
            setTabs(res.data.tab)
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
            Toast.success("操作成功")
            setUpdate(false)
        } catch (err) { Toast.error(err.msg ? err.msg : err) }
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
            {menuList.length && <ul className="article-menu">
                <li className="menu-title">目录</li>
                {menuList.map((v, i) => {
                    return (
                        <li
                            className={`menu-item menu-item--lv${v.level} ${v.highlight ? "menu-item--act" : ""
                                }`}
                            key={i}
                        >
                            {/* <span onClick={() => smoothScroll(v.offsetH)}>{v.text}</span> */}
                        </li>
                    );
                })}
            </ul>}
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
                    (<div>
                        <p className="singlePostDesc">
                            <ReactMarkdown children={desc}
                                components={{
                                    code({ node, inline, className, children, ...props }) {
                                        const match = /language-(\w+)/.exec(className || '')
                                        return !inline && match ? (
                                            <SyntaxHighlighter
                                                children={String(children).replace(/\n$/, '')}
                                                style={dark}
                                                language={match[1]}
                                                PreTag="div"
                                                {...props}
                                            />
                                        ) : (
                                            <code className={className} {...props}>
                                                {children}
                                            </code>
                                        )
                                    }
                                }} />
                        </p>
                        {tabs.length !== 0 && <div className="singlePostTabList">
                            标签分类：{tabs.map(t => {
                                return <Link to={'/?tab=' + t} className="link">
                                    <span className="tabListItem">{t}</span>
                                </Link>
                            })}
                        </div>}
                    </div>
                    )}
                {update && <button className="singlePostButton" onClick={handleUpdate}>保存</button>}
            </div>
        </div>
    )
}
