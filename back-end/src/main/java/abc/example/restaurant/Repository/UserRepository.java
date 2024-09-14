package abc.example.restaurant.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import abc.example.restaurant.Model.User;

public interface UserRepository extends MongoRepository<User, String> {
    // No changes needed here since MongoRepository now works with userId as a String
}
