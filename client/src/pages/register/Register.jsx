import { useState } from 'react'
import axios from "axios"
import './register.css'

export default function Register() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(false)
        try {
            const res = await axios.post("/auth/register", {
                username: username,
                email: email,
                password: password
            })
            res.data && window.location.replace("/login")
        } catch (err) {
            setError(true)
            console.log(err)
        }
    }
    return (
        <div className='register'>
            <span className="registerTitle">Register</span>
            <form className='registerForm' onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text"
                    className='registerInput'
                    placeholder='输入用户名'
                    onChange={e => setUsername(e.target.value)} />
                <label>Email</label>
                <input type="text"
                    className='registerInput'
                    placeholder='输入邮箱'
                    onChange={e => setEmail(e.target.value)} />
                {error && <span className='error'>账户已存在，请检查用户名或邮箱</span>}
                <label>Password</label>
                <input type="password"
                    className='registerInput'
                    placeholder='输入密码'
                    onChange={e => setPassword(e.target.value)} />
                <button className='registerButton'>注册</button>
                <a className='toLogin' href="/login"><i class="fa-solid fa-arrow-left-long"></i>已有账户？直接登录</a>
            </form>
        </div>
    );
}
