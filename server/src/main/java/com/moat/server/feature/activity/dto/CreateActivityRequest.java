package com.moat.server.feature.activity.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateActivityRequest(
        @NotBlank @Size(max = 255) String name,

        String description) {
}