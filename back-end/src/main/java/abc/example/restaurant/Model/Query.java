package abc.example.restaurant.Model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Setter
@Getter
@Document(collection = "query") // Specifies the MongoDB collection
public class Query {

    // Getters and Setters
    @Id
    private String id;
    private String name;
    private String email;
    private String subject;
    private String message;
    private String status;
    private String respond;

    // Constructors
    public Query() {}

    public Query(String name, String email, String subject, String message, String status, String respond) {
        this.name = name;
        this.email = email;
        this.subject = subject;
        this.message = message;
        this.status = status;
        this.respond = respond;
    }

}
