package org.be.policycopilotbackend.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@EnableRabbit
@Configuration
public class RabbitConfig {
    public static final String DOC_EXCHANGE = "doc-exchange";
    public static final String DOC_QUEUE = "doc-exchange-queue";
    public static final String DOC_ROUTING_KEY = "doc.process";

    @Bean
    public TopicExchange docExchange() {
        return new TopicExchange(DOC_EXCHANGE);
    }

    @Bean
    public Queue docQueue() {
        return new Queue(DOC_QUEUE);
    }

    @Bean
    public Binding docBinding(TopicExchange docExchange, Queue docQueue) {
        return BindingBuilder
                .bind(docQueue)
                .to(docExchange)
                .with(DOC_ROUTING_KEY);
    }
}
