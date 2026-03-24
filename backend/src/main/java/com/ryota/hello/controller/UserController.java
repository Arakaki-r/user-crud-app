package com.ryota.hello.controller;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import com.ryota.hello.service.UserService;
import com.ryota.hello.dto.UserCreateRequest;
import com.ryota.hello.dto.UserResponse;
import com.ryota.hello.dto.UserUpdateRequest;
import com.ryota.hello.api.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;

@CrossOrigin(origins = "http://localhost:5174")
@RestController
@RequestMapping("/users")

public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Operation(summary = "ユーザー一覧取得")
    @GetMapping
    public ApiResponse<Page<UserResponse>> findAll(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(defaultValue = "id") String sortBy,
        @RequestParam(defaultValue = "asc") String direction){

            Sort sort = direction.equalsIgnoreCase("desc")
            ? Sort.by(sortBy).descending()
            : Sort.by(sortBy).ascending();
    
Pageable pageable = PageRequest.of(page, size, sort);

Page<UserResponse> result = userService.findAll(pageable);

return ApiResponse.success(result);
}
    
    @PostMapping
    public ApiResponse<UserResponse> create(
        @Valid @RequestBody UserCreateRequest request) {
        return ApiResponse.success(userService.create(request));
    }

    @PutMapping("/{id}")
    public ApiResponse<UserResponse> update(
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

    @GetMapping("/search")
    public ApiResponse<List<UserResponse>> search(
        @RequestParam(required = false) String name) {
        return ApiResponse.success(userService.searchByName(name));
    }
}