package abc.example.restaurant.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import abc.example.restaurant.Model.Offer;

import java.util.Optional;

public interface OfferRepository extends MongoRepository<Offer, String> {
    Optional<Offer> findByOfferId(String offerId);
}
