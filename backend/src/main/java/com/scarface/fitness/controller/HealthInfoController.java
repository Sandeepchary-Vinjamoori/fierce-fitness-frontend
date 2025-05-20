
package com.scarface.fitness.controller;

import com.scarface.fitness.dto.HealthInfoRequest;
import com.scarface.fitness.model.HealthInfo;
import com.scarface.fitness.model.User;
import com.scarface.fitness.service.HealthInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/health-info")
@RequiredArgsConstructor
public class HealthInfoController {

    private final HealthInfoService healthInfoService;

    @GetMapping
    public ResponseEntity<HealthInfo> getHealthInfo(@AuthenticationPrincipal User user) {
        HealthInfo healthInfo = healthInfoService.getHealthInfoByUserId(user.getId());
        return ResponseEntity.ok(healthInfo);
    }

    @PostMapping
    public ResponseEntity<HealthInfo> saveHealthInfo(
            @AuthenticationPrincipal User user,
            @RequestBody HealthInfoRequest request) {
        HealthInfo savedHealthInfo = healthInfoService.saveOrUpdateHealthInfo(user.getId(), request);
        return ResponseEntity.ok(savedHealthInfo);
    }
}
