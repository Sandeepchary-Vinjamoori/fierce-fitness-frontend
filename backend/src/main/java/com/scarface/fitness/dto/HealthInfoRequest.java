
package com.scarface.fitness.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HealthInfoRequest {
    private String height;
    private String weight;
    private String age;
    private String currentHealthCondition;
    private String previousHealthConditions;
    private String allergies;
    private String medications;
    private String fitnessGoals;
    private String activityLevel;
}
