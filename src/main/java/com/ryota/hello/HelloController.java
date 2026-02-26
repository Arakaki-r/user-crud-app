package com.ryota.hello;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;


import com.ryota.hello.dto.UserResponse;
import com.ryota.hello.entity.User;
import com.ryota.hello.service.UserService;

@RestController
@RequestMapping("/users")

public class HelloController {

    private final UserService userService;

    public HelloController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<UserResponse> findAll() {
        return userService.findAll()
            .stream()
            .map(user -> new UserResponse(
                    user.getId(),
                    user.getName(),
                    user.getEmail()))
            .toList();
}
    @PostMapping("/users")
    public User createUser(@RequestBody User user) {
        return userService.save(user);
    }
    @PutMapping("/users/{id}")
public User updateUser(
        @PathVariable Long id,
        @RequestBody User user) {
    return userService.update(id, user);
        }
         @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.delete(id);
    }
    @GetMapping("/users/{id}")
public UserResponse findById(@PathVariable Long id) {

    User user = userService.findById(id);

    return new UserResponse(user.getId(), user.getName(), user.getEmail());
}


}
