package abc.example.abcResturant;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import abc.example.restaurant.Exception.ResourceNotFoundException;
import abc.example.restaurant.Model.User;
import abc.example.restaurant.Repository.UserRepository;
import abc.example.restaurant.Service.UserService;

import java.util.Optional;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testAllUser() {
        // Given
        List<User> mockUsers = List.of(new User("U-001", "testUser", "password", "test@example.com", "admin"));
        when(userRepository.findAll()).thenReturn(mockUsers);

        // When
        List<User> users = userService.allUser();

        // Then
        assertEquals(1, users.size());
        verify(userRepository, times(1)).findAll();
    }

    @Test
    void testSingleUser_UserExists() {
        // Given
        String userId = "U-001";
        User mockUser = new User(userId, "testUser", "password", "test@example.com", "admin");
        when(userRepository.findById(userId)).thenReturn(Optional.of(mockUser));

        // When
        Optional<User> user = userService.singleUser(userId);

        // Then
        assertTrue(user.isPresent());
        assertEquals("testUser", user.get().getUsername());
        verify(userRepository, times(1)).findById(userId);
    }

    @Test
    void testSingleUser_UserDoesNotExist() {
        // Given
        String userId = "U-002";
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        // When
        Optional<User> user = userService.singleUser(userId);

        // Then
        assertTrue(user.isEmpty());
        verify(userRepository, times(1)).findById(userId);
    }

    @Test
    void testAddUser() {
        // Given
        User user = new User(null, "newUser", "password", "new@example.com", "user");
        when(userRepository.save(user)).thenReturn(user);

        // When
        User savedUser = userService.addUser(user);

        // Then
        assertEquals("newUser", savedUser.getUsername());
        verify(userRepository, times(1)).save(user);
    }

    @Test
    void testUpdateUser_UserExists() {
        // Given
        String userId = "U-001";
        User user = new User(userId, "updatedUser", "password", "updated@example.com", "admin");
        when(userRepository.existsById(userId)).thenReturn(true);
        when(userRepository.save(user)).thenReturn(user);

        // When
        User updatedUser = userService.updateUser(userId, user);

        // Then
        assertEquals("updatedUser", updatedUser.getUsername());
        verify(userRepository, times(1)).save(user);
    }

    @Test
    void testUpdateUser_UserDoesNotExist() {
        // Given
        String userId = "U-002";
        User user = new User(userId, "updatedUser", "password", "updated@example.com", "admin");
        when(userRepository.existsById(userId)).thenReturn(false);

        // Then
        assertThrows(ResourceNotFoundException.class, () -> userService.updateUser(userId, user));
        verify(userRepository, never()).save(user);
    }

    @Test
    void testDeleteUser_UserExists() {
        // Given
        String userId = "U-001";
        when(userRepository.existsById(userId)).thenReturn(true);

        // When
        userService.deleteUser(userId);

        // Then
        verify(userRepository, times(1)).deleteById(userId);
    }

    @Test
    void testDeleteUser_UserDoesNotExist() {
        // Given
        String userId = "U-002";
        when(userRepository.existsById(userId)).thenReturn(false);

        // Then
        assertThrows(ResourceNotFoundException.class, () -> userService.deleteUser(userId));
        verify(userRepository, never()).deleteById(userId);
    }
}
