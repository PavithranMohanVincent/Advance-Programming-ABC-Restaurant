package abc.example.restaurant.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "offer")
public class Offer {
    @Id
    private String offerId;
    private String offerCode;
    private String description;
    private double discountPercentage;
    private float Value;
    private String Image;
}
