package abc.example.abcResturant;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import abc.example.restaurant.Exception.ResourceNotFoundException;
import abc.example.restaurant.Model.Category;
import abc.example.restaurant.Repository.CategoryRepository;
import abc.example.restaurant.Service.CategoryService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class CategoryServiceTest {

    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private CategoryService categoryService;

    private Category category;
    private Category.Item item;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        item = new Category.Item("item1", "Item Name", "123", 10.0, "Item Description", "image.png");
        List<Category.Item> items = new ArrayList<>();
        items.add(item);

        category = new Category("category1", "Category Name", items);
    }

    @Test
    void testGetAllCategories() {
        List<Category> categories = List.of(category);
        when(categoryRepository.findAll()).thenReturn(categories);

        List<Category> result = categoryService.getAllCategories();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Category Name", result.get(0).getName());
        verify(categoryRepository, times(1)).findAll();
    }

    @Test
    void testGetCategoryById() {
        when(categoryRepository.findById("category1")).thenReturn(Optional.of(category));

        Optional<Category> result = categoryService.getCategoryById("category1");

        assertTrue(result.isPresent());
        assertEquals("Category Name", result.get().getName());
        verify(categoryRepository, times(1)).findById("category1");
    }

    @Test
    void testAddCategory() {
        when(categoryRepository.save(category)).thenReturn(category);

        Category result = categoryService.addCategory(category);

        assertNotNull(result);
        assertEquals("Category Name", result.getName());
        verify(categoryRepository, times(1)).save(category);
    }

    @Test
    void testUpdateCategory() {
        when(categoryRepository.existsById("category1")).thenReturn(true);
        when(categoryRepository.save(category)).thenReturn(category);

        Category result = categoryService.updateCategory("category1", category);

        assertNotNull(result);
        assertEquals("Category Name", result.getName());
        verify(categoryRepository, times(1)).save(category);
    }

    @Test
    void testDeleteCategory() {
        doNothing().when(categoryRepository).deleteById("category1");

        categoryService.deleteCategory("category1");

        verify(categoryRepository, times(1)).deleteById("category1");
    }

    @Test
    void testAddItemToCategory() {
        when(categoryRepository.findById("category1")).thenReturn(Optional.of(category));
        when(categoryRepository.save(category)).thenReturn(category);

        Category.Item newItem = new Category.Item("item2", "New Item", "456", 20.0, "New Item Description", "newimage.png");
        Category result = categoryService.addItemToCategory("category1", newItem);

        assertNotNull(result);
        assertEquals(2, result.getItems().size());
        assertEquals("New Item", result.getItems().get(1).getName());
        verify(categoryRepository, times(1)).save(result);
    }

    @Test
    void testUpdateItemInCategory() {
        when(categoryRepository.findById("category1")).thenReturn(Optional.of(category));
        when(categoryRepository.save(category)).thenReturn(category);

        Category.Item updatedItem = new Category.Item("item1", "Updated Item", "123", 15.0, "Updated Description", "updatedimage.png");
        Category result = categoryService.updateItemInCategory("category1", "item1", updatedItem);

        assertNotNull(result);
        assertEquals("Updated Item", result.getItems().get(0).getName());
        verify(categoryRepository, times(1)).save(result);
    }

    @Test
    void testDeleteItemFromCategory() {
        when(categoryRepository.findById("category1")).thenReturn(Optional.of(category));
        when(categoryRepository.save(category)).thenReturn(category);

        categoryService.deleteItemFromCategory("category1", "item1");

        assertTrue(category.getItems().isEmpty());
        verify(categoryRepository, times(1)).save(category);
    }

    @Test
    void testSearchItemsByName() {
        when(categoryRepository.findById("category1")).thenReturn(Optional.of(category));

        List<Category.Item> result = categoryService.searchItemsByName("category1", "Item Name");

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Item Name", result.get(0).getName());
        verify(categoryRepository, times(1)).findById("category1");
    }

    @Test
    void testSearchItemsByName_CategoryNotFound() {
        when(categoryRepository.findById("nonexistent")).thenReturn(Optional.empty());

        RuntimeException thrown = assertThrows(RuntimeException.class, () ->
                categoryService.searchItemsByName("nonexistent", "Item Name")
        );

        assertEquals("Category not found", thrown.getMessage());
        verify(categoryRepository, times(1)).findById("nonexistent");
    }
}
