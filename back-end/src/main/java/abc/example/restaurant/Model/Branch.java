package abc.example.restaurant.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "Branch")
public class Branch {
    @Id
    private String branchId;
    private String branchName;
    private String address;
    private String phoneNumber;
    private String email;
}
