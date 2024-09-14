package abc.example.restaurant.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import abc.example.restaurant.Model.Table;
import abc.example.restaurant.Service.EmailService;
import abc.example.restaurant.Service.TableService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/table")
public class TableController {

    @Autowired
    private TableService tableService;

    @Autowired
    private EmailService emailService;

    @GetMapping
    public List<Table> getAllTables() {
        return tableService.getAllTables();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Table> getTableById(@PathVariable String id) {
        Optional<Table> table = tableService.getTableById(id);
        return table.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Table createTable(@RequestBody Table table) {
        return tableService.createTable(table);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Table> updateTable(@PathVariable String id, @RequestBody Table updatedTable) {
        // First, update the table in the database
        Table table = tableService.updateTable(id, updatedTable);
        if (table != null) {
            // After successfully updating, check the status
            String status = table.getStatus();
            if ("Confirmed".equalsIgnoreCase(status)) {
                // Construct the email body for confirmed status
                String emailBody = String.format(
                        "Thank you for making a reservation with ABC Restaurant, %s.\n\n" +
                                "Your reservation is confirmed.\n\n" +
                                "Reservation Date: %s\n\n" +
                                "Time: %s\n\n" +
                                "Table Number: %s.\n\n" +
                                "Any clarification please call ABC Restaurant Front Desk.\n\n" +
                                "ABC RESTAURANT - %s\n" +
                                "Telephone No: (123) 456-7890",
                        table.getName(),    // Retrieves the name of the person
                        table.getDate(),    // Retrieves the reservation date
                        table.getTime(),    // Retrieves the reservation time
                        table.getTableNo(), // Retrieves the table number
                        table.getOutlet()   // Retrieves the outlet
                );

                // Send the email for confirmed reservation
                emailService.sendEmail(
                        table.getUsername(),
                        "Table Reservation Confirmed",
                        emailBody
                );

            } else if ("Reject".equalsIgnoreCase(status)) {
                // Construct the email body for rejected status
                String emailBody = String.format(
                        "Dear %s,\n\n" +
                                "We regret to inform you that your reservation at ABC Restaurant on %s " +
                                "has been rejected as we are fully booked for that day.\n\n" +
                                "We apologize for the inconvenience and hope to serve you on another occasion.\n\n" +
                                "ABC RESTAURANT - %s\n" +
                                "Telephone No: (123) 456-7890",
                        table.getName(),    // Retrieves the name of the person
                        table.getDate(),    // Retrieves the reservation date
                        table.getOutlet()   // Retrieves the outlet
                );

                // Send the email for rejected reservation
                emailService.sendEmail(
                        table.getUsername(),
                        "Table Reservation Rejected",
                        emailBody
                );
            }

            return ResponseEntity.ok(table);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTable(@PathVariable String id) {
        boolean isDeleted = tableService.deleteTable(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
