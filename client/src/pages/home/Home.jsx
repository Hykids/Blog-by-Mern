import Header from "../../components/header/Header"
import Posts from "../../components/posts/Posts"
import Sidebar from "../../components/sidebar/Sidebar"
import Bottombar from "../../components/bottombar/Bottombar"
import "./home.css"

export default function Home({ props }) {
    const pages = props.slice(1, 3)
    return (
        <div className="homewrapper">
            <Header />
            <div className="home">
                <Posts posts={props[0]} />
                <Sidebar />
            </div>
            <Bottombar props={pages} />
        </div>
    )
}
