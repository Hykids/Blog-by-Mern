import Topbar from "./components/topbar/topbar"
import Home from "./pages/home/Home"
import Single from "./pages/single/Single"
import Write from "./pages/write/Write"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import { useContext, useEffect, useState } from "react"
import { Routes, Route, useLocation } from 'react-router-dom';
import { Context } from "./context/Context"
import axios from "axios"

const App = () => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState("");
	const [display, setDisplay] = useState([]);
	const { user } = useContext(Context);
	const { search } = useLocation();

	useEffect(() => {
		const fetchPosts = async () => {
			const res = await axios.get("/posts" + search)
			setPosts(res.data.records)
			setPage(res.data.page)
			setDisplay(res.data.display)
		}
		fetchPosts()
	}, [search])
	return (
		<div>
			<Topbar />
			<Routes>
				<Route path="/" exact element={<Home props={[posts, page, display]} />} />
				<Route path='/register' element={user ? <Home /> : <Register />} />
				<Route path='/login' element={user ? <Home /> : <Login />} />
				<Route path='/write' element={user ? <Write /> : <Login />} />
				<Route path='/post/:postid' element={user ? <Single /> : <Login />} />
			</Routes>
		</div>
	)
}

export default App
