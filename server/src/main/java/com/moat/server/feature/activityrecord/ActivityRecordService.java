package com.moat.server.feature.activityrecord;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.moat.server.feature.activityrecord.dto.ActivityRecordResponse;
import com.moat.server.feature.activityrecord.dto.CreateActivityRecordRequest;
import com.moat.server.shared.exception.ResourceNotFoundException;

import org.springframework.transaction.annotation.Transactional;

@Service
public class ActivityRecordService {
    private final ActivityRecordRepository activityRecordRepository;
    private final ActivityRecordMapper activityRecordMapper;

    public ActivityRecordService(ActivityRecordRepository activityRecordRepository,
            ActivityRecordMapper activityRecordMapper) {
        this.activityRecordRepository = activityRecordRepository;
        this.activityRecordMapper = activityRecordMapper;
    }

    @Transactional
    public ActivityRecordResponse create(UUID userId, CreateActivityRecordRequest request) {
        var activityRecord = new ActivityRecord();
        activityRecord.setActivityId(request.activityId());
        activityRecord.setUserId(userId);
        activityRecord.setDate(request.date());
        activityRecord.setDurationMinutes(request.durationMinutes());
        activityRecord.setTimeOfDay(request.timeOfDay());
        activityRecord.setDescription(request.description());
        return activityRecordMapper.toResponse(activityRecordRepository.save(activityRecord));
    }

    @Transactional(readOnly = true)
    public List<ActivityRecordResponse> getAll(UUID userId) {
        return activityRecordRepository.findAllByUserId(userId)
                .stream()
                .map(activityRecordMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public ActivityRecordResponse getById(UUID userId, UUID activityRecordId) {
        var activityRecord = activityRecordRepository.findByIdAndUserId(activityRecordId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Activity record not found"));
        return activityRecordMapper.toResponse(activityRecord);
    }

    @Transactional
    public void delete(UUID userId, UUID activityRecordId) {
        var activityRecord = activityRecordRepository.findByIdAndUserId(activityRecordId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Activity record not found"));
        activityRecordRepository.delete(activityRecord);
    }
}
