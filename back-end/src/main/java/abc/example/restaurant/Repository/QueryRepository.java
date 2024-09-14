package abc.example.restaurant.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import abc.example.restaurant.Model.Query;

@Repository
public interface QueryRepository extends MongoRepository<Query, String> {
    // Custom query methods can be added here if needed
}
