package com.ryota.hello;

import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.ryota.hello.service.UserService;
import com.ryota.hello.dto.UserCreateRequest;
import com.ryota.hello.dto.UserResponse;
import com.ryota.hello.dto.UserUpdateRequest;
import com.ryota.hello.api.ApiResponse;


@RestController
@RequestMapping("/users")

public class HelloController {

    private final UserService userService;

    public HelloController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ApiResponse<Page<UserResponse>> findAll(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size){

    Pageable pageable = PageRequest.of(page, size);
    return ApiResponse.success(userService.findAll(pageable));
    }
    
    @PostMapping
    public ApiResponse<UserResponse> createUser(
        @Valid @RequestBody UserCreateRequest request) {
        return ApiResponse.success(userService.create(request));
    }

    @PutMapping("/{id}")
    public ApiResponse<UserResponse> updateUser(
        @PathVariable Long id,
        @Valid @RequestBody UserUpdateRequest request) {
        return ApiResponse.success(userService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        userService.delete(id);
        return ApiResponse.success(null);
    }

    @GetMapping("/{id}")
    public ApiResponse<UserResponse> findById(@PathVariable Long id) {
        return ApiResponse.success(userService.findByIdResponse(id));
    }
    
}