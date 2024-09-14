import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../components/StoreContext/StoreContext';

const PlaceOrder = () => {
    const { cartItems, getTotalCartAmount, clearCart } = useContext(StoreContext);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        phone: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Get the current date without the time component
        const today = new Date();
        const orderDate = today.toISOString().split('T')[0]; // This will give you the date in the format 'YYYY-MM-DD'
    
        const order = {
            userId: formData.email, // Using email as a userId or generate another ID
            productIds: Object.keys(cartItems).filter(id => cartItems[id] > 0),
            orderDate: orderDate, // Use the formatted date here
            totalPrice: getTotalCartAmount() + 2, // Including the delivery fee
            status: 'Confirmed',
            deliveryAddress: `${formData.street}, ${formData.city}, ${formData.state}, ${formData.zipCode}, ${formData.country}`,
            paymentMethod: 'Online Payment' // Or other payment method
        };
    
        try {
            // Send the order to the backend
            await axios.post('/api/orders', order);
            clearCart(); // Clear the cart after successful order placement
            alert('Your order has been confirmed!');
            navigate('/menu'); // Redirect to the menu page
        } catch (error) {
            console.error('Error placing order:', error);
            setError('There was an error processing your order. Please try again.');
        }
    };
    

    return (
        <>
            <form className='place-order' onSubmit={handleSubmit}>
                <div className='place-order-left'>
                    <p className='title'>Delivery Information</p>
                    <div className='multi-fields'>
                        <input type='text' name='firstName' placeholder='First Name' onChange={handleChange} />
                        <input type='text' name='lastName' placeholder='Last Name' onChange={handleChange} />
                    </div>
                    <input type='text' name='email' placeholder='Email Address' onChange={handleChange} />
                    <input type='text' name='street' placeholder='Street' onChange={handleChange} />
                    <div className='multi-fields'>
                        <input type='text' name='city' placeholder='City' onChange={handleChange} />
                        <input type='text' name='state' placeholder='State' onChange={handleChange} />
                    </div>
                    <div className='multi-fields'>
                        <input type='text' name='zipCode' placeholder='Zip Code' onChange={handleChange} />
                        <input type='text' name='country' placeholder='Country' onChange={handleChange} />
                    </div>
                    <input type='text' name='phone' placeholder='Phone' onChange={handleChange} />
                </div>
                <div className='place-order-right'>
                    <div className='cart-total'>
                        <h2>Cart Total</h2>
                        <div className='cart-total-details'>
                            <p>Subtotal</p>
                            <p>Rs.{getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className='cart-total-details'>
                            <p>Delivery Fee</p>
                            <p>Rs.{200}</p>
                        </div>
                        <hr />
                        <div className='cart-total-details'>
                            <p>Total</p>
                            <p>Rs.{getTotalCartAmount() + 200}</p>
                        </div>
                        <button type='submit'>PROCEED TO PAYMENT</button>
                        {error && <p className="error-message">{error}</p>}
                    </div>
                </div>
            </form>
            <footer className="about-footer">
                <p>&copy; 2024 Our Restaurant. All Rights Reserved.</p>
            </footer>
        </>
    );
}

export default PlaceOrder;
