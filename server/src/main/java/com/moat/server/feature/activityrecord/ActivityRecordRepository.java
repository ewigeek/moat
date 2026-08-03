package com.moat.server.feature.activityrecord;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityRecordRepository extends JpaRepository<ActivityRecord, UUID> {

    List<ActivityRecord> findAllByUserId(UUID userId);

    Optional<ActivityRecord> findByIdAndUserId(UUID id, UUID userId);

    List<ActivityRecord> findAllByActivityIdAndUserId(UUID activityId, UUID userId);

}
