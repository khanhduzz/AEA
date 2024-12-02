package com.zoro.notification.service;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.retry.support.RetryTemplate;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationService {

    private final JavaMailSender javaMailSender;
    private final RetryTemplate retryTemplate;

    @SneakyThrows
    @KafkaListener(topics = "order-placed")
    public void listen(String order) {
        log.info("Message from order topic {}", order);
        MimeMessagePreparator messagePreparator = mimeMessage -> {
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
            messageHelper.setFrom("springshop@email.com");
            messageHelper.setTo("Test");
            messageHelper.setSubject(String.format("Your Order with order number %s is done", "test"));
            messageHelper.setText(String.format("""
                    Hello,
                    
                    Your order with order number %s is ok
                    
                    Done
                    """,
                   "test"));
        };
        try {
            retryTemplate.execute(context -> {
                javaMailSender.send(messagePreparator);
                log.info("Order notification email sent");
                return null;
            });
        } catch (MailException e) {
            log.error("Exception when sending mail after retries: {}", e.getMessage());
            throw new RuntimeException("Failed to send email after retries", e);
        }
    }
}
