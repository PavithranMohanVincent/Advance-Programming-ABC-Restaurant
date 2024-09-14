package abc.example.restaurant.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import abc.example.restaurant.Model.Order;

import java.util.List;

public interface OrderRepository extends MongoRepository<Order, String> {
    List<Order> findByUserId(String userId);
}
