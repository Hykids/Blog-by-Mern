import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from "axios"
import './sidebar.css'

export default function Sidebar() {
  const [tabs, setTabs] = useState([]);
  const [cats, setCategory] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const res1 = await axios.get("/tabs")
      const res2 = await axios.get("/categories")
      setTabs(res1.data)
      setCategory(res2.data)
    }
    fetchItems()
  }, [])
  return (
    <div className='sidebar'>

      <div className='sidebarItem'>
        <span className="sidebarTitle">
          <i class="fa-regular fa-avocado"></i>Category</span>
        <ul className='categoryList'>
          {cats.map(c => {
            return <li className="categoryListItem">{c.name}</li>
          })}
        </ul>
      </div>
      <div className='sidebarItem'>
        <span className="sidebarTitle">Tag</span>
        <ul className='sidebatList'>
          {tabs.map(t => {
            return <Link to={'/?tab=' + t.tab} className="link">
              <li className="sidebarListItem">{t['tab']}</li>
            </Link>
          })}
        </ul>
      </div>
    </div>
  )
}
