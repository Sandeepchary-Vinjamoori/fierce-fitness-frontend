
package com.scarface.fitness.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "health_info")
public class HealthInfo {

    @Id
    private String id;

    private String height;
    private String weight;
    private String age;

    @Column(name = "current_health_condition")
    private String currentHealthCondition;

    @Column(name = "previous_health_conditions")
    private String previousHealthConditions;

    private String allergies;
    private String medications;

    @Column(name = "fitness_goals")
    private String fitnessGoals;

    @Column(name = "activity_level")
    private String activityLevel;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @OneToOne
    @MapsId
    @JsonIgnore
    @JoinColumn(name = "id")
    private User user;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
