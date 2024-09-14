package abc.example.restaurant.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import abc.example.restaurant.Model.Gallery;

import java.util.Optional;

@Repository
public interface GalleryRepository extends MongoRepository<Gallery, String> {
    Optional<Gallery> findByName(String name);
}
