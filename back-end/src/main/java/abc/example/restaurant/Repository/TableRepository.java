package abc.example.restaurant.Repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import abc.example.restaurant.Model.Table;



@Repository
public interface TableRepository extends MongoRepository<Table, String> {

}




