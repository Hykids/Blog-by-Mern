import Topbar from "./components/topbar/topbar"
import Home from "./pages/home/Home"
import Single from "./pages/single/Single"
import Write from "./pages/write/Write"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import { useContext } from "react"
import { Routes, Route } from 'react-router-dom';
import { Context } from "./context/Context"

const App = () => {
	const { user } = useContext(Context);
	return (
		<div>
			<Topbar />
			<Routes>
				<Route path="/" exact element={<Home />} />
				<Route path='/register' element={user ? <Home /> : <Register />} />
				<Route path='/login' element={user ? <Home /> : <Login />} />
				<Route path='/write' element={user ? <Write /> : <Login />} />
				<Route path='/post/:postid' element={user ? <Single /> : <Login />} />
			</Routes>
		</div>
	)
}

export default App
