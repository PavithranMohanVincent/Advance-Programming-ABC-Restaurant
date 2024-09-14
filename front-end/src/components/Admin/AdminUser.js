import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminUser = () => {
    const [users, setUsers] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [newUser, setNewUser] = useState({
        username: '',
        userEmail: '',
        userType: '',
        password: ''
    });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/user');
                if (response.ok) {
                    const data = await response.json();
                    setUsers(data);
                } else {
                    console.error('Failed to fetch users');
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        try {
            const response = await fetch(`/user/${userId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setUsers(users.filter(user => user.userId !== userId));
            } else {
                console.error('Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleAddUser = async () => {
        try {
            const response = await fetch('/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });

            if (response.ok) {
                const addedUser = await response.json();
                setUsers([...users, addedUser]);
                setShowAddForm(false);
                setNewUser({ username: '', userEmail: '', userType: '', password: '' });
            } else {
                console.error('Failed to add user');
            }
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const handleEditUser = async () => {
        try {
            const response = await fetch(`/user/${currentUserId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setUsers(users.map(user => (user.userId === currentUserId ? updatedUser : user)));
                setShowEditForm(false);
                setCurrentUserId(null);
                setNewUser({ username: '', userEmail: '', userType: '', password: '' });
            } else {
                console.error('Failed to edit user');
            }
        } catch (error) {
            console.error('Error editing user:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser({
            ...newUser,
            [name]: value,
        });
    };

    const handleEditButtonClick = (user) => {
        setCurrentUserId(user.userId);
        setNewUser({
            username: user.username,
            userEmail: user.userEmail,
            userType: user.userType,
            password: '' // Password field is kept empty for security
        });
        setShowEditForm(true);
        setShowAddForm(false);
    };

    return (
        <div className='container mt-5'>
            <h2 className='mb-4'>User Management</h2>
            <button className="btn btn-primary mb-4" onClick={() => setShowAddForm(true)}>Add Staffs & Users</button>

            {showAddForm && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-labelledby="addUserModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="addUserModalLabel">Add New Staff & User</h5>
                                <button type="button" className="btn-close" onClick={() => setShowAddForm(false)} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="username">Username</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="username"
                                            name="username"
                                            placeholder="Username"
                                            value={newUser.username}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="userEmail">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="userEmail"
                                            name="userEmail"
                                            placeholder="Email"
                                            value={newUser.userEmail}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="userType">User Type</label>
                                        <select
                                            className="form-control"
                                            id="userType"
                                            name="userType"
                                            value={newUser.userType}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Select User Type</option>
                                            <option value="admin">Admin</option>
                                            <option value="staff">Staff</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            name="password"
                                            placeholder="Password"
                                            value={newUser.password}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowAddForm(false)}>Cancel</button>
                                <button type="button" className="btn btn-primary" onClick={handleAddUser}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showEditForm && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-labelledby="editUserModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="editUserModalLabel">Edit User</h5>
                                <button type="button" className="btn-close" onClick={() => setShowEditForm(false)} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="username">Username</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="username"
                                            name="username"
                                            placeholder="Username"
                                            value={newUser.username}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="userEmail">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="userEmail"
                                            name="userEmail"
                                            placeholder="Email"
                                            value={newUser.userEmail}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="userType">User Type</label>
                                        <select
                                            className="form-control"
                                            id="userType"
                                            name="userType"
                                            value={newUser.userType}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Select User Type</option>
                                            <option value="admin">Admin</option>
                                            <option value="staff">Staff</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            name="password"
                                            placeholder="Password"
                                            value={newUser.password}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowEditForm(false)}>Cancel</button>
                                <button type="button" className="btn btn-primary" onClick={handleEditUser}>Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <table className="table table-bordered mt-4">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>User Type</th>
                        <th>Password</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.userId}>
                            <td>{user.userId}</td>
                            <td>{user.username}</td>
                            <td>{user.userEmail}</td>
                            <td>{user.userType}</td>
                            <td>{user.password}</td>
                            <td>
                                <button className="btn btn-warning btn-sm mr-2" onClick={() => handleEditButtonClick(user)}>Edit</button>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.userId)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default AdminUser;
