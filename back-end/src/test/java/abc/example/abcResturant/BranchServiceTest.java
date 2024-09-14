package abc.example.abcResturant;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import abc.example.restaurant.Exception.ResourceNotFoundException;
import abc.example.restaurant.Model.Branch;
import abc.example.restaurant.Repository.BranchRepository;
import abc.example.restaurant.Service.BranchService;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class BranchServiceTest {

    @Mock
    private BranchRepository branchRepository;

    @InjectMocks
    private BranchService branchService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllBranches() {
        // Arrange
        Branch branch1 = new Branch("B-001", "Branch1", "Address1", "123456789", "branch1@test.com");
        Branch branch2 = new Branch("B-002", "Branch2", "Address2", "987654321", "branch2@test.com");
        List<Branch> branches = Arrays.asList(branch1, branch2);

        when(branchRepository.findAll()).thenReturn(branches);

        // Act
        List<Branch> result = branchService.getAllBranches();

        // Assert
        assertEquals(2, result.size());
        verify(branchRepository, times(1)).findAll();
    }

    @Test
    void testGetBranchById() {
        // Arrange
        Branch branch = new Branch("B-001", "Branch1", "Address1", "123456789", "branch1@test.com");
        when(branchRepository.findById("B-001")).thenReturn(Optional.of(branch));

        // Act
        Optional<Branch> result = branchService.getBranchById("B-001");

        // Assert
        assertTrue(result.isPresent());
        assertEquals("B-001", result.get().getBranchId());
        verify(branchRepository, times(1)).findById("B-001");
    }

    @Test
    void testCreateBranch() {
        // Arrange
        Branch branch = new Branch(null, "Branch1", "Address1", "123456789", "branch1@test.com");
        Branch savedBranch = new Branch("B-001", "Branch1", "Address1", "123456789", "branch1@test.com");

        when(branchRepository.save(any(Branch.class))).thenReturn(savedBranch);
        when(branchRepository.count()).thenReturn(0L);

        // Act
        Branch result = branchService.createBranch(branch);

        // Assert
        assertEquals("B-001", result.getBranchId());
        verify(branchRepository, times(1)).save(any(Branch.class));
    }

    @Test
    void testUpdateBranch() {
        // Arrange
        Branch existingBranch = new Branch("B-001", "Branch1", "Address1", "123456789", "branch1@test.com");
        Branch updatedBranch = new Branch("B-001", "Updated Branch", "Updated Address", "987654321", "updated@test.com");

        when(branchRepository.existsById("B-001")).thenReturn(true);
        when(branchRepository.save(any(Branch.class))).thenReturn(updatedBranch);

        // Act
        Branch result = branchService.updateBranch("B-001", updatedBranch);

        // Assert
        assertEquals("B-001", result.getBranchId());
        assertEquals("Updated Branch", result.getBranchName());
        verify(branchRepository, times(1)).existsById("B-001");
        verify(branchRepository, times(1)).save(any(Branch.class));
    }

    @Test
    void testUpdateBranch_NotFound() {
        // Arrange
        Branch updatedBranch = new Branch("B-001", "Updated Branch", "Updated Address", "987654321", "updated@test.com");

        when(branchRepository.existsById("B-001")).thenReturn(false);

        // Act & Assert
        assertThrows(ResourceNotFoundException.class, () -> branchService.updateBranch("B-001", updatedBranch));
        verify(branchRepository, times(1)).existsById("B-001");
        verify(branchRepository, never()).save(any(Branch.class));
    }

    @Test
    void testDeleteBranch() {
        // Arrange
        when(branchRepository.existsById("B-001")).thenReturn(true);

        // Act
        branchService.deleteBranch("B-001");

        // Assert
        verify(branchRepository, times(1)).existsById("B-001");
        verify(branchRepository, times(1)).deleteById("B-001");
    }

    @Test
    void testDeleteBranch_NotFound() {
        // Arrange
        when(branchRepository.existsById("B-001")).thenReturn(false);

        // Act & Assert
        assertThrows(ResourceNotFoundException.class, () -> branchService.deleteBranch("B-001"));
        verify(branchRepository, times(1)).existsById("B-001");
        verify(branchRepository, never()).deleteById("B-001");
    }
}
