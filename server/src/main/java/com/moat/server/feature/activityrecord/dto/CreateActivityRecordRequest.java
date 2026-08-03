package com.moat.server.feature.activityrecord.dto;

import java.time.LocalDate;
import java.util.UUID;

import com.moat.server.feature.activityrecord.TimeOfDay;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record CreateActivityRecordRequest(
                @NotNull UUID activityId,
                @NotNull LocalDate date,
                @Positive Integer durationMinutes,
                TimeOfDay timeOfDay,
                String description) {
}
