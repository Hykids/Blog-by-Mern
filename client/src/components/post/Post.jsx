import "./post.css"
import { Link } from "react-router-dom"

function Post({ post }) {
    return (
        <div className='post'>
            {/* <img className="postImg" src="https://th.bing.com/th/id/OIP.0GJmxu5xcbDndEeCn3zfxAHaE7?w=263&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7" alt="" /> */}
            <div className="postInfo">
                <div className="postTabs">
                    {post.tab.map(c => {
                        <span className="postTab">{c}</span>
                    })}
                </div>
                <Link to={'/post/' + post._id} className='link'>
                    <span className="postTitle">
                        {post.title}
                    </span>
                </Link>
                <span className="postDate">
                    {new Date(post.createdAt).toDateString()}
                </span>
                <p className="postDesc">
                    {post.desc}
                </p>
            </div>
        </div>
    );
}

export default Post;
