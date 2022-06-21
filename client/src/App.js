import Topbar from "./components/topbar/topbar"
import Home from "./pages/home/Home"
import Single from "./pages/single/Single"
import Write from "./pages/write/Write"
// import Setting from "./pages/setting/Setting"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import { Routes, Route } from 'react-router-dom';

const App = () => {
	const user = false
	return (
		<div>
			<Topbar />
			<Routes>
				<Route path="/" exact element={<Home />} />
				<Route path='/register' element={user ? <Home /> : <Register />} />
				<Route path='/login' element={user ? <Home /> : <Login />} />
				<Route path='/write' element={user ? <Write /> : <Login />} />
				<Route path='/post/:postid' element={<Single />} />
			</Routes>
		</div>
	)
}

export default App
