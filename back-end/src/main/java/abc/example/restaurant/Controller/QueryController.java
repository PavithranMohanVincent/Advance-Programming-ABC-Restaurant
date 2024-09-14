package abc.example.restaurant.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import abc.example.restaurant.Model.Query;
import abc.example.restaurant.Service.EmailService;
import abc.example.restaurant.Service.QueryService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/query")
public class QueryController {

    @Autowired
    private QueryService queryService;

    @Autowired
    private EmailService emailService; // Inject the EmailService


    @PostMapping
    public ResponseEntity<Query> createQuery(@RequestBody Query query) {
        Query savedQuery = queryService.saveQuery(query);
        return new ResponseEntity<>(savedQuery, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Query>> getAllQueries() {
        List<Query> queries = queryService.getAllQueries();
        return new ResponseEntity<>(queries, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Query> getQueryById(@PathVariable String id) {
        Optional<Query> query = queryService.getQueryById(id);
        return query.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Query> updateQuery(@PathVariable String id, @RequestBody Query updatedQuery) {
        // Update the query in the database
        Query query = queryService.updateQuery(id, updatedQuery);

        if (query != null) {
            // Check the status of the updated query
            String status = query.getStatus();
            if ("done".equalsIgnoreCase(status)) {
                // Construct the email body for confirmed status
                String emailBody = String.format(
                        "Thank you for reaching out to ABC Restaurant, %s.\n\n" +
                                "This is regarding your query about: %s\n\n" +
                                "Response: %s\n\n" +
                                "If you have any further questions, please contact ABC Restaurant Front Desk.\n\n" +
                                "ABC RESTAURANT \n" +
                                "Telephone No: (123) 456-7890",
                        query.getName(),
                        query.getSubject(),
                        query.getRespond()
                );

                // Send the email for confirmed status
                emailService.sendEmail(
                        query.getEmail(), // Assuming the email should be sent to the query's email
                        "Query Status Respond",
                        emailBody
                );
            }

            return ResponseEntity.ok(query);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuery(@PathVariable String id) {
        queryService.deleteQuery(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
