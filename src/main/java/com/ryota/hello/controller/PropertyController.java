package com.ryota.hello.controller;

import com.ryota.hello.api.ApiResponse;
import com.ryota.hello.dto.PropertyCreateRequest;
import com.ryota.hello.dto.PropertyResponse;
import com.ryota.hello.service.PropertyService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/properties")
@RequiredArgsConstructor
public class PropertyController {

    private final PropertyService service;

    @GetMapping
    public ApiResponse<List<PropertyResponse>> getAll() {
        return ApiResponse.success(service.getAll());
    }

    @GetMapping("/{id}")
    public ApiResponse<PropertyResponse> get(@PathVariable Long id) {
        return ApiResponse.success(service.get(id));
    }

    @PostMapping
    public ApiResponse<PropertyResponse> create(@RequestBody PropertyCreateRequest req) {
        return ApiResponse.success(service.create(req));
    }

    @PutMapping("/{id}")
    public ApiResponse<PropertyResponse> update(
            @PathVariable Long id,
            @RequestBody PropertyCreateRequest req) {

        return ApiResponse.success(service.update(id, req));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {

        service.delete(id);
        return ApiResponse.success(null);
    }

}