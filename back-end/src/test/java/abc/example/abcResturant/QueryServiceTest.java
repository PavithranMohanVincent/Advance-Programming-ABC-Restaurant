package abc.example.abcResturant;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import abc.example.restaurant.Model.Query;
import abc.example.restaurant.Repository.QueryRepository;
import abc.example.restaurant.Service.QueryService;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class QueryServiceTest {

    @Mock
    private QueryRepository queryRepository;

    @InjectMocks
    private QueryService queryService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
    }

    // Test saveQuery
    @Test
    public void testSaveQuery() {
        Query query = new Query("John Doe", "john@example.com", "Subject", "Message", "Open", "Respond");

        when(queryRepository.save(query)).thenReturn(query);

        Query savedQuery = queryService.saveQuery(query);

        assertNotNull(savedQuery);
        assertEquals("John Doe", savedQuery.getName());
        verify(queryRepository, times(1)).save(query);
    }

    // Test getAllQueries
    @Test
    public void testGetAllQueries() {
        Query query1 = new Query("John Doe", "john@example.com", "Subject", "Message", "Open", "Respond");
        Query query2 = new Query("Jane Doe", "jane@example.com", "Subject2", "Message2", "Closed", "Respond2");

        when(queryRepository.findAll()).thenReturn(Arrays.asList(query1, query2));

        List<Query> queryList = queryService.getAllQueries();

        assertEquals(2, queryList.size());
        verify(queryRepository, times(1)).findAll();
    }

    // Test getQueryById
    @Test
    public void testGetQueryById() {
        Query query = new Query("John Doe", "john@example.com", "Subject", "Message", "Open", "Respond");

        when(queryRepository.findById("1")).thenReturn(Optional.of(query));

        Optional<Query> foundQuery = queryService.getQueryById("1");

        assertTrue(foundQuery.isPresent());
        assertEquals("John Doe", foundQuery.get().getName());
        verify(queryRepository, times(1)).findById("1");
    }

    // Test deleteQuery
    @Test
    public void testDeleteQuery() {
        doNothing().when(queryRepository).deleteById("1");

        queryService.deleteQuery("1");

        verify(queryRepository, times(1)).deleteById("1");
    }

    // Test updateQuery
    @Test
    public void testUpdateQuery() {
        Query existingQuery = new Query("John Doe", "john@example.com", "Subject", "Message", "Open", "Respond");
        Query updatedQueryDetails = new Query("Jane Doe", "jane@example.com", "New Subject", "New Message", "Closed", "New Respond");

        when(queryRepository.findById("1")).thenReturn(Optional.of(existingQuery));
        when(queryRepository.save(existingQuery)).thenReturn(existingQuery);

        Query updatedQuery = queryService.updateQuery("1", updatedQueryDetails);

        assertNotNull(updatedQuery);
        assertEquals("Jane Doe", updatedQuery.getName());
        assertEquals("Closed", updatedQuery.getStatus());
        verify(queryRepository, times(1)).findById("1");
        verify(queryRepository, times(1)).save(existingQuery);
    }
}
