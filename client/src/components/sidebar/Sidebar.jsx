import { useEffect, useState } from 'react'
import axios from "axios"
import './sidebar.css'

export default function Sidebar() {
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    const fetchTabs = async () => {
      const res = await axios.get("/tabs")
      console.log(res.data)
      setTabs(res.data)
    }
    fetchTabs()
  }, [])
  return (
    <div className='sidebar'>

      <div className='sidebarItem'>
        <span className="sidebarTitle">
          <i class="fa-regular fa-avocado"></i>Category</span>
        <ul className='categoryList'>
          <li className="categoryListItem">Code</li>
          <li className="categoryListItem">Life</li>
          <li className="categoryListItem">Book</li>
          <li className="categoryListItem">Cinema</li>
        </ul>
      </div>
      <div className='sidebarItem'>
        <span className="sidebarTitle">Tag</span>
        <ul className='sidebatList'>
          {tabs.map(t => {
            return <li className="sidebarListItem">{t['tab']}</li>
          })}
        </ul>
      </div>
    </div>
  )
}
