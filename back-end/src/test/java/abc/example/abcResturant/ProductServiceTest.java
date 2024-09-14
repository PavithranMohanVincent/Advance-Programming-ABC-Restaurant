package abc.example.abcResturant;

import org.bson.types.ObjectId;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import abc.example.restaurant.Exception.ResourceNotFoundException;
import abc.example.restaurant.Model.Product;
import abc.example.restaurant.Repository.ProductRepository;
import abc.example.restaurant.Service.ProductService;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    private Product product;
    private ObjectId productId;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);

        productId = new ObjectId();
        product = new Product(productId, "product-001", "Sample Product", "Category 1", 10.0f, "image.jpg", "Product Description");
    }

    // Test for retrieving all products
    @Test
    public void testAllProduct() {
        List<Product> products = Arrays.asList(product);

        when(productRepository.findAll()).thenReturn(products);

        List<Product> result = productService.allProduct();
        assertEquals(1, result.size());
        assertEquals(product, result.get(0));

        verify(productRepository, times(1)).findAll();
    }

    // Test for retrieving a single product by ID
    @Test
    public void testSingleProduct() {
        when(productRepository.findById(productId)).thenReturn(Optional.of(product));

        Optional<Product> result = productService.singleProduct(productId);
        assertTrue(result.isPresent());
        assertEquals(product, result.get());

        verify(productRepository, times(1)).findById(productId);
    }

    // Test for adding a new product
    @Test
    public void testAddProduct() {
        when(productRepository.save(product)).thenReturn(product);
        when(productRepository.count()).thenReturn(0L); // Mock count for product ID generation

        Product result = productService.addProduct(product);
        assertNotNull(result);
        assertEquals("product-001", result.getProductId());

        verify(productRepository, times(1)).save(product);
        verify(productRepository, times(1)).count();
    }

    // Test for updating an existing product
    @Test
    public void testUpdateProduct() {
        // Arrange: Setup existing product and updated product information
        Product updatedProduct = new Product(productId, "product-001", "Updated Product", "Category 1", 20.0f, "updated_image.jpg", "Updated Description");

        // Mock the repository behavior
        when(productRepository.existsById(productId)).thenReturn(true);  // Product exists
        when(productRepository.save(updatedProduct)).thenReturn(updatedProduct);  // Save returns the updated product

        // Act: Call the updateProduct method
        Product result = productService.updateProduct(productId, updatedProduct);

        // Assert: Verify the result
        assertNotNull(result);  // Ensure the result is not null
        assertEquals("Updated Product", result.getProductName());  // Check if the product name is updated
        assertEquals(20.0f, result.getProductPrice());  // Check if the price is updated

        // Verify that the repository methods were called with the correct arguments
        verify(productRepository, times(1)).existsById(productId);  // Check that existsById was called once
        verify(productRepository, times(1)).save(updatedProduct);  // Check that save was called once with the updated product
    }


    // Test for deleting a product
    @Test
    public void testDeleteProduct() {
        when(productRepository.existsById(productId)).thenReturn(true);
        doNothing().when(productRepository).deleteById(productId);

        productService.deleteProduct(productId);

        verify(productRepository, times(1)).existsById(productId);
        verify(productRepository, times(1)).deleteById(productId);
    }

    // Test for retrieving products by category
    @Test
    public void testGetProductsByCategory() {
        when(productRepository.findByCategoryName("Category 1")).thenReturn(Arrays.asList(product));

        List<Product> result = productService.getProductsByCategory("Category 1");
        assertEquals(1, result.size());
        assertEquals(product, result.get(0));

        verify(productRepository, times(1)).findByCategoryName("Category 1");
    }

    // Test for updating a product with non-existent ID
    @Test
    public void testUpdateProductWithNonExistentId() {
        when(productRepository.existsById(productId)).thenReturn(false);

        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class, () -> {
            productService.updateProduct(productId, product);
        });

        assertEquals("Product not found with id " + productId, exception.getMessage());

        verify(productRepository, times(1)).existsById(productId);
        verify(productRepository, times(0)).save(any(Product.class));
    }

    // Test for deleting a product with non-existent ID
    @Test
    public void testDeleteProductWithNonExistentId() {
        when(productRepository.existsById(productId)).thenReturn(false);

        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class, () -> {
            productService.deleteProduct(productId);
        });

        assertEquals("Product not found with id " + productId, exception.getMessage());

        verify(productRepository, times(1)).existsById(productId);
        verify(productRepository, times(0)).deleteById(productId);
    }
}
