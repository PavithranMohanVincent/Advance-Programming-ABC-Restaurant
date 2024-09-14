import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Query = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => {
        const validationErrors = {};
        if (!name) validationErrors.name = 'Name is required';
        if (!email) validationErrors.email = 'Email is required';
        if (!subject) validationErrors.subject = 'Subject is required';
        if (!message) validationErrors.message = 'Message is required';

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            validationErrors.email = 'Please enter a valid email address';
        }

        return validationErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await axios.post('/api/query', {
                name,
                email,
                subject,
                message,
                status: 'Pending',
                respond: '',
            });

            console.log('Server response:', response.data);

            // Display the success message as a popup
            window.alert('Your query has been submitted successfully!');

            // Refresh the page
            window.location.reload();
        } catch (error) {
            console.error('Error submitting query:', error);
            setErrors({ submit: 'Failed to submit your query. Please try again later.' });
        }
    };

    return (
        <div className='container mt-5'>
            <h1 className='mb-4'>Query</h1>
            <p>Thank you for choosing ABC Restaurant! We value your feedback and inquiries. If you have any questions, concerns, or suggestions, please don't hesitate to reach out to us. Simply fill out the form below, and our team will get back to you as soon as possible. Your satisfaction is our top priority, and we look forward to serving you!</p>
            <div className="query-container">
                <form onSubmit={handleSubmit} className="query-form">
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <div className="form-group">
                                <input
                                    type="text"
                                    id="name"
                                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter Your Name"
                                />
                                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <input
                                    type="email"
                                    id="email"
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter Your Email"
                                />
                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>
                        </div>
                    </div>
                    <div className="form-group mb-3">
                        <input
                            type="text"
                            id="subject"
                            className={`form-control ${errors.subject ? 'is-invalid' : ''}`}
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Enter The Subject"
                        />
                        {errors.subject && <div className="invalid-feedback">{errors.subject}</div>}
                    </div>
                    <div className="form-group mb-3">
                        <textarea
                            id="message"
                            className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Enter Your Message"
                        ></textarea>
                        {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                    </div>

                    {errors.submit && <div className="alert alert-danger">{errors.submit}</div>}
                    <button type="submit" className="btn btn-primary">Submit Query</button>
                </form>
            </div>
            <footer className="mt-5 text-center">
                <p>&copy; ABC Restaurant 2024.</p>
            </footer>
        </div>
    );
};

export default Query;
