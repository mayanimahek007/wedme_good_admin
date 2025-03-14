import React, { useEffect, useState } from 'react';
import './dashboard.css';
import Header from '../Header/header';
import Menu from '../Header/menu';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Service from './../Service/service';
import Photographer from './../Vendors/Photographer/photographer';
import MakeUp from './../Vendors/MakeUp/makeUp';

const Dashboard = () => {
    const [photographers, setPhotographers] = useState([]);
    const [music, setMusic] = useState([]);
    const [planning, setPlanning] = useState([]);
    const [photographersDsh, setPhotographersDsh] = useState([]);
    const [photographersRl, setPhotographersRl] = useState([]);
    const [photographersFd, setPhotographersFd] = useState([]);
    const [users, setUsers] = useState([]);
    const [Service, setService] = useState([]);
    const [venues, setVenues] = useState([]);
    const [highestPhographerPrice, setHighestPhotographerPrice] = useState(0);
    const [highestVenuePrice, setHighestVenuePrice] = useState(0);

    const navigate = useNavigate();


    const getService = () => {
        axios.get('https://wedmegood-backend.onrender.com/api/v1/service/get')
            .then(response => {
                setService(response.data); // Update state with API response
            })
            .catch(error => {
                console.error('Error fetching service:', error);
            });
    }

    const getPhotographeMusic = () => {
        axios.get('https://wedmegood-backend.onrender.com/api/v1/music/get')
            .then(response => {
                const allPhotographers = response.data;
                if (allPhotographers.length > 0) {
                    // Find the maximum price
                    const maxPrice = Math.max(...allPhotographers.map(p => p.musicPrice));

                    // Filter photographers who have the highest price
                    const highestPricedPhotographers = allPhotographers.filter(p => p.musicPrice === maxPrice);

                    setMusic(highestPricedPhotographers); // Set all photographers with the highest price
                }
            })
            .catch(error => {
                console.error('Error fetching photographers:', error);
            });
    }
    const getPlanning = () => {
        axios.get('https://wedmegood-backend.onrender.com/api/v1/planningDecor/get')
            .then(response => {
                const allPhotographers = response.data;
                if (allPhotographers.length > 0) {
                    // Find the maximum price
                    const maxPrice = Math.max(...allPhotographers.map(p => p.planningPrice));

                    // Filter photographers who have the highest price
                    const highestPricedPhotographers = allPhotographers.filter(p => p.planningPrice === maxPrice);

                    setPlanning(highestPricedPhotographers); // Set all photographers with the highest price
                }
            })
            .catch(error => {
                console.error('Error fetching photographers:', error);
            });
    }

    const getUser = () => {
        axios.get('https://wedmegood-backend.onrender.com/api/v1/auth/getUsers')
            .then(response => {
                console.log('response.data.users', response.data.users)
                setUsers(response.data.users); // Update state with API response
            })
            .catch(error => {
                console.error('Error fetching service:', error);
            });

    }
    const getPhotographerData = () => {
        axios.get('https://wedmegood-backend.onrender.com/api/v1/realWedding/get')
            .then(response => {
                setPhotographersRl(response.data); // Update state with API response
            })
            .catch(error => {
                console.error('Error fetching service:', error);
            });
    }

    const getPhotographerDataMkp = () => {
        axios.get('https://wedmegood-backend.onrender.com/api/v1/makeup/get')
            .then(response => {
                const allPhotographers = response.data;
                if (allPhotographers.length > 0) {
                    // Find the maximum price
                    const maxPrice = Math.max(...allPhotographers.map(p => p.makeupPrice));

                    // Filter photographers who have the highest price
                    const highestPricedPhotographers = allPhotographers.filter(p => p.makeupPrice === maxPrice);

                    setPhotographers(highestPricedPhotographers); // Set all photographers with the highest price
                }
            })
            .catch(error => {
                console.error('Error fetching photographers:', error);
            });
    };

    const getPhotographerFoodData = () => {
        axios.get('https://wedmegood-backend.onrender.com/api/v1/food/get')
            .then(response => {
                const allPhotographers = response.data;
                if (allPhotographers.length > 0) {
                    // Find the photographer with the highest price
                    const highestPricedPhotographer = allPhotographers.reduce((prev, current) =>
                        prev.foodPrice > current.foodPrice ? prev : current
                    );
                    setPhotographersFd([highestPricedPhotographer]); // Set only the highest-priced photographer
                } // Update state with API response

                const allPhotographerss = response.data;
                if (allPhotographerss.length > 0) {
                    // Find the maximum price
                    const maxPrice = Math.max(...allPhotographerss.map(p => p.foodPrice));

                    // Filter photographers who have the highest price
                    const highestPricedPhotographers = allPhotographerss.filter(p => p.foodPrice === maxPrice);

                    setPhotographersFd(highestPricedPhotographers); // Set all photographers with the highest price
                }
            })
            .catch(error => {
                console.error('Error fetching photographers:', error);
            });
    }

    const getVenue = () => {
        axios.get('https://wedmegood-backend.onrender.com/api/v1/venue/get')
            .then(response => {
                setVenues(response.data); // Store all venues
                if (response.data.length > 0) {
                    // Find the venue with the highest price
                    const maxPrice = Math.max(...response.data.map(venue => venue.venuePrice));
                    setHighestVenuePrice(maxPrice);
                }
            })
            .catch(error => {
                console.error('Error fetching venues:', error);
            });
    }
    const getPhotographer = () => {
        axios.get('https://wedmegood-backend.onrender.com/api/v1/photographer/get')
            .then(response => {
                setVenues(response.data); // Store all venues
                if (response.data.length > 0) {
                    // Find the venue with the highest price
                    const maxPrice = Math.max(...response.data.map(venue => venue.photographerPrice));
                    setHighestPhotographerPrice(maxPrice);
                }

                const allPhotographers = response.data;
                if (allPhotographers.length > 0) {
                    // Find the maximum price
                    const maxPrice = Math.max(...allPhotographers.map(p => p.photographerPrice));

                    // Filter photographers who have the highest price
                    const highestPricedPhotographers = allPhotographers.filter(p => p.photographerPrice === maxPrice);

                    setPhotographersDsh(highestPricedPhotographers); // Set all photographers with the highest price
                }
            })
            .catch(error => {
                console.error('Error fetching venues:', error);
            });
    }


    useEffect(() => {
        getPhotographer();
        getPhotographerData();
        getPhotographerFoodData();
        getPhotographerDataMkp();
        getUser();
        getService();
        getVenue();
        getPhotographeMusic();
        getPlanning();
    }, [])

    return (
        <>
            <Header />
            <div class="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
                <Menu />

                <div class="h-screen flex-grow-1 overflow-y-lg-auto dash_scroll">
                    <header class="bg-surface-primary border-bottom pt-6 pb-6">
                        <div class="container-fluid">
                            <div class="mb-npx">
                                <div class="row align-items-center">
                                    <div class="col-sm-6 col-12 mb-4 mb-sm-0">
                                        <h1 class="h2 mb-0 ls-tight">Dashboard</h1>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </header>
                    <main class="py-6 bg-surface-secondary">
                        <div class="container-fluid">
                            <div class="row g-6 mb-6">
                                <div class="col-xl-3 col-sm-6 col-12">
                                    <div class="card shadow border-0">
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col">
                                                    <span class="h6 font-semibold text-muted text-sm d-block mb-2">Venue Budget</span>
                                                    <span class="h3 font-bold mb-0">₹{highestVenuePrice}</span>
                                                </div>
                                                <div class="col-auto">
                                                    <div class="icon icon-shape bg-tertiary text-white text-lg rounded-circle">
                                                        <i class="bi bi-credit-card"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="mt-2 mb-0 text-sm">
                                                <span class="badge badge-pill bg-soft-success text-success me-2">
                                                    <i class="bi bi-arrow-up me-1"></i>13%
                                                </span>
                                                <span class="text-nowrap text-xs text-muted">Since last month</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-sm-6 col-12">
                                    <div class="card shadow border-0">
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col">
                                                    <span class="h6 font-semibold text-muted text-sm d-block mb-2">Vendor Budget</span>
                                                    <span class="h3 font-bold mb-0">₹{highestPhographerPrice}</span>
                                                </div>
                                                <div class="col-auto">
                                                    <div class="icon icon-shape bg-tertiary text-white text-lg rounded-circle">
                                                        <i class="bi bi-credit-card"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="mt-2 mb-0 text-sm">
                                                <span class="badge badge-pill bg-soft-success text-success me-2">
                                                    <i class="bi bi-arrow-up me-1"></i>10%
                                                </span>
                                                <span class="text-nowrap text-xs text-muted">Since last month</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-sm-6 col-12">
                                    <div class="card shadow border-0">
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col">
                                                    <span class="h6 font-semibold text-muted text-sm d-block mb-2">Total User</span>
                                                    <span class="h3 font-bold mb-0">{users.length}</span>
                                                </div>
                                                <div class="col-auto">
                                                    <div class="icon icon-shape bg-primary text-white text-lg rounded-circle">
                                                        <i class="bi bi-people"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="mt-2 mb-0 text-sm">
                                                <span class="badge badge-pill bg-soft-success text-success me-2">
                                                    <i class="bi bi-arrow-up me-1"></i>30%
                                                </span>
                                                <span class="text-nowrap text-xs text-muted">Since last month</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-sm-6 col-12">
                                    <div class="card shadow border-0">
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col">
                                                    <span class="h6 font-semibold text-muted text-sm d-block mb-2">Total Services</span>
                                                    <span class="h3 font-bold mb-0">{Service.length}</span>
                                                </div>
                                                <div class="col-auto">
                                                    <div class="icon icon-shape bg-info text-white text-lg rounded-circle">
                                                    <i class="bi bi-gear-fill"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="mt-2 mb-0 text-sm">
                                                <span class="badge badge-pill bg-soft-danger text-danger me-2">
                                                    <i class="bi bi-arrow-down me-1"></i>-5%
                                                </span>
                                                <span class="text-nowrap text-xs text-muted">Since last month</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="card shadow border-0 mb-7">
                                <div class="card-header">
                                    <h5 class="mb-0">Recent Events</h5>
                                </div>
                                <div class="table-responsive">
                                    <table class="table table-hover table-nowrap">
                                        <thead class="thead-light">
                                            <tr>
                                                <th scope="col">Name</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Number</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Images</th>
                                                <th scope="col">Details</th>
                                                <th></th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* First Row: photographers */}
                                            {photographers.length > 0 && (
                                                <tr onClick={() => { navigate('/make-up') }}>
                                                    {photographers.map((user, index) => (
                                                        <React.Fragment key={index} >
                                                            <td>{user.makeupName} (MakeUp)</td>
                                                            <td>{new Date(user.makeupDate).toLocaleDateString()}</td>
                                                            <td>{user.makeupNumber}</td>
                                                            <td>{user.makeupPrice}</td>
                                                            <td style={{ minWidth: '195px' }}>
                                                                <div className="d-flex align-items-center">
                                                                    {Array.isArray(user.makeupMedia) ? (
                                                                        user.makeupMedia.slice(0, 3).map((img, idx) => (
                                                                            <img
                                                                                key={idx}
                                                                                src={typeof img === 'string' ?img : URL.createObjectURL(img)}
                                                                                alt="Wedding"
                                                                                className="avatar avatar-md rounded-circle border"
                                                                                style={{ width: "40px", height: "40px", objectFit: "cover", marginRight: "-10px", border: "2px solid #fff" }}
                                                                            />
                                                                        ))
                                                                    ) : (
                                                                        <img
                                                                            src={typeof user.makeupMedia === 'string' ? user.makeupMedia : URL.createObjectURL(user.makeupMedia)}
                                                                            alt="Wedding"
                                                                            className="avatar avatar-md rounded-circle border"
                                                                            style={{ width: "40px", height: "40px", objectFit: "cover", border: "2px solid #fff" }}
                                                                        />
                                                                    )}
                                                                    {Array.isArray(user.makeupMedia) && user.makeupMedia.length > 3 && (
                                                                        <span
                                                                            className="avatar avatar-md rounded-circle d-flex align-items-center justify-content-center bg-secondary text-white"
                                                                            style={{ width: "40px", height: "40px", fontSize: "14px", marginLeft: "5px" }}
                                                                        >
                                                                            +{user.makeupMedia.length - 3}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </td>
                                                            <td>{user.makeupDetails}</td>
                                                            <td></td>
                                                            <td></td>
                                                        </React.Fragment>
                                                    ))}
                                                </tr>
                                            )}

                                            {/* Second Row: photographersDsh */}
                                            {photographersDsh.length > 0 && (
                                                <tr onClick={() => { navigate('/photographer') }}>
                                                    {photographersDsh.map((user, index) => (
                                                        <React.Fragment key={index}>
                                                            <td>{user.photographerName} (Photographer)</td>
                                                            <td>{new Date(user.photographerDate).toLocaleDateString()}</td>
                                                            <td>{user.photographerNumber}</td>
                                                            <td>{user.photographerPrice}</td>
                                                            <td>
                                                                <div className="d-flex align-items-center">
                                                                    {Array.isArray(user.photographerMedia) ? (
                                                                        user.photographerMedia.slice(0, 3).map((img, idx) => (
                                                                            <img
                                                                                key={idx}
                                                                                src={typeof img === 'string' ?img : URL.createObjectURL(img)}
                                                                                alt="Wedding"
                                                                                className="avatar avatar-md rounded-circle border"
                                                                                style={{ width: "40px", height: "40px", objectFit: "cover", marginRight: "-10px", border: "2px solid #fff" }}
                                                                            />
                                                                        ))
                                                                    ) : (
                                                                        <img
                                                                            src={typeof user.photographerMedia === 'string' ? user.photographerMedia : URL.createObjectURL(user.photographerMedia)}
                                                                            alt="Wedding"
                                                                            className="avatar avatar-md rounded-circle border"
                                                                            style={{ width: "40px", height: "40px", objectFit: "cover", border: "2px solid #fff" }}
                                                                        />
                                                                    )}
                                                                    {Array.isArray(user.photographerMedia) && user.photographerMedia.length > 3 && (
                                                                        <span
                                                                            className="avatar avatar-md rounded-circle d-flex align-items-center justify-content-center bg-secondary text-white"
                                                                            style={{ width: "40px", height: "40px", fontSize: "14px", marginLeft: "5px" }}
                                                                        >
                                                                            +{user.photographerMedia.length - 3}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </td>
                                                            <td>{user.photographerDetails}</td>
                                                            <td></td>
                                                            <td></td>
                                                        </React.Fragment>
                                                    ))}
                                                </tr>
                                            )}

                                            {music.length > 0 && (
                                                <tr onClick={() => { navigate('/music-dance') }}>
                                                    {music.map((user, index) => (
                                                        <React.Fragment key={index}>
                                                            <td>{user.musicName} (Music & Dance)</td>
                                                            <td>{new Date(user.musicDate).toLocaleDateString()}</td>
                                                            <td>{user.musicNumber}</td>
                                                            <td>{user.musicPrice}</td>
                                                            <td>
                                                                <div className="d-flex align-items-center">
                                                                    {Array.isArray(user.musicMedia) ? (
                                                                        user.musicMedia.slice(0, 3).map((img, idx) => (
                                                                            <img
                                                                                key={idx}
                                                                                src={typeof img === 'string' ?img : URL.createObjectURL(img)}
                                                                                alt="Wedding"
                                                                                className="avatar avatar-md rounded-circle border"
                                                                                style={{ width: "40px", height: "40px", objectFit: "cover", marginRight: "-10px", border: "2px solid #fff" }}
                                                                            />
                                                                        ))
                                                                    ) : (
                                                                        <img
                                                                            src={typeof user.musicMedia === 'string' ? user.musicMedia : URL.createObjectURL(user.musicMedia)}
                                                                            alt="Wedding"
                                                                            className="avatar avatar-md rounded-circle border"
                                                                            style={{ width: "40px", height: "40px", objectFit: "cover", border: "2px solid #fff" }}
                                                                        />
                                                                    )}
                                                                    {Array.isArray(user.musicMedia) && user.musicMedia.length > 3 && (
                                                                        <span
                                                                            className="avatar avatar-md rounded-circle d-flex align-items-center justify-content-center bg-secondary text-white"
                                                                            style={{ width: "40px", height: "40px", fontSize: "14px", marginLeft: "5px" }}
                                                                        >
                                                                            +{user.musicMedia.length - 3}
                                                                        </span>
                                                                    )}

                                                                </div>
                                                            </td>
                                                            <td>{user.musicDetails}</td>
                                                            <td></td>
                                                            <td></td>
                                                        </React.Fragment>
                                                    ))}
                                                </tr>
                                            )}
                                            {planning.length > 0 && (
                                                <tr onClick={() => { navigate('/planning-decor') }}>
                                                    {planning.map((user, index) => (
                                                        <React.Fragment key={index}>
                                                            <td>{user.planningName} (Planning & Decor)</td>
                                                            <td>{new Date(user.planningDate).toLocaleDateString()}</td>
                                                            <td>{user.planningNumber}</td>
                                                            <td>{user.planningPrice}</td>
                                                            <td>
                                                                <div className="d-flex align-items-center">
                                                                    {Array.isArray(user.planningMedia) ? (
                                                                        user.planningMedia.slice(0, 3).map((img, idx) => (
                                                                            <img
                                                                                key={idx}
                                                                                src={typeof img === 'string' ?img : URL.createObjectURL(img)}
                                                                                alt="Wedding"
                                                                                className="avatar avatar-md rounded-circle border"
                                                                                style={{ width: "40px", height: "40px", objectFit: "cover", marginRight: "-10px", border: "2px solid #fff" }}
                                                                            />
                                                                        ))
                                                                    ) : (
                                                                        <img
                                                                            src={typeof user.planningMedia === 'string' ? user.planningMedia : URL.createObjectURL(user.planningMedia)}
                                                                            alt="Wedding"
                                                                            className="avatar avatar-md rounded-circle border"
                                                                            style={{ width: "40px", height: "40px", objectFit: "cover", border: "2px solid #fff" }}
                                                                        />
                                                                    )}
                                                                    {Array.isArray(user.planningMedia) && user.planningMedia.length > 3 && (
                                                                        <span
                                                                            className="avatar avatar-md rounded-circle d-flex align-items-center justify-content-center bg-secondary text-white"
                                                                            style={{ width: "40px", height: "40px", fontSize: "14px", marginLeft: "5px" }}
                                                                        >
                                                                            +{user.planningMedia.length - 3}
                                                                        </span>
                                                                    )}

                                                                </div>
                                                            </td>
                                                            <td>{user.planningDetails}</td>
                                                            <td></td>
                                                            <td></td>
                                                        </React.Fragment>
                                                    ))}
                                                </tr>
                                            )}
                                            {photographersFd.length > 0 && (
                                                <tr onClick={() => { navigate('/food') }}>
                                                    {photographersFd.map((user, index) => (
                                                        <React.Fragment key={index}>
                                                            <td>{user.foodName} (Food)</td>
                                                            <td>{new Date(user.foodDate ).toLocaleDateString()}</td>
                                                            <td>{user.foodNumber}</td>
                                                            <td>{user.foodPrice}</td>
                                                            <td>
                                                                <div className="d-flex align-items-center">
                                                                    {Array.isArray(user.foodMedia) ? (
                                                                        user.foodMedia.slice(0, 3).map((img, idx) => (
                                                                            <img
                                                                                key={idx}
                                                                                src={typeof img === 'string' ?img : URL.createObjectURL(img)}
                                                                                alt="Wedding"
                                                                                className="avatar avatar-md rounded-circle border"
                                                                                style={{ width: "40px", height: "40px", objectFit: "cover", marginRight: "-10px", border: "2px solid #fff" }}
                                                                            />
                                                                        ))
                                                                    ) : (
                                                                        <img
                                                                            src={typeof user.foodMedia === 'string' ? user.foodMedia : URL.createObjectURL(user.foodMedia)}
                                                                            alt="Wedding"
                                                                            className="avatar avatar-md rounded-circle border"
                                                                            style={{ width: "40px", height: "40px", objectFit: "cover", border: "2px solid #fff" }}
                                                                        />
                                                                    )}
                                                                    {Array.isArray(user.foodMedia) && user.foodMedia.length > 3 && (
                                                                        <span
                                                                            className="avatar avatar-md rounded-circle d-flex align-items-center justify-content-center bg-secondary text-white"
                                                                            style={{ width: "40px", height: "40px", fontSize: "14px", marginLeft: "5px" }}
                                                                        >
                                                                            +{user.foodMedia.length - 3}
                                                                        </span>
                                                                    )}

                                                                </div>
                                                            </td>
                                                            <td>{user.foodDetails}</td>
                                                            <td></td>
                                                            <td></td>
                                                        </React.Fragment>
                                                    ))}
                                                </tr>
                                            )}
                                        </tbody>

                                    </table>
                                </div>
                                <div class="card-footer border-0 py-5">
                                    <span class="text-muted text-sm">Showing 10 items out of 250 results found</span>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

export default Dashboard