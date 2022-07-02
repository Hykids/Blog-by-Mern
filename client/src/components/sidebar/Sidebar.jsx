import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from "axios"
import './sidebar.css'

export default function Sidebar() {
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const res1 = await axios.get("/tabs")
      setTabs(res1.data)
    }
    fetchItems()
  }, [])

  return (
    <div className='sidebar'>
      <div className='sidebarItem'>
        <span className="sidebarTitle">
          <i className="sidebarIcon fa-solid fa-cube"></i>
          关于网站
        </span>
        <p>使用MERN技术栈搭建的个人博客，记录日常与技术。已实现基本样式与文章的增删改查。余下功能正在开发中。</p>
        <p>关于我：<a className='link' href='https://github.com/Hykids'><i class="fa-brands fa-github"></i></a></p>
        <p><a className='link' href="https://github.com/Hykids/Blog">代码仓库</a></p>
      </div>
      <div className='sidebarItem'>
        <span className="sidebarTitle">
          <i className="sidebarIcon fa-solid fa-tags"></i>Tag</span>
        <ul className='sidebatList'>
          {tabs.map((t, index) => {
            return <Link to={'/?tab=' + t.tab} className="link">
              <li key={index} className="sidebarListItem">{t['tab']}</li>
            </Link>
          })}
        </ul>
      </div>
    </div>
  )
}
