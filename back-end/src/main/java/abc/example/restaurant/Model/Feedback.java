package abc.example.restaurant.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "feedback")
public class Feedback {
    @Id
    private String feedbackId;
    private String name;
    private String customerName;
    private String email;
    private long phoneNumber;
    private String subject;
    private String message;
    private int rating;
    private String staffResponse;
}
