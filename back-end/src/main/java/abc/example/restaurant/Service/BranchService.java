package abc.example.restaurant.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import abc.example.restaurant.Exception.ResourceNotFoundException;
import abc.example.restaurant.Model.Branch;
import abc.example.restaurant.Repository.BranchRepository;

import java.util.List;
import java.util.Optional;

@Service
public class BranchService {

    @Autowired
    private BranchRepository branchRepository;

    // Get all branches
    public List<Branch> getAllBranches() {
        return branchRepository.findAll();
    }

    // Get a single branch by branchId
    public Optional<Branch> getBranchById(String branchId) {
        return branchRepository.findById(branchId);
    }

    // Add a new branch
    public Branch createBranch(Branch branch) {
        branch.setBranchId(generateBranchId());
        return branchRepository.save(branch);
    }

    // Generate a new branch ID
    private String generateBranchId() {
        long count = branchRepository.count();
        return String.format("B-%03d", count + 1);
    }

    // Update an existing branch by branchId
    public Branch updateBranch(String branchId, Branch branch) {
        if (!branchRepository.existsById(branchId)) {
            throw new ResourceNotFoundException("Branch not found with id " + branchId);
        }
        branch.setBranchId(branchId);
        return branchRepository.save(branch);
    }

    // Delete a branch by branchId
    public void deleteBranch(String branchId) {
        if (!branchRepository.existsById(branchId)) {
            throw new ResourceNotFoundException("Branch not found with id " + branchId);
        }
        branchRepository.deleteById(branchId);
    }
}
