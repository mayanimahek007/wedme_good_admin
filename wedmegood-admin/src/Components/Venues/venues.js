import React, { useEffect, useState } from 'react'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import { RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';
import axios from 'axios'
import Menu from '../Header/menu';
import Header from '../Header/header';
import { toast, ToastContainer } from 'react-toastify';


const Venues = () => {
    const [venues, setVenues] = useState([]);
    const [venueName, setVenueName] = useState("");
    const [venuePriceInfo, setVenuePriceInfo] = useState("");
    const [venuePrice, setVenuePrice] = useState("");
    const [venueNumber, setvVnueNumber] = useState("");
    const [venueNoRooms, setVenueNoRooms] = useState("");
    const [venueNoGets, setVenueNoGets] = useState("");
    const [venueEmail, setVenueEmail] = useState("");
    const [venueDate, setVenueDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [venueType, setVenueType] = useState("");
    const [functionTime, setFunctionTime] = useState(" ");

    const [venueId, setVenueId] = useState(null); // Add this state

    const handleEdit = (venue) => {
        setVenueId(venue.id); // Store ID for update API call
        setVenueName(venue.venueName);
        setVenuePriceInfo(venue.venuePriceInfo);
        setVenuePrice(venue.venuePrice);
        setvVnueNumber(venue.venueNumber);
        setVenueNoRooms(venue.venueNoRooms);
        setVenueNoGets(venue.venueNoGets);
        setVenueEmail(venue.venueEmail);
        setVenueDate(venue.venueDate);
        setVenueType(venue.venueType);
        setFunctionTime(venue.functionTime);

        setShowModal(true); // Open modal
    };

    const clearVal = () => {
        setVenueId('')
        setVenueName('')
        setVenuePriceInfo('')
        setVenuePrice('')
        setvVnueNumber('')
        setVenueNoRooms('')
        setVenueNoGets('')
        setVenueEmail('')
        setVenueDate('')
        setVenueType('')
        setFunctionTime('')
    }
    const getPhotographerData = () => {
        axios.get('https://wedmegood-backend.onrender.com/api/v1/venue/get')
            .then(response => {
                setVenues(response.data); // Update state with API response
            })
            .catch(error => {
                console.error('Error fetching venues:', error);
            });
    }
    useEffect(() => {
        getPhotographerData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("venueName", venueName);
        formData.append("venueDate", venueDate);
        formData.append("venuePriceInfo", venuePriceInfo);
        formData.append("venuePrice", venuePrice);
        formData.append("venueNumber", venueNumber);
        formData.append("venueEmail", venueEmail);
        formData.append("venueType", venueType);
        formData.append("venueNoRooms", venueNoRooms);
        formData.append("venueNoGets", venueNoGets);
        formData.append("functionTime", functionTime);

        try {

            setLoading(true);
            const res = await axios.post("https://wedmegood-backend.onrender.com/api/v1/venue/create", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            if (res.status === 201) {

                getPhotographerData();
                                toast.success('Venue Created Successfully!');
                

                setVenueName("")
                setVenuePriceInfo("")
                setVenuePrice("")
                setvVnueNumber("")
                setVenueNoRooms("")
                setVenueNoGets("")
                setVenueEmail("")
                setVenueDate("")
                setVenueType("")
                setFunctionTime("")

                setShowModal(false)
            } else {
                console.error('Error: Photographer creation failed');
            }
        } catch (error) {
            console.error("API Error:", error);
            alert(error);
        } finally {
            setLoading(false);
        }

    };
    const deletePhotographer = async (id) => {

        try {
            setLoading(true);
            const res = await axios.delete(`https://wedmegood-backend.onrender.com/api/v1/venue/delete/${id}`);

            if (res.status === 200) {
                getPhotographerData(); // Refresh list after deletion
                                toast.success('Venue Deleted Successfully!');
                
            }
        } catch (error) {
            console.error("Error deleting photographer:", error);
            alert(error);
        } finally {
            setLoading(false);
        }
    };

    const updateVenueData = async (id) => {
        const formData = new FormData();
        formData.append("venueName", venueName);
        formData.append("venueDate", venueDate);
        formData.append("venuePriceInfo", venuePriceInfo);
        formData.append("venuePrice", venuePrice);
        formData.append("venueNumber", venueNumber);
        formData.append("venueEmail", venueEmail);
        formData.append("venueType", venueType);
        formData.append("venueNoRooms", venueNoRooms);
        formData.append("venueNoGets", venueNoGets);
        formData.append("functionTime", functionTime);

        try {
            setLoading(true);
            const res = await axios.put(`https://wedmegood-backend.onrender.com/api/v1/venue/update/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (res.status === 200) {
                getPhotographerData();
                                toast.success('Venue Updated Successfully!');
                
                clearVal();

                setShowModal(false);
            } else {
                console.error('Error: Venue update failed');
            }
        } catch (error) {
            console.error("API Error:", error);
            alert(error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <Header />
            <ToastContainer />
            <div class="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
                <Menu />
                <div class="h-screen flex-grow-1 overflow-y-lg-auto dash_scroll">
                    <header class="bg-surface-primary border-bottom pt-6 pb-6">
                        <div class="container-fluid">
                            <div class="mb-npx">
                                <div class="row align-items-center">
                                    <div class="col-sm-6 col-12 mb-4 mb-sm-0">
                                        <h1 class="h2 mb-0 ls-tight">Venues</h1>
                                    </div>
                                    <div class="col-sm-6 col-12 text-sm-end">
                                        <div class="mx-n1">
                                            {/* <a href="#" class="btn d-inline-flex btn-sm btn-neutral border-base mx-1">
                                                <span class=" pe-2">
                                                    <i class="bi bi-pencil"></i>
                                                </span>
                                                <span>Edit</span>
                                            </a> */}

                                            <button
                                                className="btn d-inline-flex btn-sm button_primary mx-1"
                                                onClick={() => setShowModal(true)}
                                            >
                                                <span className="pe-2">
                                                    <i className="bi bi-plus"></i>
                                                </span>
                                                <span>Create</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </header>
                    <main class="py-6 bg-surface-secondary">
                        <div class="container-fluid">

                            <div class="card shadow border-0 mb-7">
                                <div class="card-header">
                                    <h5 class="mb-0">Venue</h5>
                                </div>
                                <div class="table-responsive">
                                    <table class="table table-hover table-nowrap">
                                        <thead class="thead-light">
                                            <tr>
                                                <th scope="col">Name</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Number</th>
                                                <th scope="col">Prices</th>
                                                <th scope="col">Price Info</th>
                                                <th scope="col">No of guests</th>
                                                <th scope="col">No of Rooms</th>
                                                <th scope="col">Function Type</th>
                                                <th scope="col">Function Time</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {venues.length > 0 ? (
                                                venues.map((photographer, index) => (
                                                    <tr key={index}>
                                                        <td>{photographer.venueName}</td>
                                                        <td>{new Date(photographer.venueDate).toLocaleDateString()}</td>
                                                        <td>{photographer.venueEmail}</td>
                                                        <td>{photographer.venueNumber}</td>
                                                        <td>${photographer.venuePrice}</td>
                                                        <td>{photographer.venuePriceInfo}</td>
                                                        <td>{photographer.venueNoGets}</td>
                                                        <td>{photographer.venueNoRooms}</td>
                                                        <td>{photographer.venueType}</td>
                                                        <td>{photographer.functionTime}</td>
                                                        <td>
                                                            {/* <button className="btn btn-sm btn-neutral">View</button> */}
                                                            <button className="btn btn-sm btn-neutral" onClick={() => handleEdit(photographer)}>  <span class=" pe-2">
                                                                <i class="bi bi-pencil"></i>
                                                            </span>
                                                                <span>Edit</span></button>
                                                            {/* <button className="btn btn-sm btn-neutral" onClick={() => handleEdit(photographer)}>View</button> */}
                                                            <button className="btn btn-sm btn-danger ms-2" onClick={() => deletePhotographer(photographer.id)}>Delete</button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="9" className="text-center">
                                                        No venues found.
                                                    </td>
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

            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                            <h4 className="modal-title">{venueId ? "Update Venues" : "Create Venues"}</h4>
                                <button type="button" className="btn-close" onClick={() => { setShowModal(false); clearVal(); }}></button>
                            </div>
                            <div className="modal-body">
                               {/* <div className='d-flex justify-content-between gap-2'>
                                    <button className='button_primary p-3 rounded-10 d-flex gap-4 justify-content-center align-items-center' style={{ width: '100%' }}><FontAwesomeIcon icon={faEnvelope} /> Send Message</button>
                                    <button className='button_primary_contect p-3 rounded-10 d-flex gap-4 justify-content-center align-items-center' style={{ width: '100%' }}><FontAwesomeIcon icon={faPhone} />View Contact</button>
                                </div> */}

                                <div className="">
                                    <div className="d-flex gap-3">
                                        <div style={{ width: '100%' }}>
                                            <input type="text" className="form-control" placeholder="Name" style={{ width: "100%" }} value={venueName}
                                                onChange={(e) => setVenueName(e.target.value)} />
                                        </div>
                                        {/* <div style={{ width: '100%' }}> */}

                                        <PhoneInput
                                            country={'in'} // Default India
                                            enableSearch={true} // Search feature in dropdown
                                            value={venueNumber}
                                            onChange={(value) => setvVnueNumber(value)}
                                            className='mt-4'
                                            inputStyle={{
                                                background: 'transparent',
                                                borderLeft: 0,
                                                borderRight: 0,
                                                width: '100%',
                                                borderTop: 0,
                                                borderRadius: 0,
                                                height: '30px'
                                            }}
                                        />
                                    </div>
                                    {/* </div> */}

                                    <div className="d-flex gap-3 mt-4">
                                        <div style={{ width: '100%' }}>
                                            <input type="email" className="form-control" placeholder="Email" style={{ width: "100%" }} value={venueEmail}
                                                onChange={(e) => setVenueEmail(e.target.value)} />

                                        </div>
                                        <div style={{ width: '100%' }}>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    label="Function Date"
                                                    value={venueDate}
                                                    onChange={(newDate) => setVenueDate(newDate)}
                                                    renderInput={(params) => <TextField {...params} fullWidth />}
                                                />
                                            </LocalizationProvider>

                                        </div>
                                    </div>

                                    <div className="d-flex gap-3 mt-4">
                                        <input type="number" className="form-control" placeholder="Prices" value={venuePrice} onChange={(e) => { setVenuePrice(e.target.value) }} style={{ width: "100%" }} />
                                        <input type="text" className="form-control" placeholder="Price Info" style={{ width: "100%" }} value={venuePriceInfo} onChange={(e) => { setVenuePriceInfo(e.target.value) }} />

                                    </div>
                                    <div className="d-flex gap-3 mt-4">
                                        <input type="number" className="form-control" placeholder="No of rooms" style={{ width: "100%" }} value={venueNoRooms} onChange={(e) => { setVenueNoRooms(e.target.value) }} />
                                        <input type="number" className="form-control" placeholder="No of guests* (min 50)" style={{ width: "100%" }} value={venueNoGets} onChange={(e) => { setVenueNoGets(e.target.value) }} />

                                    </div>


                                    <div className="d-flex gap-3 mt-4">
                                        <div className="" style={{ width: '50%' }}>
                                            <label>Function Type:</label>
                                            <RadioGroup row value={venueType} onChange={(e) => setVenueType(e.target.value)}>
                                                <FormControlLabel value="engagement" control={<Radio />} label="Engagement" />
                                                <FormControlLabel value="prewedding" control={<Radio />} label="Pre-Wedding" />
                                                <FormControlLabel value="wedding" control={<Radio />} label="Wedding" />
                                            </RadioGroup>

                                        </div>

                                        <div className="" style={{ width: '50%' }}>
                                            <label>Function Time:</label>
                                            <RadioGroup row value={functionTime} onChange={(e) => setFunctionTime(e.target.value)}>
                                                <FormControlLabel value="evening" control={<Radio />} label="Evening" />
                                                <FormControlLabel value="Day" control={<Radio />} label="Day" />
                                            </RadioGroup>

                                        </div>
                                    </div>
                                    <div class='mt-5'>
                                        <button
                                            className="btn button_primary mt-5 mb-5"
                                            style={{ width: '100%' }}
                                            onClick={venueId ? () => updateVenueData(venueId) : handleSubmit}
                                        >
                                            {venueId ? "Update" : "Check Availability & Prices"}
                                        </button>

                                        {/* <button className="btn button_primary mt-5 mb-5" style={{ width: '100%' }} onClick={handleSubmit}>Check Availability & Prices</button> */}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Venues
