package com.moat.server.feature.activity;

import com.moat.server.feature.activity.dto.ActivityResponse;
import com.moat.server.feature.activity.dto.CreateActivityRequest;
import com.moat.server.feature.user.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/activities")
public class ActivityController {

    private final ActivityService activityService;
    private final UserService userService;

    public ActivityController(ActivityService activityService, UserService userService) {
        this.activityService = activityService;
        this.userService = userService;
    }

    @GetMapping
    public List<ActivityResponse> getAll(@AuthenticationPrincipal Jwt jwt) {
        UUID userId = resolveUserId(jwt);
        return activityService.getAll(userId);
    }

    @GetMapping("/{id}")
    public ActivityResponse getById(@PathVariable UUID id, @AuthenticationPrincipal Jwt jwt) {
        UUID userId = resolveUserId(jwt);
        return activityService.getById(id, userId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ActivityResponse create(@Valid @RequestBody CreateActivityRequest request,
            @AuthenticationPrincipal Jwt jwt) {
        UUID userId = resolveUserId(jwt);
        return activityService.create(request, userId);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID id, @AuthenticationPrincipal Jwt jwt) {
        UUID userId = resolveUserId(jwt);
        activityService.delete(id, userId);
    }

    private UUID resolveUserId(Jwt jwt) {
        UUID keycloakId = UUID.fromString(jwt.getSubject());
        return userService.getOrCreate(keycloakId).getId();
    }
}