import React from 'react'
import './register.css'

export default function register() {
    return (
        <div className='register'>
            <span className="registerTitle">Register</span>
            <form className='registerForm'>
                <label>Username</label>
                <input type="text" className='registerInput' placeholder='输入用户名' />
                <label>Email</label>
                <input type="text" className='registerInput' placeholder='输入邮箱' />
                <label>Password</label>
                <input type="password" className='registerInput' placeholder='输入密码' />
                <button className='registerButton'>注册</button>
                <a className='toLogin' href="/login"><i class="fa-solid fa-arrow-left-long"></i>已有账户？直接登录</a>
            </form>
        </div>
    );
}
