package abc.example.abcResturant;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import abc.example.restaurant.Model.Feedback;
import abc.example.restaurant.Repository.FeedbackRepository;
import abc.example.restaurant.Service.FeedbackService;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class FeedbackServiceTest {

    @Mock
    private FeedbackRepository feedbackRepository;

    @InjectMocks
    private FeedbackService feedbackService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testAllFeedbacks() {
        // Arrange
        Feedback feedback1 = new Feedback("F-001", "John", "Customer1", "customer1@test.com", 1234567890L, "Subject1", "Message1", 5, null);
        Feedback feedback2 = new Feedback("F-002", "Jane", "Customer2", "customer2@test.com", 9876543210L, "Subject2", "Message2", 4, null);
        List<Feedback> feedbackList = Arrays.asList(feedback1, feedback2);

        when(feedbackRepository.findAll()).thenReturn(feedbackList);

        // Act
        List<Feedback> result = feedbackService.allFeedbacks();

        // Assert
        assertEquals(2, result.size());
        verify(feedbackRepository, times(1)).findAll();
    }

    @Test
    void testSingleFeedback() {
        // Arrange
        Feedback feedback = new Feedback("F-001", "John", "Customer1", "customer1@test.com", 1234567890L, "Subject1", "Message1", 5, null);
        when(feedbackRepository.findById("F-001")).thenReturn(Optional.of(feedback));

        // Act
        Optional<Feedback> result = feedbackService.singleFeedback("F-001");

        // Assert
        assertTrue(result.isPresent());
        assertEquals("F-001", result.get().getFeedbackId());
        verify(feedbackRepository, times(1)).findById("F-001");
    }

    @Test
    void testAddFeedback() {
        // Arrange
        Feedback feedback = new Feedback(null, "John", "Customer1", "customer1@test.com", 1234567890L, "Subject1", "Message1", 5, null);
        Feedback savedFeedback = new Feedback("F-001", "John", "Customer1", "customer1@test.com", 1234567890L, "Subject1", "Message1", 5, null);

        when(feedbackRepository.save(any(Feedback.class))).thenReturn(savedFeedback);

        // Act
        Feedback result = feedbackService.addFeedback(feedback);

        // Assert
        assertEquals("F-001", result.getFeedbackId());
        verify(feedbackRepository, times(1)).save(any(Feedback.class));
    }

    @Test
    void testUpdateFeedback() {
        // Arrange
        Feedback existingFeedback = new Feedback("F-001", "John", "Customer1", "customer1@test.com", 1234567890L, "Subject1", "Message1", 5, null);
        Feedback feedbackToUpdate = new Feedback("F-001", "John", "Customer1", "customer1@test.com", 1234567890L, "Subject1", "Message1", 5, "Thank you for your feedback");

        when(feedbackRepository.findById("F-001")).thenReturn(Optional.of(existingFeedback));
        when(feedbackRepository.save(any(Feedback.class))).thenReturn(feedbackToUpdate);

        // Act
        Feedback result = feedbackService.updateFeedback("F-001", feedbackToUpdate);

        // Assert
        assertNotNull(result);
        assertEquals("Thank you for your feedback", result.getStaffResponse());
        verify(feedbackRepository, times(1)).findById("F-001");
        verify(feedbackRepository, times(1)).save(any(Feedback.class));
    }

    @Test
    void testUpdateFeedback_NotFound() {
        // Arrange
        Feedback feedbackToUpdate = new Feedback("F-001", "John", "Customer1", "customer1@test.com", 1234567890L, "Subject1", "Message1", 5, "Thank you for your feedback");

        when(feedbackRepository.findById("F-001")).thenReturn(Optional.empty());

        // Act
        Feedback result = feedbackService.updateFeedback("F-001", feedbackToUpdate);

        // Assert
        assertNull(result);
        verify(feedbackRepository, times(1)).findById("F-001");
        verify(feedbackRepository, never()).save(any(Feedback.class));
    }

    @Test
    void testDeleteFeedback() {
        // Arrange
        doNothing().when(feedbackRepository).deleteById("F-001");

        // Act
        feedbackService.deleteFeedback("F-001");

        // Assert
        verify(feedbackRepository, times(1)).deleteById("F-001");
    }
}
