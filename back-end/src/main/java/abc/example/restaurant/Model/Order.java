package abc.example.restaurant.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "order")
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    private String orderId;
    private String userId;
    private List<String> productIds;
    private String orderDate;
    private double totalPrice;
    private String status;
    private String deliveryAddress;
    private String paymentMethod;
}
