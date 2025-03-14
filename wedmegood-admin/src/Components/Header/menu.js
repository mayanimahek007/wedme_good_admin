import { faAngleDown } from '@fortawesome/free-solid-svg-icons/faAngleDown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react';
import './menu.css'
import { NavLink, useLocation } from 'react-router-dom';

const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const toggleDropdown = () => {
        setIsOpen((prevState) => !prevState);  // Toggle kare che
    };
    return (
        <>

            <nav class="navbar show navbar-vertical h-lg-screen navbar-expand-lg px-0 py-3 navbar-light bg-white border-bottom border-bottom-lg-0 border-end-lg" id="navbarVertical">
                <div class="container-fluid">
                    <button class="navbar-toggler ms-n2" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarCollapse" aria-controls="sidebarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <a class="align-items-center d-flex fs-4 mb-lg-5 me-0 navbar-brand px-lg-6 py-lg-2 gap-1" href="/dashboard">
                        <img src={require('../../Images/logo1.png')} alt="..." className='scsdcds'/><span>Wed<b className='text_primary'>Me</b>Good
                        </span>
                    </a>
                    <div class="navbar-user d-lg-none">
                        <div class="dropdown">
                            <a href="#" id="sidebarAvatar" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <div class="avatar-parent-child">
                                    <img alt="Image Placeholder" src="https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80" class="avatar avatar- rounded-circle" />
                                    <span class="avatar-child avatar-badge bg-success"></span>
                                </div>
                            </a>
                            <div class="dropdown-menu dropdown-menu-end" aria-labelledby="sidebarAvatar">
                                <a href="#" class="dropdown-item">Profile</a>
                                <a href="#" class="dropdown-item">Settings</a>
                                <a href="#" class="dropdown-item">Billing</a>
                                <hr class="dropdown-divider" />
                                <a href="#" class="dropdown-item">Logout</a>
                            </div>
                        </div>
                    </div>
                    <div class="collapse navbar-collapse" id="sidebarCollapse">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/dashboard">
                                    <i className="bi bi-house"></i> Dashboard
                                </NavLink>
                                {/* <a class="nav-link" href="/dashboard">
                                    <i class="bi bi-house"></i> Dashboard
                                </a> */}
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-black" href="#">
                                    <i class="bi bi-bar-chart"></i> Vendors <FontAwesomeIcon icon={faAngleDown} onClick={toggleDropdown} />
                                </a>
                            </li>
                            {isOpen && (
                                <div
                                    className="dropdown-content ps-3 pt-1 pe-2 pb-2"
                                    style={{
                                        border: "none",
                                        background: "#fff",
                                        width: "100%",
                                    }}
                                >
                                    <div class="">
                                        <a href="/photographer" className='view_vanuew'>
                                            <div class="menu_list_hov text-black-50 ms-12" style={{ lineHeight: '2rem' }}>Photographer</div></a>
                                        <a href="/pre-wedding" className='view_vanuew'>
                                            <div class="menu_list_hov text-black-50 ms-12" style={{ lineHeight: '2rem' }}>Prewedding</div></a>
                                        <a href="/make-up" className='view_vanuew'>
                                            <div class="menu_list_hov text-black-50 ms-12" style={{ lineHeight: '2rem' }}>MakeUp</div></a>
                                        <a href="/music-dance" className='view_vanuew'>
                                            <div class="menu_list_hov text-black-50 ms-12" style={{ lineHeight: '2rem' }}>Music & Dance</div></a>
                                        <a href="/planning-decor" className='view_vanuew'>
                                        <a href="/mehandi" className='view_vanuew'>
                                            <div class="menu_list_hov text-black-50 ms-12" style={{ lineHeight: '2rem' }}>Mehandi</div></a>
                                            <div class="menu_list_hov text-black-50 ms-12" style={{ lineHeight: '2rem' }}>Planning & Decor</div></a>
                                        <a href="/food" className='view_vanuew'>
                                            <div class="menu_list_hov text-black-50 ms-12" style={{ lineHeight: '2rem' }}>Food</div></a>
                                    </div>
                                </div>
                            )}



                            {/* <li class="nav-item">
                                <a class="nav-link" href="#">
                                    <i class="bi bi-chat"></i> Messages
                                    <span class="badge bg-soft-primary text-primary rounded-pill d-inline-flex align-items-center ms-auto">6</span>
                                </a>
                            </li> */}
                            <li class="nav-item">
                                <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/venues">
                                    <i className="bi bi-chat"></i> Venues
                                </NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/real-wedding">
                                    <i className="bi bi-chat"></i> Real Wedding
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/service">
                                    <i className="bi bi-chat"></i> Services
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/user">
                                    <i className="bi bi-people"></i> Users
                                </NavLink>
                            </li>
                        </ul>
                        <hr className="navbar-divider my-5 opacity-70" />
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/">
                                    <i className="bi bi-box-arrow-left"></i> Logout
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Menu