package abc.example.restaurant.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import abc.example.restaurant.Model.Branch;

public interface BranchRepository extends MongoRepository<Branch, String> {
}
