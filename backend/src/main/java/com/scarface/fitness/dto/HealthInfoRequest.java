
package com.scarface.fitness.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class HealthInfoRequest {
    
    @NotBlank(message = "Height is required")
    private String height;
    
    @NotBlank(message = "Weight is required")
    private String weight;
    
    @NotBlank(message = "Age is required")
    private String age;
    
    private String currentHealthCondition;
    
    private String previousHealthConditions;
    
    private String allergies;
    
    private String medications;
    
    private String fitnessGoals;
    
    @NotBlank(message = "Activity level is required")
    private String activityLevel;
}
