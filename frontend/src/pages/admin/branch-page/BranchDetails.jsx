import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function BranchDetails() {
    const { id } = useParams();

    const [branch, setBranch] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBranch = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5003/cbs/branch/${id}`,
                    { withCredentials: true }
                );

                console.log("DETAIL API:", res.data);

                setBranch(res.data.data);
            } catch (err) {
                console.log(err);
                setError("Failed to load branch");
            } finally {
                setLoading(false);
            }
        };

        fetchBranch();
    }, [id]);

    if (loading) {
        return <h3 className="text-white">Loading branch details...</h3>;
    }

    if (error) {
        return <h3 className="text-danger">{error}</h3>;
    }

    if (!branch) {
        return <h3 className="text-warning">Branch not found</h3>;
    }

    return (
        <>
            <div className="container py-4 text-white">
                <h2>{branch.branchname}</h2>

                <div className="card bg-white p-4 mt-3">
                    <p><b>Branch Code:</b> {branch.branchcode}</p>
                    <p><b>Address:</b> {branch.address}</p>
                    <p><b>Total Customers:</b> {branch.totalcustomers || 0}</p>
                    <p><b>Total Accounts:</b> {branch.totalaccounts || 0}</p>
                </div>
            </div>
            <div className="card bg-dark text-white p-4 mt-4">
                <h4 className="mb-3">Branch Manager</h4>

                {branch.manager ? (
                    <>
                        <p><b>Name:</b> {branch.manager.name}</p>
                        <p><b>User ID:</b> {branch.manager.userid}</p>
                        <p><b>Email:</b> {branch.manager.email}</p>
                        <p><b>Contact:</b> {branch.manager.contact}</p>
                    </>
                ) : (
                    <p className="text-warning">No manager assigned to this branch.</p>
                )}
            </div>
        </>

    );
}