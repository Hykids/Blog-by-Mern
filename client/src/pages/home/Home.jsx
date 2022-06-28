import Header from "../../components/header/Header"
import Posts from "../../components/posts/Posts"
import Sidebar from "../../components/sidebar/Sidebar"
import Bottombar from "../../components/bottombar/Bottombar"
import "./home.css"

export default function Home({ posts }) {
    return (
        <div className="homewrapper">
            <Header />
            <div className="home">
                <Posts posts={posts} />
                <Sidebar />
            </div>
            <Bottombar />
        </div>
    )
}
