import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css';

// Ensure you call this to set the app element for accessibility
Modal.setAppElement('#root');

const AdminQuery = () => {
    const [queries, setQueries] = useState([]);
    const [selectedQuery, setSelectedQuery] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);

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
        setModalIsOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/query/${id}`);
            setQueries(queries.filter(query => query.id !== id));
            setSuccess('Query deleted successfully.');
        } catch (error) {
            setError('Failed to delete the query.');
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!selectedQuery) return;

        try {
            const response = await axios.put(`/api/query/${selectedQuery.id}`, selectedQuery);
            setQueries(queries.map(query => query.id === selectedQuery.id ? response.data : query));
            setSuccess('Query updated successfully.');
            setModalIsOpen(false);
            setSelectedQuery(null);
        } catch (error) {
            setError('Failed to update the query.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedQuery({ ...selectedQuery, [name]: value });
    };

    return (
        <div className="container mt-5">
            <h2>User Queries</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Subject</th>
                        <th>Message</th>
                        <th>Status</th>
                        <th>Respond</th>
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
                            <td>{query.status}</td>
                            <td>{query.respond}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => handleEditClick(query)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(query.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Edit Query"
                className="modal fade show d-block"
                overlayClassName="modal-backdrop fade show"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Query</h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => setModalIsOpen(false)}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleUpdate}>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={selectedQuery?.name || ''}
                                        onChange={handleInputChange}
                                        placeholder="Name"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={selectedQuery?.email || ''}
                                        onChange={handleInputChange}
                                        placeholder="Email"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="subject"
                                        value={selectedQuery?.subject || ''}
                                        onChange={handleInputChange}
                                        placeholder="Subject"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <textarea
                                        className="form-control"
                                        name="message"
                                        value={selectedQuery?.message || ''}
                                        onChange={handleInputChange}
                                        placeholder="Message"
                                        required
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="respond"
                                        value={selectedQuery?.respond || ''}
                                        onChange={handleInputChange}
                                        placeholder="Response"
                                    />
                                </div>
                                <div className="mb-3">
                                    <select
                                        className="form-select"
                                        name="status"
                                        value={selectedQuery?.status || ''}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Confirmed">Confirmed</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary">Update Query</button>
                                <button
                                    type="button"
                                    className="btn btn-secondary ms-2"
                                    onClick={() => setModalIsOpen(false)}
                                >
                                    Cancel
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </Modal>

        </div>
    );
};

export default AdminQuery;
