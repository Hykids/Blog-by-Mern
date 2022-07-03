import "./post.css"
import { Link } from 'react-router-dom'

function Post({ post }) {
    const PF = "http://localhost:3001/images/";
    return (
        <div className='post'>
            <div className="postInfo">
                <Link to={'/post/' + post._id} className='link'>
                    <span className="postTitle">
                        {post.title}
                    </span>
                </Link>
                <div className="postTabs">
                    {post.tab.map((c, index) => {
                        return <span key={index} className="postTab">{c}</span>
                    })}
                </div>
                <div className="postDetail">
                    <span className="postDate">
                        <i className="postDetaiIcon fa-solid fa-clock"></i>
                        {new Date(post.createdAt).toDateString()}
                    </span>
                    <span className="postDate">
                        <i className="postDetaiIcon fa-solid fa-user"></i>
                        {post.username}
                    </span>
                </div>
                {/* <p className="postDesc">
                    {post.desc}
                </p> */}
            </div>
            {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}
        </div>
    );
}

export default Post;
