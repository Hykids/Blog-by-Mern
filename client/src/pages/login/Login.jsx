import axios from 'axios';
import { useRef, useContext } from 'react'
import { Context } from '../../context/Context';
import './login.css'

const Login = () => {
    const userRef = useRef();
    const passwordRef = useRef();
    const { dispatch, isFetching } = useContext(Context)

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch({ type: "LOGIN_START" })
        try {
            const res = await axios.post("/auth/login", {
                email: userRef.current.value,
                password: passwordRef.current.value
            })
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE" })
        }
    }
    return (
        <div className='login'>
            <span className="loginTitle">Login</span>
            <form className='loginForm' onSubmit={handleSubmit}>
                <label>Email</label>
                <input type="text"
                    className='loginInput'
                    placeholder='输入邮箱'
                    ref={userRef} />
                <label>Password</label>
                <input type="password"
                    className='loginInput'
                    placeholder='输入密码'
                    ref={passwordRef} />
                <button className='loginButton' type='submit' disabled={isFetching}>登录</button>
                <a className='toRegister' href="/register">注册账户<i class="fa-solid fa-arrow-right-long"></i></a>
            </form>
        </div>
    );
}

export default Login;
