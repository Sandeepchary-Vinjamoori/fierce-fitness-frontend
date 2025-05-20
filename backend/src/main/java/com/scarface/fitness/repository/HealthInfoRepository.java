
package com.scarface.fitness.repository;

import com.scarface.fitness.model.HealthInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HealthInfoRepository extends JpaRepository<HealthInfo, String> {
}
