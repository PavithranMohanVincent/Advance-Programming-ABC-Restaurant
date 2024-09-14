package abc.example.abcResturant;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import abc.example.restaurant.Model.Order;
import abc.example.restaurant.Repository.OrderRepository;
import abc.example.restaurant.Service.OrderService;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @InjectMocks
    private OrderService orderService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);  // Initialize Mockito annotations
    }

    // Test getAllOrders
    @Test
    public void testGetAllOrders() {
        Order order1 = new Order("1", "user1", Arrays.asList("prod1", "prod2"), "2023-09-01", 100.0, "Pending", "123 Main St", "Credit Card");
        Order order2 = new Order("2", "user2", Arrays.asList("prod3", "prod4"), "2023-09-02", 200.0, "Shipped", "456 Elm St", "PayPal");

        when(orderRepository.findAll()).thenReturn(Arrays.asList(order1, order2));

        List<Order> orders = orderService.getAllOrders();

        assertEquals(2, orders.size());
        verify(orderRepository, times(1)).findAll();
    }

    // Test getOrderById
    @Test
    public void testGetOrderById() {
        Order order = new Order("1", "user1", Arrays.asList("prod1", "prod2"), "2023-09-01", 100.0, "Pending", "123 Main St", "Credit Card");

        when(orderRepository.findById("1")).thenReturn(Optional.of(order));

        Optional<Order> foundOrder = orderService.getOrderById("1");

        assertTrue(foundOrder.isPresent());
        assertEquals("1", foundOrder.get().getOrderId());
        verify(orderRepository, times(1)).findById("1");
    }

    // Test getOrdersByUserId
    @Test
    public void testGetOrdersByUserId() {
        Order order1 = new Order("1", "user1", Arrays.asList("prod1", "prod2"), "2023-09-01", 100.0, "Pending", "123 Main St", "Credit Card");
        Order order2 = new Order("2", "user1", Arrays.asList("prod3", "prod4"), "2023-09-02", 200.0, "Shipped", "456 Elm St", "PayPal");

        when(orderRepository.findByUserId("user1")).thenReturn(Arrays.asList(order1, order2));

        List<Order> userOrders = orderService.getOrdersByUserId("user1");

        assertEquals(2, userOrders.size());
        verify(orderRepository, times(1)).findByUserId("user1");
    }

    // Test createOrder
    @Test
    public void testCreateOrder() {
        Order order = new Order("1", "user1", Arrays.asList("prod1", "prod2"), "2023-09-01", 100.0, "Pending", "123 Main St", "Credit Card");

        when(orderRepository.save(order)).thenReturn(order);

        Order savedOrder = orderService.createOrder(order);

        assertNotNull(savedOrder);
        assertEquals("1", savedOrder.getOrderId());
        verify(orderRepository, times(1)).save(order);
    }

    // Test updateOrder
    @Test
    public void testUpdateOrder() {
        Order existingOrder = new Order("1", "user1", Arrays.asList("prod1", "prod2"), "2023-09-01", 100.0, "Pending", "123 Main St", "Credit Card");
        Order updatedOrderDetails = new Order("1", "user1", Arrays.asList("prod3", "prod4"), "2023-09-02", 150.0, "Shipped", "456 Elm St", "PayPal");

        when(orderRepository.findById("1")).thenReturn(Optional.of(existingOrder));
        when(orderRepository.save(existingOrder)).thenReturn(existingOrder);

        Order updatedOrder = orderService.updateOrder("1", updatedOrderDetails);

        assertNotNull(updatedOrder);
        assertEquals("Shipped", updatedOrder.getStatus());
        assertEquals(150.0, updatedOrder.getTotalPrice());
        verify(orderRepository, times(1)).findById("1");
        verify(orderRepository, times(1)).save(existingOrder);
    }

    // Test deleteOrder
    @Test
    public void testDeleteOrder() {
        doNothing().when(orderRepository).deleteById("1");

        orderService.deleteOrder("1");

        verify(orderRepository, times(1)).deleteById("1");
    }
}
