package com.zoro.notification.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zoro.notification.kafka.OrderPlacedEvent;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationService {

    private final JavaMailSender javaMailSender;

    @SneakyThrows
    @KafkaListener(topics = "order-placed")
    public void listen(String order) {
        ObjectMapper objectMapper = new ObjectMapper();
        OrderPlacedEvent orderPlacedEvent = objectMapper.readValue(order, OrderPlacedEvent.class);
        log.info("Message from order topic");
        MimeMessagePreparator messagePreparator = mimeMessage -> {
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
            messageHelper.setFrom("springshop@email.com");
            messageHelper.setTo(orderPlacedEvent.getEmail());
            messageHelper.setSubject(String.format("Your Order with order number %s is done", orderPlacedEvent.getOrderNumber()));
            messageHelper.setText(String.format("""
                    Hello,
                    
                    Your order with order number %s is ok
                    
                    Done
                    """,
                   orderPlacedEvent.getOrderNumber()));
        };
        try {
            javaMailSender.send(messagePreparator);
            log.info("Order notification email sent");
        } catch (MailException e) {
            log.error("Exception when sending mail");
            throw new RuntimeException("Exception occurred when sending email");
        }
    }
}
