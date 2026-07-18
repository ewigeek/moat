package com.moat.server.feature.activity;

import com.moat.server.feature.activity.dto.ActivityResponse;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface ActivityMapper {

    ActivityResponse toResponse(Activity activity);
}