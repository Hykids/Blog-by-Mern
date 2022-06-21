import './sidebar.css'

export default function Sidebar() {
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
          <li className="sidebarListItem">React</li>
          <li className="sidebarListItem">Node</li>
          <li className="sidebarListItem">MongoDB</li>
          <li className="sidebarListItem">Epress</li>
        </ul>
      </div>
    </div>
  )
}
