package abc.example.restaurant.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import abc.example.restaurant.Model.Category;
import abc.example.restaurant.Service.CategoryService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @GetMapping("/{id}")
    public Category getCategoryById(@PathVariable String id) {
        return categoryService.getCategoryById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
    }

    @PostMapping
    public Category addCategory(@RequestBody Category category) {
        if (category.getItems() == null) {
            category.setItems(new ArrayList<>());
        }
        return categoryService.addCategory(category);
    }

    @PutMapping("/{id}")
    public Category updateCategory(@PathVariable String id, @RequestBody Category category) {
        return categoryService.updateCategory(id, category);
    }

    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable String id) {
        categoryService.deleteCategory(id);
    }

    @PostMapping("/{id}/item")
    public Category addItemToCategory(@PathVariable String id, @RequestBody Category.Item item) {
        return categoryService.addItemToCategory(id, item);
    }

    @PutMapping("/{id}/item/{itemId}")
    public Category updateItemInCategory(@PathVariable String id, @PathVariable String itemId, @RequestBody Category.Item updatedItem) {
        return categoryService.updateItemInCategory(id, itemId, updatedItem);
    }

    @DeleteMapping("/{id}/item/{itemId}")
    public void deleteItemFromCategory(@PathVariable String id, @PathVariable String itemId) {
        categoryService.deleteItemFromCategory(id, itemId);
    }

    @GetMapping("/{id}/items/search")
    public List<Category.Item> searchItemsByName(@PathVariable String id, @RequestParam String itemName) {
        return categoryService.searchItemsByName(id, itemName);
    }
}
