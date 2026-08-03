package com.moat.server.feature.activityrecord;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import com.moat.server.feature.activityrecord.dto.ActivityRecordResponse;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface ActivityRecordMapper {
    ActivityRecordResponse toResponse(ActivityRecord activityRecord);
}
