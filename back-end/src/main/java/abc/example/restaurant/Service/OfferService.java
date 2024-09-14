package abc.example.restaurant.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import abc.example.restaurant.Exception.ResourceNotFoundException;
import abc.example.restaurant.Model.Offer;
import abc.example.restaurant.Repository.OfferRepository;

import java.util.List;
import java.util.Optional;

@Service
public class OfferService {

    @Autowired
    private OfferRepository offerRepository;

    // Get all offers
    public List<Offer> allOffer() {
        return offerRepository.findAll();
    }

    // Get a single offer by offerId
    public Optional<Offer> singleOffer(String offerId) {
        return offerRepository.findByOfferId(offerId);
    }

    // Add a new offer
    public Offer addOffer(Offer offer) {
        offer.setOfferId(generateOfferId());
        return offerRepository.save(offer);
    }

    // Generate a new offer ID
    private String generateOfferId() {
        long count = offerRepository.count();
        return String.format("F-%03d", count + 1);
    }

    // Update an existing offer by offerId
    public Offer updateOffer(String offerId, Offer offer) {
        Optional<Offer> existingOffer = offerRepository.findByOfferId(offerId);
        if (!existingOffer.isPresent()) {
            throw new ResourceNotFoundException("Offer not found with id " + offerId);
        }
        // Ensure the offerId in the request body matches the offerId in the URL
        offer.setOfferId(offerId);
        return offerRepository.save(offer);
    }

    // Delete an offer by offerId
    public void deleteOffer(String offerId) {
        Optional<Offer> existingOffer = offerRepository.findByOfferId(offerId);
        if (!existingOffer.isPresent()) {
            throw new ResourceNotFoundException("Offer not found with id " + offerId);
        }
        offerRepository.delete(existingOffer.get());
    }
}
