package abc.example.restaurant.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import abc.example.restaurant.Model.Feedback;
import abc.example.restaurant.Service.FeedbackService;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @GetMapping
    public ResponseEntity<List<Feedback>> getAllFeedbacks() {
        return new ResponseEntity<>(feedbackService.allFeedbacks(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Feedback>> getSingleFeedback(@PathVariable("id") String feedbackId) {
        return new ResponseEntity<>(feedbackService.singleFeedback(feedbackId), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Feedback> addFeedback(@RequestBody Feedback feedback) {
        Feedback newFeedback = feedbackService.addFeedback(feedback);
        return new ResponseEntity<>(newFeedback, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Feedback> updateFeedback(@PathVariable("id") String feedbackId, @RequestBody Feedback feedback) {
        Feedback updatedFeedback = feedbackService.updateFeedback(feedbackId, feedback);
        if (updatedFeedback != null) {
            return ResponseEntity.ok(updatedFeedback);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Feedback> patchFeedback(@PathVariable("id") String feedbackId, @RequestBody Map<String, Object> updates) {
        Optional<Feedback> feedbackOpt = feedbackService.singleFeedback(feedbackId);
        if (feedbackOpt.isPresent()) {
            Feedback feedback = feedbackOpt.get();
            if (updates.containsKey("staffResponse")) {
                feedback.setStaffResponse((String) updates.get("staffResponse"));
            }
            Feedback updatedFeedback = feedbackService.updateFeedback(feedbackId, feedback);
            return ResponseEntity.ok(updatedFeedback);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFeedback(@PathVariable("id") String feedbackId) {
        Optional<Feedback> feedback = feedbackService.singleFeedback(feedbackId);
        if (feedback.isPresent()) {
            feedbackService.deleteFeedback(feedbackId);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
