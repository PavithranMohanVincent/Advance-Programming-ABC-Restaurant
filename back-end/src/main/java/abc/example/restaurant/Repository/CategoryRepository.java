package abc.example.restaurant.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import abc.example.restaurant.Model.Category;

@Repository
public interface CategoryRepository extends MongoRepository<Category, String> {
    // Custom query methods (if needed) can be added here
}
