import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ManagerDashboard() {
    const { branchcode } = useParams();
    const [branch, setBranch] = useState(null);

    useEffect(() => {
        const fetchBranch = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5003/cbs/branchcode/${branchcode}`,
                    { withCredentials: true }
                );

                setBranch(res.data.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchBranch();
    }, [branchcode]);

    if (!branch) return <h3 className="text-white">Loading...</h3>;

    return (
        <div className="d-flex">
            {/* Sidebar */}
            <div
                className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark position-fixed rounded-4 border-end border-secondary"
                style={{ width: 280, height: "100vh" }}
            >
                <h4>{branch.branchname}</h4>
                <p className="text-secondary">{branch.branchcode}</p>

                <hr />

                <ul className="nav nav-pills flex-column gap-2">
                    <li>
                        <a href="#" className="nav-link active">Dashboard</a>
                    </li>
                    <Link
                        to={`/manager/${branchcode}/customers`}
                        className="nav-link text-white"
                    >
                        Customers
                    </Link>
                    <Link to="/manager/accounts" className="nav-link text-white">
                        Accounts
                    </Link>
                    <li>
                        <a href="#" className="nav-link text-white">Transactions</a>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="container-fluid text-dark p-4" style={{ marginLeft: 300 }}>
                <h2>{branch.branchname} Dashboard</h2>

                <div className="row g-4 mt-3">
                    <div className="col-md-4">
                        <div className="card  p-4 text-center">
                            <h6>Total Customers</h6>
                            <h2>{branch.totalcustomers || 0}</h2>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card  p-4 text-center">
                            <h6>Total Accounts</h6>
                            <h2>{branch.totalaccounts || 0}</h2>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card  p-4 text-center">
                            <h6>Status</h6>
                            <h2>{branch.status}</h2>
                        </div>
                    </div>
                </div>

                {branch.manager && (
                    <div className="card bg-dark p-4 mt-4">
                        <h4>Branch Manager</h4>
                        <p><b>Name:</b> {branch.manager.name}</p>
                        <p><b>Email:</b> {branch.manager.email}</p>
                        <p><b>Contact:</b> {branch.manager.contact}</p>
                    </div>
                )}
            </div>
        </div>
    );
}