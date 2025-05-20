
package com.scarface.fitness.repository;

import com.scarface.fitness.model.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepository extends JpaRepository<Profile, String> {
}
