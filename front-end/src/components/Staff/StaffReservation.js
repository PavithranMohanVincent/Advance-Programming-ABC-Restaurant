import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StaffReservation = () => {
    const [tables, setTables] = useState([]);
    const [editingTable, setEditingTable] = useState(null);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [newReservationData, setNewReservationData] = useState({
        name: '',
        contactNo: '',
        username: '',
        date: '',
        time: '',
        guests: '',
        outlet: '',
        tableNo: '',
        status: 'Pending'
    });
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchTables();
    }, []);

    const fetchTables = () => {
        axios.get('/table')
            .then(response => {
                const sortedTables = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setTables(sortedTables);
            })
            .catch(error => console.error('Error fetching tables:', error));
    };

    const handleEdit = (table) => {
        setEditingTable({ ...table });
        setShowEditPopup(true);
    };

    const handleUpdate = () => {
        axios.put(`/table/${editingTable.id}`, editingTable)
            .then(() => {
                setTables(prevTables =>
                    prevTables.map(table =>
                        table.id === editingTable.id ? editingTable : table
                    )
                );
                setEditingTable(null);
                setShowEditPopup(false);
            })
            .catch(error => console.error('Error updating table:', error));
    };

    const handleDelete = (tableId) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this table?');
        if (isConfirmed) {
            axios.delete(`/table/${tableId}`)
                .then(() => {
                    setTables(prevTables =>
                        prevTables.filter(table => table.id !== tableId)
                    );
                })
                .catch(error => {
                    console.error('Error deleting table:', error.response ? error.response.data : error.message);
                });
        }
    };

    const handleAddNewReservation = () => {
        setShowAddPopup(true);
    };

    const handleCreateReservation = () => {
        axios.post('/table', newReservationData)
            .then(response => {
                setTables([response.data, ...tables]);
                setShowAddPopup(false);
                setNewReservationData({
                    name: '',
                    contactNo: '',
                    username: '',
                    date: '',
                    time: '',
                    guests: '',
                    outlet: '',
                    tableNo: '',
                    status: 'Pending'
                });
            })
            .catch(error => console.error('Error creating new reservation:', error));
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    };

    const formatTime = (dateString) => {
        const options = { hour: '2-digit', minute: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleTimeString(undefined, options);
    };

    const filteredTables = tables.filter(table =>
        table.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        table.contactNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        table.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        table.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
        table.status.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container mt-4">
            <h1>Manage Reservations</h1>
            <p className="lead">This page allows you to manage restaurant reservations. You can view, edit, and delete existing reservations, as well as add new ones. Use the search bar to filter reservations by various criteria.</p>

            <input
                type="text"
                placeholder="Search by name, contact no, email, date, or status"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-control mb-3"
            />

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Contact No</th>
                        <th>Email</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Guests</th>
                        <th>Outlet</th>
                        <th>T.No</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTables.map((table) => (
                        <tr key={table.id}>
                            <td>{table.name}</td>
                            <td>{table.contactNo}</td>
                            <td>{table.username}</td>
                            <td>{formatDate(table.date)}</td>
                            <td>{formatTime(table.date)}</td>
                            <td>{table.guests}</td>
                            <td>{table.outlet}</td>
                            <td>{table.tableNo}</td>
                            <td>{table.status}</td>
                            <td>
                                <button 
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => handleEdit(table)}>Edit
                                </button>
                                <button 
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(table.id)}>Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showEditPopup && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Reservation</h5>
                                <button type="button" className="btn-close" onClick={() => setShowEditPopup(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            placeholder="Customer Name"
                                            value={editingTable.name}
                                            onChange={(e) => setEditingTable({ ...editingTable, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="contactNo"
                                            placeholder="Contact Number"
                                            value={editingTable.contactNo}
                                            onChange={(e) => setEditingTable({ ...editingTable, contactNo: e.target.value })}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="username"
                                            placeholder="Email"
                                            value={editingTable.username}
                                            onChange={(e) => setEditingTable({ ...editingTable, username: e.target.value })}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="date"
                                            placeholder="Date"
                                            value={editingTable.date}
                                            onChange={(e) => setEditingTable({ ...editingTable, date: e.target.value })}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="time"
                                            className="form-control"
                                            name="time"
                                            placeholder="Time"
                                            value={editingTable.time}
                                            onChange={(e) => setEditingTable({ ...editingTable, time: e.target.value })}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="guests"
                                            placeholder="Number of Guests"
                                            value={editingTable.guests}
                                            onChange={(e) => setEditingTable({ ...editingTable, guests: e.target.value })}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="outlet"
                                            placeholder="Outlet"
                                            value={editingTable.outlet}
                                            onChange={(e) => setEditingTable({ ...editingTable, outlet: e.target.value })}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="tableNo"
                                            placeholder="Table No"
                                            value={editingTable.tableNo}
                                            onChange={(e) => setEditingTable({ ...editingTable, tableNo: e.target.value })}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <select
                                            className="form-control"
                                            name="status"
                                            value={editingTable.status}
                                            onChange={(e) => setEditingTable({ ...editingTable, status: e.target.value })}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Confirmed">Confirmed</option>
                                            <option value="Rejected">Rejected</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={handleUpdate}>Save</button>
                                <button type="button" className="btn btn-danger" onClick={() => setShowEditPopup(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showAddPopup && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add New Reservation</h5>
                                <button type="button" className="btn-close" onClick={() => setShowAddPopup(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            placeholder="Customer Name"
                                            value={newReservationData.name}
                                            onChange={(e) => setNewReservationData({ ...newReservationData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="contactNo"
                                            placeholder="Contact Number"
                                            value={newReservationData.contactNo}
                                            onChange={(e) => setNewReservationData({ ...newReservationData, contactNo: e.target.value })}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="username"
                                            placeholder="Email"
                                            value={newReservationData.username}
                                            onChange={(e) => setNewReservationData({ ...newReservationData, username: e.target.value })}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="date"
                                            placeholder="Date"
                                            value={newReservationData.date}
                                            onChange={(e) => setNewReservationData({ ...newReservationData, date: e.target.value })}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="time"
                                            className="form-control"
                                            name="time"
                                            placeholder="Time"
                                            value={newReservationData.time}
                                            onChange={(e) => setNewReservationData({ ...newReservationData, time: e.target.value })}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="guests"
                                            placeholder="Number of Guests"
                                            value={newReservationData.guests}
                                            onChange={(e) => setNewReservationData({ ...newReservationData, guests: e.target.value })}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="outlet"
                                            placeholder="Outlet"
                                            value={newReservationData.outlet}
                                            onChange={(e) => setNewReservationData({ ...newReservationData, outlet: e.target.value })}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="tableNo"
                                            placeholder="Table No"
                                            value={newReservationData.tableNo}
                                            onChange={(e) => setNewReservationData({ ...newReservationData, tableNo: e.target.value })}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <select
                                            className="form-control"
                                            name="status"
                                            value={newReservationData.status}
                                            onChange={(e) => setNewReservationData({ ...newReservationData, status: e.target.value })}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Confirmed">Confirmed</option>
                                            <option value="Rejected">Rejected</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={handleCreateReservation}>Add Reservation</button>
                                <button type="button" className="btn btn-danger" onClick={() => setShowAddPopup(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <button className="btn btn-primary mb-3" onClick={handleAddNewReservation}>
                Add New Reservation
            </button>
        </div>
    );
};

export default StaffReservation;
