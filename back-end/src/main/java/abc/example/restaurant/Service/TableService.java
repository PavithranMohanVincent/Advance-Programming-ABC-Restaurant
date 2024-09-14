package abc.example.restaurant.Service;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import abc.example.restaurant.Model.Reservation;
import abc.example.restaurant.Model.Table;
import abc.example.restaurant.Repository.TableRepository;

import java.util.List;
import java.util.Optional;

@Service
public class TableService {

    @Autowired
    private TableRepository tableRepository;

    public List<Table> getAllTables() {
        return tableRepository.findAll();
    }

    public Optional<Table> getTableById(String id) {
        return tableRepository.findById(id);
    }

    public Table createTable(Table table) {
        return tableRepository.save(table);
    }

    public Table updateTable(String id, Table updatedTable) {
        Optional<Table> optionalTable = tableRepository.findById(id);
        if (optionalTable.isPresent()) {
            Table existingTable = optionalTable.get();

            // Update the fields of the existingTable with the new values
            existingTable.setName(updatedTable.getName());
            existingTable.setContactNo(updatedTable.getContactNo());
            existingTable.setUsername(updatedTable.getUsername());
            existingTable.setDate(updatedTable.getDate());
            existingTable.setTime(updatedTable.getTime());
            existingTable.setGuests(updatedTable.getGuests());
            existingTable.setOutlet(updatedTable.getOutlet());
            existingTable.setTableNo(updatedTable.getTableNo());
            existingTable.setStatus(updatedTable.getStatus());

            // Save the updated existingTable back to the repository
            return tableRepository.save(existingTable);
        } else {
            return null; // Or throw an exception
        }
    }


    public boolean deleteTable(String id) {
        if (tableRepository.existsById(id)) {
            tableRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }


}
