
package com.scarface.fitness.repository;

import com.scarface.fitness.model.HealthInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface HealthInfoRepository extends JpaRepository<HealthInfo, String> {
    Optional<HealthInfo> findByUserId(String userId);
}
