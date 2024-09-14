package abc.example.restaurant.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import abc.example.restaurant.Model.Query;
import abc.example.restaurant.Repository.QueryRepository;

import java.util.List;
import java.util.Optional;

@Service
public class QueryService {

    @Autowired
    private QueryRepository queryRepository;

    public Query saveQuery(Query query) {
        return queryRepository.save(query);
    }

    public List<Query> getAllQueries() {
        return queryRepository.findAll();
    }

    public Optional<Query> getQueryById(String id) {
        return queryRepository.findById(id);
    }

    public void deleteQuery(String id) {
        queryRepository.deleteById(id);
    }

    public Query updateQuery(String id, Query queryDetails) {
        Query query = queryRepository.findById(id).orElseThrow(() -> new RuntimeException("Query not found"));
        query.setName(queryDetails.getName());
        query.setEmail(queryDetails.getEmail());
        query.setSubject(queryDetails.getSubject());
        query.setMessage(queryDetails.getMessage());
        query.setStatus(queryDetails.getStatus());
        query.setRespond(queryDetails.getRespond());
        return queryRepository.save(query);
    }
}
