package abc.example.abcResturant;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import abc.example.restaurant.Model.Gallery;
import abc.example.restaurant.Model.Gallery.Item;
import abc.example.restaurant.Repository.GalleryRepository;
import abc.example.restaurant.Service.GalleryService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class GalleryServiceTest {

    @Mock
    private GalleryRepository galleryRepository;

    @InjectMocks
    private GalleryService galleryService;

    private Gallery gallery;
    private Item item;

    @BeforeEach
    public void setUp() {
        // Initialize test data
        item = new Gallery.Item("item1", "imageData");
        List<Gallery.Item> images = new ArrayList<>();
        images.add(item);
        gallery = new Gallery("gallery1", "GalleryName", images);
    }

    @Test
    public void testGetGalleryByName() {
        // Mock behavior
        when(galleryRepository.findByName("GalleryName")).thenReturn(Optional.of(gallery));

        // Test the service method
        Optional<Gallery> result = galleryService.getGalleryByName("GalleryName");

        // Validate the result
        assertTrue(result.isPresent());
        assertEquals("GalleryName", result.get().getName());
    }

    @Test
    public void testGetAllGalleries() {
        List<Gallery> galleries = new ArrayList<>();
        galleries.add(gallery);

        // Mock behavior
        when(galleryRepository.findAll()).thenReturn(galleries);

        // Test the service method
        List<Gallery> result = galleryService.getAllGalleries();

        // Validate the result
        assertEquals(1, result.size());
        assertEquals("GalleryName", result.get(0).getName());
    }

    @Test
    public void testAddGallery() {
        // Mock behavior
        when(galleryRepository.save(gallery)).thenReturn(gallery);

        // Test the service method
        Gallery result = galleryService.addGallery(gallery);

        // Validate the result
        assertEquals("GalleryName", result.getName());
        assertEquals(1, result.getImages().size());
    }

    @Test
    public void testUpdateGallery() {
        // Create a new gallery with updated details
        Gallery updatedGallery = new Gallery("gallery1", "UpdatedName", gallery.getImages());

        // Mock behavior for existsById and save methods
        when(galleryRepository.existsById("gallery1")).thenReturn(true);
        when(galleryRepository.save(updatedGallery)).thenReturn(updatedGallery);

        // Test the service method
        Gallery result = galleryService.updateGallery("gallery1", updatedGallery);

        // Verify that the id of the gallery was properly set
        verify(galleryRepository, times(1)).save(updatedGallery);

        // Validate the result
        assertNotNull(result);
        assertEquals("UpdatedName", result.getName());
        assertEquals("gallery1", result.getId()); // Ensure the id is correctly set
    }


    @Test
    public void testDeleteGallery() {
        // Test the service method
        galleryService.deleteGallery("gallery1");

        // Verify that the deleteById method was called
        verify(galleryRepository, times(1)).deleteById("gallery1");
    }

    @Test
    public void testAddItemToGallery() {
        // Mock behavior
        when(galleryRepository.findById("gallery1")).thenReturn(Optional.of(gallery));
        when(galleryRepository.save(gallery)).thenReturn(gallery);

        // Test the service method
        Gallery.Item newItem = new Gallery.Item("item2", "newImageData");
        Gallery result = galleryService.addItemToGallery("gallery1", newItem);

        // Validate the result
        assertEquals(2, result.getImages().size());
    }

    @Test
    public void testUpdateItemInGallery() {
        // Mock behavior
        when(galleryRepository.findById("gallery1")).thenReturn(Optional.of(gallery));
        when(galleryRepository.save(gallery)).thenReturn(gallery);

        // Test the service method
        Gallery.Item updatedItem = new Gallery.Item("item1", "updatedImageData");
        Gallery result = galleryService.updateItemInGallery("gallery1", "item1", updatedItem);

        // Validate the result
        assertEquals("updatedImageData", result.getImages().get(0).getImageData());
    }

    @Test
    public void testDeleteItemFromGallery() {
        // Mock behavior
        when(galleryRepository.findById("gallery1")).thenReturn(Optional.of(gallery));
        when(galleryRepository.save(gallery)).thenReturn(gallery);

        // Test the service method
        Gallery result = galleryService.deleteItemFromGallery("gallery1", "item1");

        // Validate the result
        assertTrue(result.getImages().isEmpty());
    }
}
