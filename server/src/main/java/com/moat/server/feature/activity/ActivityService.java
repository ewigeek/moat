package com.moat.server.feature.activity;

import com.moat.server.feature.activity.dto.ActivityResponse;
import com.moat.server.feature.activity.dto.CreateActivityRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class ActivityService {

    private final ActivityRepository activityRepository;
    private final ActivityMapper activityMapper;

    public ActivityService(ActivityRepository activityRepository, ActivityMapper activityMapper) {
        this.activityRepository = activityRepository;
        this.activityMapper = activityMapper;
    }

    @Transactional(readOnly = true)
    public List<ActivityResponse> getAll(UUID userId) {
        return activityRepository.findAllByUserId(userId)
                .stream()
                .map(activityMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public ActivityResponse getById(UUID id, UUID userId) {
        return activityRepository.findByIdAndUserId(id, userId)
                .map(activityMapper::toResponse)
                .orElseThrow(() -> new RuntimeException("Activity not found"));
    }

    @Transactional
    public ActivityResponse create(CreateActivityRequest request, UUID userId) {
        var activity = new Activity();
        activity.setUserId(userId);
        activity.setName(request.name());
        activity.setDescription(request.description());
        return activityMapper.toResponse(activityRepository.save(activity));
    }

    @Transactional
    public void delete(UUID id, UUID userId) {
        var activity = activityRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new RuntimeException("Activity not found"));
        activityRepository.delete(activity);
    }
}