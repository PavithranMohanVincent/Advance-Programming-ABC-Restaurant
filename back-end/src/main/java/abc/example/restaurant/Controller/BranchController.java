package abc.example.restaurant.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import abc.example.restaurant.Model.Branch;
import abc.example.restaurant.Service.BranchService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/branch")
public class BranchController {

    @Autowired
    private BranchService branchService;

    @GetMapping
    public ResponseEntity<List<Branch>> getAllBranches() {
        return new ResponseEntity<>(branchService.getAllBranches(), HttpStatus.OK);
    }

    @GetMapping("/{branchId}")
    public ResponseEntity<Optional<Branch>> getBranchById(@PathVariable String branchId) {
        return new ResponseEntity<>(branchService.getBranchById(branchId), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Branch> createBranch(@RequestBody Branch branch) {
        Branch newBranch = branchService.createBranch(branch);
        return new ResponseEntity<>(newBranch, HttpStatus.CREATED);
    }

    @PutMapping("/{branchId}")
    public ResponseEntity<Branch> updateBranch(@PathVariable String branchId, @RequestBody Branch branch) {
        Branch updatedBranch = branchService.updateBranch(branchId, branch);
        return ResponseEntity.ok(updatedBranch);
    }

    @DeleteMapping("/{branchId}")
    public ResponseEntity<Void> deleteBranch(@PathVariable String branchId) {
        branchService.deleteBranch(branchId);
        return ResponseEntity.noContent().build();
    }
}
