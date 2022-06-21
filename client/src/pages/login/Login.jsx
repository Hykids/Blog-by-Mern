import React from 'react';
import './login.css'

const Login = () => {
    return (
        <div className='login'>
            <span className="loginTitle">Login</span>
            <form className='loginForm'>
                <label>Email</label>
                <input type="text" className='loginInput' placeholder='输入邮箱' />
                <label>Password</label>
                <input type="password" className='loginInput' placeholder='输入密码' />
                <button className='loginButton'>登录</button>
                <a className='toRegister' href="/register">注册账户<i class="fa-solid fa-arrow-right-long"></i></a>
            </form>
        </div>
    );
}

export default Login;
