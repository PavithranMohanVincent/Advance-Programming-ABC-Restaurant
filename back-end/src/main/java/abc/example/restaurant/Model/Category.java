package abc.example.restaurant.Model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Setter
@Getter
@Document(collection = "category")
public class Category {
    @Id
    private String id;
    private String name;
    private List<Item> items;

    public Category() {
        // Default constructor
    }

    public Category(String id, String name, List<Item> items) {
        this.id = id;
        this.name = name;
        this.items = items;
    }

    @Setter
    @Getter
    public static class Item {
        private String id;
        private String name;
        private String number;
        private double price;
        private String description;
        private String image;

        public Item() {
            // Default constructor
        }

        public Item(String id, String name, String number, double price, String description, String image) {
            this.id = id;
            this.name = name;
            this.number = number;
            this.price = price;
            this.description = description;
            this.image = image;
        }

    }
}
