package abc.example.restaurant.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import abc.example.restaurant.Model.Category;
import abc.example.restaurant.Repository.CategoryRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Optional<Category> getCategoryById(String id) {
        return categoryRepository.findById(id);
    }

    public Category addCategory(Category category) {
        return categoryRepository.save(category);
    }

    public Category updateCategory(String id, Category category) {
        if (categoryRepository.existsById(id)) {
            category.setId(id);
            return categoryRepository.save(category);
        }
        return null;
    }

    public void deleteCategory(String id) {
        categoryRepository.deleteById(id);
    }

    public Category addItemToCategory(String id, Category.Item item) {
        Optional<Category> categoryOptional = categoryRepository.findById(id);
        if (categoryOptional.isPresent()) {
            Category category = categoryOptional.get();
            if (category.getItems() == null) {
                category.setItems(new ArrayList<>());
            }
            category.getItems().add(item);
            return categoryRepository.save(category);
        }
        return null;
    }

    public Category updateItemInCategory(String id, String itemId, Category.Item updatedItem) {
        Optional<Category> categoryOptional = categoryRepository.findById(id);
        if (categoryOptional.isPresent()) {
            Category category = categoryOptional.get();
            category.getItems().removeIf(item -> item.getId().equals(itemId));
            category.getItems().add(updatedItem);
            return categoryRepository.save(category);
        }
        throw new RuntimeException("Category not found");
    }

    public void deleteItemFromCategory(String id, String itemId) {
        Category category = categoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Category not found"));
        category.setItems(category.getItems().stream()
                .filter(item -> !item.getId().equals(itemId))
                .collect(Collectors.toList()));
        categoryRepository.save(category);
    }

    public List<Category.Item> searchItemsByName(String categoryId, String itemName) {
        Optional<Category> categoryOptional = categoryRepository.findById(categoryId);
        if (categoryOptional.isPresent()) {
            Category category = categoryOptional.get();
            return category.getItems().stream()
                    .filter(item -> item.getName().toLowerCase().contains(itemName.toLowerCase()))
                    .collect(Collectors.toList());
        }
        throw new RuntimeException("Category not found");
    }
}
