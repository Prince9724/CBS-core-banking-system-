import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers, addCustomer } from "../../App/features/customerSlice";

export default function Customers() {
    const dispatch = useDispatch();

    const { customers, loading } = useSelector((state) => state.customer);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        aadhar: "",
        pan: "",
    });

    useEffect(() => {
        dispatch(fetchCustomers());
    }, [dispatch]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await dispatch(addCustomer(formData)).unwrap();

        setFormData({
            name: "",
            email: "",
            phone: "",
            address: "",
            aadhar: "",
            pan: "",
        });
    };

    return (
        <div className="container py-4 text-white">
            <h2>Customers</h2>

            <form onSubmit={handleSubmit} className="card bg-dark p-4 mb-4">
                <div className="row g-3">
                    <div className="col-md-6">
                        <input name="name" value={formData.name} onChange={handleChange} className="form-control" placeholder="Full Name" required />
                    </div>

                    <div className="col-md-6">
                        <input name="email" value={formData.email} onChange={handleChange} className="form-control" placeholder="Email" required />
                    </div>

                    <div className="col-md-6">
                        <input name="phone" value={formData.phone} onChange={handleChange} className="form-control" placeholder="Phone" required />
                    </div>

                    <div className="col-md-6">
                        <input name="address" value={formData.address} onChange={handleChange} className="form-control" placeholder="Address" required />
                    </div>

                    <div className="col-md-6">
                        <input name="aadhar" value={formData.aadhar} onChange={handleChange} className="form-control" placeholder="Aadhar Number" required />
                    </div>

                    <div className="col-md-6">
                        <input name="pan" value={formData.pan} onChange={handleChange} className="form-control" placeholder="PAN Number" required />
                    </div>
                </div>

                <button className="btn btn-primary mt-4" type="submit">
                    Add Customer
                </button>
            </form>

            <div className="card bg-dark p-4">
                <h4>Customer List</h4>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <table className="table table-dark table-hover mt-3">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Branch</th>
                            </tr>
                        </thead>

                        <tbody>
                            {(customers || []).map((customer) => (
                                <tr key={customer._id}>
                                    <td>{customer.name}</td>
                                    <td>{customer.phone}</td>
                                    <td>{customer.branchname}</td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}