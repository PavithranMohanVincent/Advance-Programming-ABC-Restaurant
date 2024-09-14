package abc.example.restaurant.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import abc.example.restaurant.Model.Order;
import abc.example.restaurant.Repository.OrderRepository;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Optional<Order> getOrderById(String orderId) {
        return orderRepository.findById(orderId);
    }

    public List<Order> getOrdersByUserId(String userId) {
        return orderRepository.findByUserId(userId);
    }

    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    public Order updateOrder(String orderId, Order orderDetails) {
        Optional<Order> orderOptional = orderRepository.findById(orderId);
        if (orderOptional.isPresent()) {
            Order order = orderOptional.get();
            order.setProductIds(orderDetails.getProductIds());
            order.setOrderDate(orderDetails.getOrderDate());
            order.setTotalPrice(orderDetails.getTotalPrice());
            order.setStatus(orderDetails.getStatus());
            order.setDeliveryAddress(orderDetails.getDeliveryAddress());
            order.setPaymentMethod(orderDetails.getPaymentMethod());
            return orderRepository.save(order);
        } else {
            return null;  // Handle the case where the order is not found
        }
    }

    public void deleteOrder(String orderId) {
        orderRepository.deleteById(orderId);
    }
}
