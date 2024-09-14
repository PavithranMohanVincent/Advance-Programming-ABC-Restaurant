import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const StaffFeedback = () => {
    const [feedbackList, setFeedbackList] = useState([]);
    const [response, setResponse] = useState('');
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        try {
            const response = await axios.get('/feedback');
            setFeedbackList(response.data);
        } catch (error) {
            console.error('Error fetching feedback:', error);
        }
    };

    const handleResponseChange = (e) => {
        setResponse(e.target.value);
    };

    const submitResponse = async () => {
        try {
            if (isEditing) {
                // Update existing feedback
                await axios.put(`/feedback/${selectedFeedback}`, { staffResponse: response });
            } else {
                // Create new feedback response
                await axios.patch(`/feedback/${selectedFeedback}`, { staffResponse: response });
            }
            Swal.fire({
                title: 'Success!',
                text: 'Response submitted successfully!',
                icon: 'success',
                timer: 2500,
                showConfirmButton: false
            });
            setResponse('');
            setSelectedFeedback(null);
            setIsEditing(false);
            setIsModalOpen(false);
            fetchFeedbacks();
        } catch (error) {
            console.error('Error submitting response:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Error submitting response',
                icon: 'error',
                timer: 2500,
                showConfirmButton: false
            });
        }
    };

    const openModal = (feedback) => {
        setSelectedFeedback(feedback.feedbackId);
        setResponse(feedback.staffResponse || '');
        setIsEditing(!!feedback.staffResponse);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setResponse('');
        setIsEditing(false);
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Feedback Management</h1>
            
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Subject</th>
                        <th>Message</th>
                        <th>Rating</th>
                        <th>Response</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {feedbackList.map(feedback => (
                        <tr key={feedback.feedbackId}>
                            <td>{feedback.name}</td>
                            <td>{feedback.email}</td>
                            <td>{feedback.phoneNumber}</td>
                            <td>{feedback.subject}</td>
                            <td>{feedback.message}</td>
                            <td>{feedback.rating}</td>
                            <td>{feedback.staffResponse}</td>
                            <td>
                                <button 
                                    className="btn btn-sm" 
                                    style={{ backgroundColor: 'tomato', color: 'white' }}
                                    onClick={() => openModal(feedback)}
                                >
                                    {feedback.staffResponse ? 'Edit Response' : 'Respond'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Bootstrap Modal for editing/responding to feedback */}
            <div 
                className={`modal fade ${isModalOpen ? 'show' : ''}`} 
                tabIndex="-1" 
                role="dialog"
                style={{ display: isModalOpen ? 'block' : 'none' }}
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{isEditing ? 'Edit Response' : 'Respond to Feedback'}</h5>
                            <button type="button" className="close" onClick={closeModal}>
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <textarea
                                className="form-control"
                                rows="4"
                                value={response}
                                onChange={handleResponseChange}
                                placeholder="Enter your response..."
                            ></textarea>
                        </div>
                        <div className="modal-footer">
                            <button 
                                className="btn btn-success" 
                                onClick={submitResponse}
                            >
                                {isEditing ? 'Update Response' : 'Submit Response'}
                            </button>
                            <button 
                                className="btn btn-secondary" 
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="footer mt-5">
                <p>&copy; 2024 Our Restaurant. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default StaffFeedback;
