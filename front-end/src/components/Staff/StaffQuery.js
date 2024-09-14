import axios from 'axios';
import React, { useEffect, useState } from 'react';

const StaffQuery = () => {
    const [queries, setQueries] = useState([]);
    const [selectedQuery, setSelectedQuery] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Fetch all queries on component mount
        const fetchQueries = async () => {
            try {
                const response = await axios.get('/api/query');
                setQueries(response.data);
            } catch (error) {
                setError('Failed to fetch queries.');
            }
        };
        fetchQueries();
    }, []);

    const handleEditClick = (query) => {
        setSelectedQuery(query);
        setIsModalOpen(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!selectedQuery) return;

        // Update the status and response before sending
        const updatedQuery = {
            ...selectedQuery,
            status: 'done', // Mark as done to trigger email sending
        };

        try {
            const response = await axios.put(`/api/query/${selectedQuery.id}`, updatedQuery);
            setQueries(queries.map(query => query.id === selectedQuery.id ? response.data : query));
            setSuccess('Query updated successfully.');
            setIsModalOpen(false);
            setSelectedQuery(null);
        } catch (error) {
            setError('Failed to update the query.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedQuery({ ...selectedQuery, [name]: value });
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedQuery(null);
    };

    return (
        <div className="container mt-4">
            <h2>User Query Management</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Subject</th>
                        <th>Message</th>
                        <th>Respond</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {queries.map((query) => (
                        <tr key={query.id}>
                            <td>{query.name}</td>
                            <td>{query.email}</td>
                            <td>{query.subject}</td>
                            <td>{query.message}</td>
                            <td>{query.respond}</td>
                            <td>{query.status}</td>
                            <td>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleEditClick(query)}
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal for editing a query */}
            {isModalOpen && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Query</h5>
                                <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                            </div>
                            <form onSubmit={handleUpdate}>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={selectedQuery.name}
                                            onChange={handleInputChange}
                                            readOnly
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={selectedQuery.email}
                                            onChange={handleInputChange}
                                            readOnly
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="subject"
                                            value={selectedQuery.subject}
                                            onChange={handleInputChange}
                                            readOnly
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <textarea
                                            className="form-control"
                                            name="message"
                                            value={selectedQuery.message}
                                            onChange={handleInputChange}
                                            readOnly
                                        ></textarea>
                                    </div>

                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="respond"
                                            value={selectedQuery.respond}
                                            onChange={handleInputChange}
                                            placeholder="Response"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <select
                                            className="form-select"
                                            name="status"
                                            value={selectedQuery.status}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Confirmed">Confirmed</option>
                                            <option value="Rejected">Rejected</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary">Update Query</button>
                                    <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default StaffQuery;
