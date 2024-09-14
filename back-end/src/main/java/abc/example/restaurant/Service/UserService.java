package abc.example.restaurant.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import abc.example.restaurant.Exception.ResourceNotFoundException;
import abc.example.restaurant.Model.User;
import abc.example.restaurant.Repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> allUser() {
        try {
            return userRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Error while fetching users: " + e.getMessage(), e);
        }
    }

    public Optional<User> singleUser(String userId) {  // Change ObjectId to String
        try {
            return userRepository.findById(userId);
        } catch (Exception e) {
            throw new RuntimeException("Error while fetching user with ID " + userId + ": " + e.getMessage(), e);
        }
    }

    public User addUser(User user) {
        try {
            if (user.getUserId() == null || user.getUserId().isEmpty()) {
                user.setUserId(generateUserId());  // Ensure userId is set
            }
            return userRepository.save(user);
        } catch (Exception e) {
            throw new RuntimeException("Error while adding user: " + e.getMessage(), e);
        }
    }

    private String generateUserId() {
        try {
            long count = userRepository.count();
            return String.format("U-%03d", count + 1);
        } catch (Exception e) {
            throw new RuntimeException("Error while generating user ID: " + e.getMessage(), e);
        }
    }

    public User updateUser(String userId, User user) {  // Change ObjectId to String
        try {
            if (!userRepository.existsById(userId)) {
                throw new ResourceNotFoundException("User not found with userId " + userId);
            }
            user.setUserId(userId);  // Set the userId before saving
            return userRepository.save(user);
        } catch (ResourceNotFoundException e) {
            throw e;  // Keep custom exceptions
        } catch (Exception e) {
            throw new RuntimeException("Error while updating user with ID " + userId + ": " + e.getMessage(), e);
        }
    }

    public void deleteUser(String userId) {  // Change ObjectId to String
        try {
            if (!userRepository.existsById(userId)) {
                throw new ResourceNotFoundException("User not found with userId " + userId);
            }
            userRepository.deleteById(userId);
        } catch (ResourceNotFoundException e) {
            throw e;  // Keep custom exceptions
        } catch (Exception e) {
            throw new RuntimeException("Error while deleting user with ID " + userId + ": " + e.getMessage(), e);
        }
    }
}
