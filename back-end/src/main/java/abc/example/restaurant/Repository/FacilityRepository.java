package abc.example.restaurant.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import abc.example.restaurant.Model.Facility;

public interface FacilityRepository extends MongoRepository<Facility, String> {
}