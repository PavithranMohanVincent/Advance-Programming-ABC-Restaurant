package abc.example.restaurant.Repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import abc.example.restaurant.Model.Reservation;

import java.util.List;

public interface ReservationRepository extends MongoRepository<Reservation, ObjectId> {
    List<Reservation> findByBranch(String branch);
}
