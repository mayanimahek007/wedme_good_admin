import React, { useEffect, useState } from 'react'
import Menu from '../Header/menu'
import Header from '../Header/header'
import './user.css'
import axios from 'axios'

const User = () => {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);

    const getUser = () => {
        axios.get('https://wedmegood-backend.onrender.com/api/v1/auth/getUsers')
            .then(response => {
                setUser(response.data.users); 
                console.log('response.data.users', response.data.users)
            })
            .catch(error => {
                console.error('Error fetching user:', error);
            });
    }
    useEffect(() => {
        getUser();
    }, []);

    const deleteUser = async (id) => {

        try {
            setLoading(true);
            const res = await axios.delete(`https://wedmegood-backend.onrender.com/api/v1/auth/delete/${id}`);

            if (res.status === 200) {
                getUser(); // Refresh list after deletion
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            alert(error);
        } finally {
            setLoading(false);
        }
    };
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
                                        <h1 class="h2 mb-0 ls-tight">Users</h1>
                                    </div>
                                    {/* <div class="col-sm-6 col-12 text-sm-end">
                                        <div class="mx-n1">
                                            <a href="#" class="btn d-inline-flex btn-sm btn-neutral border-base mx-1">
                                                <span class=" pe-2">
                                                    <i class="bi bi-pencil"></i>
                                                </span>
                                                <span>Edit</span>
                                            </a>
                                            <a href="#" class="btn d-inline-flex btn-sm btn-primary mx-1">
                                                <span class=" pe-2">
                                                    <i class="bi bi-plus"></i>
                                                </span>
                                                <span>Create</span>
                                            </a>
                                        </div>
                                    </div> */}
                                </div>

                            </div>
                        </div>
                    </header>
                    <main class="py-6 bg-surface-secondary">
                        <div class="container-fluid">

                            <div class="card shadow border-0 mb-7">
                                <div class="card-header">
                                    <h5 class="mb-0">All Users</h5>
                                </div>
                                <div class="table-responsive">
                                    <table class="table table-hover table-nowrap">
                                        <thead class="thead-light">
                                            <tr>
                                                <th scope="col">Name</th>
                                                {/* <th scope="col">Last Name</th> */}
                                                <th scope="col">Email</th>
                                                <th scope="col">Phone</th>
                                                <th></th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {user.length > 0 ? (
                                                user.map((user, index) => (
                                                    <tr key={index}>
                                                        <td>{user.name}</td>
                                                        {/* <td>{user.lastName}</td> */}
                                                        <td>{user.email}</td>
                                                        <td>{user.phone}</td>
                                                        <td></td>
                                                        <td>
                                                            {/* <button className="btn btn-sm btn-neutral">View</button> */}
                                                            {/* <button className="btn btn-sm btn-neutral" onClick={() => handleEdit(user)}>  <span class=" pe-2">
                                                                <i class="bi bi-pencil"></i>
                                                            </span>
                                                                <span>Edit</span></button> */}
                                                            {/* <button className="btn btn-sm btn-neutral" onClick={() => handleEdit(user)}>View</button> */}
                                                            <button className="btn btn-sm btn-danger" onClick={() => deleteUser(user.id)}>Delete</button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="9" className="text-center">
                                                        No service found.
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
        </>
    )
}

export default User