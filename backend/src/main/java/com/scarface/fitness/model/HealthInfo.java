
package com.scarface.fitness.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "health_info")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HealthInfo {

    @Id
    private String id;

    @Column(nullable = false)
    private String height;
    
    @Column(nullable = false)
    private String weight;
    
    @Column(nullable = false)
    private String age;
    
    @Column(name = "current_health_condition")
    private String currentHealthCondition;
    
    @Column(name = "previous_health_conditions")
    private String previousHealthConditions;
    
    private String allergies;
    
    private String medications;
    
    @Column(name = "fitness_goals")
    private String fitnessGoals;
    
    @Column(name = "activity_level", nullable = false)
    private String activityLevel;
    
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @PrePersist
    public void prePersist() {
        if (this.id == null && user != null) {
            this.id = user.getId();
        }
    }
}
