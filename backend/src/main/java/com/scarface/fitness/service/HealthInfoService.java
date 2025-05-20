
package com.scarface.fitness.service;

import com.scarface.fitness.dto.HealthInfoRequest;
import com.scarface.fitness.model.HealthInfo;
import com.scarface.fitness.model.User;
import com.scarface.fitness.repository.HealthInfoRepository;
import com.scarface.fitness.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class HealthInfoService {

    private final HealthInfoRepository healthInfoRepository;
    private final UserRepository userRepository;

    public HealthInfo getHealthInfoByUserId(String userId) {
        return healthInfoRepository.findByUserId(userId)
                .orElseThrow(() -> new EntityNotFoundException("Health info not found for user with ID: " + userId));
    }

    @Transactional
    public HealthInfo saveOrUpdateHealthInfo(String userId, HealthInfoRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + userId));

        // Check if health info already exists
        HealthInfo healthInfo = healthInfoRepository.findByUserId(userId)
                .orElse(HealthInfo.builder().user(user).build());

        // Update fields
        healthInfo.setHeight(request.getHeight());
        healthInfo.setWeight(request.getWeight());
        healthInfo.setAge(request.getAge());
        healthInfo.setCurrentHealthCondition(request.getCurrentHealthCondition());
        healthInfo.setPreviousHealthConditions(request.getPreviousHealthConditions());
        healthInfo.setAllergies(request.getAllergies());
        healthInfo.setMedications(request.getMedications());
        healthInfo.setFitnessGoals(request.getFitnessGoals());
        healthInfo.setActivityLevel(request.getActivityLevel());

        return healthInfoRepository.save(healthInfo);
    }
}
