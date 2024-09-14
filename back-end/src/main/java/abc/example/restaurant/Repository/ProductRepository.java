package abc.example.restaurant.Repository;

import org.bson.types.ObjectId;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import abc.example.restaurant.Model.Product;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends MongoRepository <Product, ObjectId> {
    List<Product> findByCategoryName(String categoryName);
}
