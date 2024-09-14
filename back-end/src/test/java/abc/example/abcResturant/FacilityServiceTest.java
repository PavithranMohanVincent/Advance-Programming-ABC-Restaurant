package abc.example.abcResturant;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import abc.example.restaurant.Model.Facility;
import abc.example.restaurant.Repository.FacilityRepository;
import abc.example.restaurant.Service.FacilityService;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class FacilityServiceTest {

    @Mock
    private FacilityRepository facilityRepository;

    @InjectMocks
    private FacilityService facilityService;

    private Facility facility;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        facility = new Facility("F001", "Gym", "Spacious gym facility", new byte[0]);
    }

    @Test
    void testGetAllFacilities() {
        // Arrange
        Facility facility2 = new Facility("F002", "Pool", "Swimming pool with temperature control", new byte[0]);
        List<Facility> facilityList = Arrays.asList(facility, facility2);

        when(facilityRepository.findAll()).thenReturn(facilityList);

        // Act
        List<Facility> result = facilityService.getAllFacilities();

        // Assert
        assertEquals(2, result.size());
        verify(facilityRepository, times(1)).findAll();
    }

    @Test
    void testGetFacilityById() {
        // Arrange
        when(facilityRepository.findById("F001")).thenReturn(Optional.of(facility));

        // Act
        Optional<Facility> result = facilityService.getFacilityById("F001");

        // Assert
        assertTrue(result.isPresent());
        assertEquals("F001", result.get().getId());
        assertEquals("Gym", result.get().getHeading());
        verify(facilityRepository, times(1)).findById("F001");
    }

    @Test
    void testAddFacility() {
        // Arrange
        when(facilityRepository.save(any(Facility.class))).thenReturn(facility);

        // Act
        Facility result = facilityService.addFacility(facility);

        // Assert
        assertNotNull(result);
        assertEquals("F001", result.getId());
        verify(facilityRepository, times(1)).save(any(Facility.class));
    }

    @Test
    void testUpdateFacility() {
        // Arrange
        Facility updatedFacility = new Facility("F001", "Updated Gym", "Updated description", new byte[0]);
        when(facilityRepository.findById("F001")).thenReturn(Optional.of(facility));
        when(facilityRepository.save(any(Facility.class))).thenReturn(updatedFacility);

        // Act
        Facility result = facilityService.updateFacility("F001", updatedFacility);

        // Assert
        assertEquals("Updated Gym", result.getHeading());
        assertEquals("Updated description", result.getDescription());
        verify(facilityRepository, times(1)).findById("F001");
        verify(facilityRepository, times(1)).save(any(Facility.class));
    }

    @Test
    void testUpdateFacility_NotFound() {
        // Arrange
        Facility updatedFacility = new Facility("F001", "Updated Gym", "Updated description", new byte[0]);
        when(facilityRepository.findById("F001")).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> {
            facilityService.updateFacility("F001", updatedFacility);
        });

        verify(facilityRepository, times(1)).findById("F001");
        verify(facilityRepository, never()).save(any(Facility.class));
    }

    @Test
    void testDeleteFacility() {
        // Arrange
        doNothing().when(facilityRepository).deleteById("F001");

        // Act
        facilityService.deleteFacility("F001");

        // Assert
        verify(facilityRepository, times(1)).deleteById("F001");
    }
}
