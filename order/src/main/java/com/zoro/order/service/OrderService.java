package com.zoro.order.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zoro.order.client.InventoryClient;
import com.zoro.order.dto.OrderRequest;
import com.zoro.order.event.OrderPlacedEvent;
import com.zoro.order.model.Order;
import com.zoro.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final InventoryClient inventoryClient;
    private final KafkaTemplate<String, String> kafkaTemplate;

    @SneakyThrows
    public void placeOrder(OrderRequest orderRequest) {
        var isProductInStock = inventoryClient.isInStock(orderRequest.skuCode(), orderRequest.quantity());

        if (isProductInStock) {
            Order order = Order.builder()
                    .orderNumber(UUID.randomUUID().toString())
                    .price(orderRequest.price())
                    .skuCode(orderRequest.skuCode())
                    .quantity(orderRequest.quantity())
                    .build();
            orderRepository.save(order);
            OrderPlacedEvent orderPlacedEvent = new OrderPlacedEvent(order.getOrderNumber(), "test@email");
            String orderJson = new ObjectMapper().writeValueAsString(orderPlacedEvent);
            log.info("Kafka sending ------------------- {}", orderJson);
            kafkaTemplate.send("order-placed", orderJson);
            log.info("Kafka sended......................");
        } else {
            throw new RuntimeException("Product with skuCode " + orderRequest.skuCode() + " is out of stock.");
        }
    }
}
