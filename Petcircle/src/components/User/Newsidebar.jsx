import React from 'react'
import '../../assets/css/new.css'

export const Newsidebar = () => {
  return (
    <div>
  <meta charSet="UTF-8" />
  <title> Responsive Sidebar Menu  | CodingLab </title>
  <link rel="stylesheet" href="style.css" />
  <link href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css" rel="stylesheet" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <div className="sidebar">
    <div className="logo-details">
      <i className="bx bxl-c-plus-plus icon" />
      <div className="logo_name">CodingLab</div>
      <i className="bx bx-menu" id="btn" />
    </div>
    <ul className="nav-list">
      <li>
        <i className="bx bx-search" />
        <input type="text" placeholder="Search..." />
        <span className="tooltip">Search</span>
      </li>
      <li>
        <a href="#">
          <i className="bx bx-grid-alt" />
          <span className="links_name">Dashboard</span>
        </a>
        <span className="tooltip">Dashboard</span>
      </li>
      <li>
        <a href="#">
          <i className="bx bx-user" />
          <span className="links_name">User</span>
        </a>
        <span className="tooltip">User</span>
      </li>
      <li>
        <a href="#">
          <i className="bx bx-chat" />
          <span className="links_name">Messages</span>
        </a>
        <span className="tooltip">Messages</span>
      </li>
      <li>
        <a href="#">
          <i className="bx bx-pie-chart-alt-2" />
          <span className="links_name">Analytics</span>
        </a>
        <span className="tooltip">Analytics</span>
      </li>
      <li>
        <a href="#">
          <i className="bx bx-folder" />
          <span className="links_name">File Manager</span>
        </a>
        <span className="tooltip">Files</span>
      </li>
      <li>
        <a href="#">
          <i className="bx bx-cart-alt" />
          <span className="links_name">Order</span>
        </a>
        <span className="tooltip">Order</span>
      </li>
      <li>
        <a href="#">
          <i className="bx bx-heart" />
          <span className="links_name">Saved</span>
        </a>
        <span className="tooltip">Saved</span>
      </li>
      <li>
        <a href="#">
          <i className="bx bx-cog" />
          <span className="links_name">Setting</span>
        </a>
        <span className="tooltip">Setting</span>
      </li>
      <li className="profile">
        <div className="profile-details">
          <img src="profile.jpg" alt="profileImg" />
          <div className="name_job">
            <div className="name">Prem Shahi</div>
            <div className="job">Web designer</div>
          </div>
        </div>
        <i className="bx bx-log-out" id="log_out" />
      </li>
    </ul>
  </div>
  <section className="home-section">
    <div className="text">Dashboard</div>
  </section>
</div>
  )
}
