package abc.example.restaurant.Model;



import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Setter
@Getter
@Document(collection = "table")

public class Table {
    @Id
    private String id;
    private String name;
    private String contactNo;
    private String username;
    private String date;
    private String time;
    private Integer guests;
    private String outlet;
    private Integer tableNo;
    private String status;

    public Table(String id, String name, String contactNo, String username, String date, String time, Integer guests, String outlet, Integer tableNo, String status) {
        this.id = id;
        this.name = name;
        this.contactNo = contactNo;
        this.username = username;
        this.date = date;
        this.time = time;
        this.guests = guests;
        this.outlet = outlet;
        this.tableNo = tableNo;
        this.status = status;
    }

}



