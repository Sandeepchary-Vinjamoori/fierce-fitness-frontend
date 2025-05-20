
package com.scarface.fitness;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class ScarceFitnessApplication {
    public static void main(String[] args) {
        SpringApplication.run(ScarceFitnessApplication.class, args);
    }
    
    @RestController
    static class HealthCheckController {
        @GetMapping("/api/health")
        public String healthCheck() {
            return "Scarface Fitness API is running!";
        }
    }
}
