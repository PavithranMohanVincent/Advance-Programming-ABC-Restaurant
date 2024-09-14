package abc.example.abcResturant;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import abc.example.restaurant.Model.Table;
import abc.example.restaurant.Repository.TableRepository;
import abc.example.restaurant.Service.TableService;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TableServiceTest {

    @Mock
    private TableRepository tableRepository;

    @InjectMocks
    private TableService tableService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getAllTables_ShouldReturnListOfTables() {
        // Arrange
        Table table1 = new Table("1", "John", "0712345678", "johnDoe", "2024-09-10", "19:00", 4, "Outlet1", 1, "Confirmed");
        Table table2 = new Table("2", "Jane", "0712345679", "janeDoe", "2024-09-11", "20:00", 2, "Outlet2", 2, "Pending");
        when(tableRepository.findAll()).thenReturn(Arrays.asList(table1, table2));

        // Act
        List<Table> tables = tableService.getAllTables();

        // Assert
        assertNotNull(tables);
        assertEquals(2, tables.size());
        assertEquals("John", tables.get(0).getName());
        assertEquals("Jane", tables.get(1).getName());
        verify(tableRepository, times(1)).findAll();
    }

    @Test
    void getTableById_WhenTableExists_ShouldReturnTable() {
        // Arrange
        String id = "1";
        Table table = new Table(id, "John", "0712345678", "johnDoe", "2024-09-10", "19:00", 4, "Outlet1", 1, "Confirmed");
        when(tableRepository.findById(id)).thenReturn(Optional.of(table));

        // Act
        Optional<Table> result = tableService.getTableById(id);

        // Assert
        assertTrue(result.isPresent());
        assertEquals("John", result.get().getName());
        verify(tableRepository, times(1)).findById(id);
    }

    @Test
    void getTableById_WhenTableDoesNotExist_ShouldReturnEmpty() {
        // Arrange
        String id = "1";
        when(tableRepository.findById(id)).thenReturn(Optional.empty());

        // Act
        Optional<Table> result = tableService.getTableById(id);

        // Assert
        assertFalse(result.isPresent());
        verify(tableRepository, times(1)).findById(id);
    }

    @Test
    void createTable_ShouldSaveAndReturnTable() {
        // Arrange
        Table table = new Table("1", "John", "0712345678", "johnDoe", "2024-09-10", "19:00", 4, "Outlet1", 1, "Confirmed");
        when(tableRepository.save(table)).thenReturn(table);

        // Act
        Table result = tableService.createTable(table);

        // Assert
        assertNotNull(result);
        assertEquals("John", result.getName());
        verify(tableRepository, times(1)).save(table);
    }

    @Test
    void updateTable_WhenTableExists_ShouldUpdateAndReturnUpdatedTable() {
        // Arrange
        String id = "1";
        Table existingTable = new Table(id, "John", "0712345678", "johnDoe", "2024-09-10", "19:00", 4, "Outlet1", 1, "Confirmed");
        Table updatedTable = new Table(id, "Jane", "0712345679", "janeDoe", "2024-09-11", "20:00", 2, "Outlet2", 2, "Pending");
        when(tableRepository.findById(id)).thenReturn(Optional.of(existingTable));
        when(tableRepository.save(existingTable)).thenReturn(updatedTable);

        // Act
        Table result = tableService.updateTable(id, updatedTable);

        // Assert
        assertNotNull(result);
        assertEquals("Jane", result.getName());
        verify(tableRepository, times(1)).findById(id);
        verify(tableRepository, times(1)).save(existingTable);
    }

    @Test
    void updateTable_WhenTableDoesNotExist_ShouldReturnNull() {
        // Arrange
        String id = "1";
        Table updatedTable = new Table(id, "Jane", "0712345679", "janeDoe", "2024-09-11", "20:00", 2, "Outlet2", 2, "Pending");
        when(tableRepository.findById(id)).thenReturn(Optional.empty());

        // Act
        Table result = tableService.updateTable(id, updatedTable);

        // Assert
        assertNull(result);
        verify(tableRepository, times(1)).findById(id);
        verify(tableRepository, never()).save(any(Table.class));
    }

    @Test
    void deleteTable_WhenTableExists_ShouldReturnTrue() {
        // Arrange
        String id = "1";
        when(tableRepository.existsById(id)).thenReturn(true);

        // Act
        boolean result = tableService.deleteTable(id);

        // Assert
        assertTrue(result);
        verify(tableRepository, times(1)).existsById(id);
        verify(tableRepository, times(1)).deleteById(id);
    }

    @Test
    void deleteTable_WhenTableDoesNotExist_ShouldReturnFalse() {
        // Arrange
        String id = "1";
        when(tableRepository.existsById(id)).thenReturn(false);

        // Act
        boolean result = tableService.deleteTable(id);

        // Assert
        assertFalse(result);
        verify(tableRepository, times(1)).existsById(id);
        verify(tableRepository, never()).deleteById(id);
    }
}
