import "./post.css"

function Post({ post }) {
    const PF = "http://localhost:3001/images/";
    return (
        <div className='post'>
            <div className="postInfo">

                <span className="postTitle">
                    {post.title}
                </span>
                <div className="postTabs">
                    {post.tab.map((c, index) => {
                        return <span key={index} className="postTab">{c}</span>
                    })}
                </div>
                <span className="postDate">
                    {new Date(post.createdAt).toDateString()}
                </span>
                <p className="postDesc">
                    {post.desc}
                </p>
            </div>
            {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}
        </div>
    );
}

export default Post;
