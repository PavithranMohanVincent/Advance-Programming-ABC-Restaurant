import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import AOS from 'aos';
import ReactStars from 'react-stars';

const AdminFeedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        AOS.init({ duration: 2000 });
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        try {
            const response = await axios.get('/feedback');
            setFeedbacks(response.data);
        } catch (error) {
            console.error('Error fetching feedbacks:', error);
        }
    };

    const deleteFeedback = async (feedbackId) => {
        try {
            await axios.delete(`/feedback/${feedbackId}`);
            Swal.fire({
                title: 'Deleted!',
                text: 'Feedback has been deleted.',
                icon: 'success',
                timer: 2500,
                showConfirmButton: false
            });
            fetchFeedbacks();
        } catch (error) {
            console.error('Error deleting feedback:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Error deleting feedback',
                icon: 'error',
                timer: 2500,
                showConfirmButton: false
            });
        }
    };

    return (
        <div className="container mt-5" data-aos="fade-up">
            <h1 className="mb-4">User Feedbacks</h1>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Subject</th>
                            <th>Message</th>
                            <th>Rating</th>
                            <th>Staff Response</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedbacks.map((feedback) => (
                            <tr key={feedback.feedbackId}>
                                <td>{feedback.name}</td>
                                <td>{feedback.email}</td>
                                <td>{feedback.phoneNumber}</td>
                                <td>{feedback.subject}</td>
                                <td>{feedback.message}</td>
                                <td>
                                    <ReactStars
                                        count={5}
                                        value={feedback.rating}
                                        size={24}
                                        color2={'#ffd700'}
                                        edit={false}
                                    />
                                </td>
                                <td>{feedback.staffResponse}</td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteFeedback(feedback.feedbackId)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminFeedback;
