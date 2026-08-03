package com.moat.server.feature.activityrecord;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import com.moat.server.feature.activityrecord.dto.ActivityRecordResponse;
import com.moat.server.feature.activityrecord.dto.CreateActivityRecordRequest;
import com.moat.server.feature.user.UserService;

@RestController
@RequestMapping("/api/activity-records")
public class ActivityRecordController {
    private final ActivityRecordService activityRecordService;
    private final UserService userService;

    public ActivityRecordController(ActivityRecordService activityRecordService, UserService userService) {
        this.activityRecordService = activityRecordService;
        this.userService = userService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ActivityRecordResponse create(@RequestBody CreateActivityRecordRequest request,
            @AuthenticationPrincipal Jwt jwt) {
        UUID userId = userService.resolveUserId(jwt);
        return activityRecordService.create(userId, request);
    }

    @GetMapping
    public List<ActivityRecordResponse> getAll(@AuthenticationPrincipal Jwt jwt) {
        UUID userId = userService.resolveUserId(jwt);
        return activityRecordService.getAll(userId);
    }

    @GetMapping("/{id}")
    public ActivityRecordResponse getById(@PathVariable UUID id, @AuthenticationPrincipal Jwt jwt) {
        UUID userId = userService.resolveUserId(jwt);
        return activityRecordService.getById(userId, id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID id, @AuthenticationPrincipal Jwt jwt) {
        UUID userId = userService.resolveUserId(jwt);
        activityRecordService.delete(userId, id);
    }
}
