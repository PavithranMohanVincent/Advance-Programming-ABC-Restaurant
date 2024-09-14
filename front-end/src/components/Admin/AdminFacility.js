import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminFacility = () => {
    const [facilities, setFacilities] = useState([]);
    const [newFacility, setNewFacility] = useState({ heading: '', description: '', image: '' });
    const [editFacility, setEditFacility] = useState(null);
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);

    useEffect(() => {
        fetchFacilities();
    }, []);

    const fetchFacilities = () => {
        axios.get('/facility')
            .then(response => {
                setFacilities(response.data);
            })
            .catch(error => console.error('Error fetching facilities:', error));
    };

    const handleAddNewFacility = () => {
        setShowAddPopup(true);
    };

    const handleCreateFacility = () => {
        axios.post('/facility', newFacility)
            .then(response => {
                setFacilities([response.data, ...facilities]);
                setNewFacility({ heading: '', description: '', image: '' });
                setShowAddPopup(false);
                alert('Facility added successfully!');
            })
            .catch(error => console.error('Error adding facility:', error));
    };

    const handleEdit = (facility) => {
        setEditFacility({ ...facility });
        setShowEditPopup(true);
    };

    const handleUpdateFacility = () => {
        axios.put(`/facility/${editFacility.id}`, editFacility)
            .then(response => {
                setFacilities(facilities.map(facility =>
                    facility.id === editFacility.id ? response.data : facility
                ));
                setEditFacility(null);
                setShowEditPopup(false);
                alert('Facility updated successfully!');
            })
            .catch(error => console.error('Error updating facility:', error));
    };

    const handleDelete = (id) => {
        axios.delete(`/facility/${id}`)
            .then(() => {
                setFacilities(facilities.filter(facility => facility.id !== id));
                alert('Facility deleted successfully!');
            })
            .catch(error => console.error('Error deleting facility:', error));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewFacility({ ...newFacility, [name]: value });
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditFacility({ ...editFacility, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewFacility({ ...newFacility, image: reader.result.split(',')[1] });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEditImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditFacility({ ...editFacility, image: reader.result.split(',')[1] });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Facilities</h1>
            <button className="btn btn-primary mb-4" onClick={handleAddNewFacility}>Add New Facility</button>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Heading</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {facilities.map((facility) => (
                        <tr key={facility.id}>
                            <td>{facility.heading}</td>
                            <td>{facility.description}</td>
                            <td>
                                {facility.image && (
                                    <img
                                        src={`data:image/jpeg;base64,${facility.image}`}
                                        alt={facility.heading}
                                        className="img-thumbnail"
                                        style={{ maxWidth: '100px' }}
                                    />
                                )}
                            </td>
                            <td>
                                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(facility)}>Edit</button>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(facility.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Add Facility Modal */}
            {showAddPopup && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add New Facility</h5>
                                <button type="button" className="btn-close" onClick={() => setShowAddPopup(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="heading"
                                            placeholder="Heading"
                                            value={newFacility.heading}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="description"
                                            placeholder="Description"
                                            value={newFacility.description}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="file"
                                            className="form-control"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={handleCreateFacility}>Add Facility</button>
                                <button type="button" className="btn btn-secondary" onClick={() => setShowAddPopup(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Facility Modal */}
            {showEditPopup && editFacility && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Facility</h5>
                                <button type="button" className="btn-close" onClick={() => setShowEditPopup(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="heading"
                                            placeholder="Heading"
                                            value={editFacility.heading}
                                            onChange={handleEditInputChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="description"
                                            placeholder="Description"
                                            value={editFacility.description}
                                            onChange={handleEditInputChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="file"
                                            className="form-control"
                                            accept="image/*"
                                            onChange={handleEditImageChange}
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={handleUpdateFacility}>Update Facility</button>
                                <button type="button" className="btn btn-secondary" onClick={() => setShowEditPopup(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminFacility;
