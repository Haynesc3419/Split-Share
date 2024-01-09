package com.backend.controllers.user;

import com.backend.domain.LoginRequest;
import com.backend.models.User;
import com.backend.repositories.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @GetMapping("api/user/{id}")
    public User getUserById(@PathVariable String id) {
        return userRepository.findUserById(id);
    }

    @PostMapping("api/user/authenticate")
    public User authenticateUser(@RequestBody LoginRequest loginRequest) {
        User user = userRepository.findUserByUsername(loginRequest.getUsername());
        if (user.getPassword().equals(loginRequest.getPassword())) {
            return user;
        } else {
            return null;
        }
    }

    @PostMapping("api/user/register")
    public User registerUser(@RequestBody User user) {
        user.resolveUserData();
        userRepository.save(user);
        return userRepository.findUserByUsername(user.getUsername());
    }

    @GetMapping("api/user/exists/{username}")
    public boolean existsByUsername(@PathVariable String username) {
        return userRepository.existsByUsername(username);
    }
}