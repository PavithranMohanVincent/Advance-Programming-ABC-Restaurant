import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminOffers = () => {
  const [offers, setOffers] = useState([]);
  const [newOffer, setNewOffer] = useState({
    offerCode: '',
    description: '',
    discountPercentage: '',
    Value: '',
    Image: ''
  });
  const [editingOffer, setEditingOffer] = useState(null);

  useEffect(() => {
    axios.get('/offer')
      .then(response => setOffers(response.data))
      .catch(error => console.error('Error fetching offers:', error));
  }, []);

  const handleChange = (e) => {
    setNewOffer({ ...newOffer, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setNewOffer({ ...newOffer, Image: e.target.files[0] });
  };

  const handleAddOffer = () => {
    const formData = new FormData();
    Object.keys(newOffer).forEach(key => {
      formData.append(key, newOffer[key]);
    });

    axios.post('/offer', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      setOffers([...offers, response.data]);
      setNewOffer({ offerCode: '', description: '', discountPercentage: '', Value: '', Image: '' });
    }).catch(error => console.error('Error adding offer:', error));
  };

  const handleEditOffer = (offer) => {
    setEditingOffer(offer);
    setNewOffer(offer);
  };

  const handleUpdateOffer = () => {
    axios.put(`/offer/${editingOffer.offerId}`, newOffer)
      .then(response => {
        setOffers(offers.map(offer => (offer.offerId === response.data.offerId ? response.data : offer)));
        setEditingOffer(null);
        setNewOffer({ offerCode: '', description: '', discountPercentage: '', Value: '', Image: '' });
      }).catch(error => console.error('Error updating offer:', error));
  };

  const handleDeleteOffer = (offerId) => {
    axios.delete(`/offer/${offerId}`)
      .then(() => setOffers(offers.filter(offer => offer.offerId !== offerId)))
      .catch(error => console.error('Error deleting offer:', error));
  };

  return (
    <div className="admin-offers">
      <h2>Manage Offers</h2>
      <div className="offer-form">
        <input type="text" name="offerCode" value={newOffer.offerCode} onChange={handleChange} placeholder="Offer Code" />
        <textarea name="description" value={newOffer.description} onChange={handleChange} placeholder="Description" />
        <input type="number" name="discountPercentage" value={newOffer.discountPercentage} onChange={handleChange} placeholder="Discount Percentage" />
        <input type="number" name="Value" value={newOffer.Value} onChange={handleChange} placeholder="Value" />
        <input type="file" name="Image" onChange={handleImageChange} />
        {editingOffer ? (
          <button onClick={handleUpdateOffer}>Update Offer</button>
        ) : (
          <button onClick={handleAddOffer}>Add Offer</button>
        )}
      </div>
      <ul className="offer-list">
        {offers.map(offer => (
          <li key={offer.offerId}>
            <img src={offer.Image} alt={offer.offerCode} />
            <p>Code: {offer.offerCode}</p>
            <p>Description: {offer.description}</p>
            <p>Discount: {offer.discountPercentage}%</p>
            <p>Value: ${offer.Value}</p>
            <button onClick={() => handleEditOffer(offer)}>Edit</button>
            <button onClick={() => handleDeleteOffer(offer.offerId)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminOffers;
