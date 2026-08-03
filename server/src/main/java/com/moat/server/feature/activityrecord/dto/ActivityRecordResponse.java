package com.moat.server.feature.activityrecord.dto;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.UUID;

import com.moat.server.feature.activityrecord.TimeOfDay;

public record ActivityRecordResponse(
        UUID id,
        UUID activityId,
        LocalDate date,
        Integer durationMinutes,
        TimeOfDay timeOfDay,
        String description,
        OffsetDateTime createdAt,
        OffsetDateTime updatedAt) {

}
