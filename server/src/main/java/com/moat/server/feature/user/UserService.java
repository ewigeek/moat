package com.moat.server.feature.user;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public User getOrCreate(UUID keycloakId) {
        return userRepository.findByKeycloakId(keycloakId)
                .orElseGet(() -> {
                    var user = new User();
                    user.setKeycloakId(keycloakId);
                    return userRepository.save(user);
                });
    }
}