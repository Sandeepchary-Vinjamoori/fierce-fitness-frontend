
package com.scarface.fitness.service;

import com.scarface.fitness.dto.HealthInfoRequest;
import com.scarface.fitness.model.HealthInfo;
import com.scarface.fitness.model.User;
import com.scarface.fitness.repository.HealthInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class HealthInfoService {

    private final HealthInfoRepository healthInfoRepository;
    private final UserService userService;

    public HealthInfo getHealthInfoByUserId(String userId) {
        User user = userService.getUserById(userId);
        return user.getHealthInfo();
    }

    @Transactional
    public HealthInfo saveOrUpdateHealthInfo(String userId, HealthInfoRequest request) {
        User user = userService.getUserById(userId);
        
        HealthInfo healthInfo = user.getHealthInfo();
        if (healthInfo == null) {
            healthInfo = new HealthInfo();
            healthInfo.setUser(user);
            user.setHealthInfo(healthInfo);
        }
        
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
