package com.ryota.hello.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.ryota.hello.entity.User;
import com.ryota.hello.repository.UserRepository;
import com.ryota.hello.exception.ResourceNotFoundException;
import com.ryota.hello.dto.UserCreateRequest;
import com.ryota.hello.dto.UserResponse;
import com.ryota.hello.dto.UserUpdateRequest;
import com.ryota.hello.mapper.UserMapper;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public Page<UserResponse> findAll(Pageable pageable) {
        return userRepository.findAll(pageable)
        .map(UserMapper::toResponse);
    }
     // 作成
    @Transactional
    public UserResponse create(UserCreateRequest request) {
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());

        User saved = userRepository.save(user);

        return UserMapper.toResponse(saved);
    }

    // 更新
    @Transactional
    public UserResponse update(Long id, UserUpdateRequest request) {
        User existing = userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found with id: " + id));

        existing.setName(request.getName());
        existing.setEmail(request.getEmail());
        return UserMapper.toResponse(existing);
    }

    // 削除
    @Transactional
    public void delete(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found with id: " + id));

        userRepository.delete(user);
    }

    // 1件取得（Response用）
    @Transactional(readOnly = true)
    public UserResponse findByIdResponse(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found with id: " + id));

        return UserMapper.toResponse(user);
    }

    public List<UserResponse> searchByName(String name) {
        return userRepository.findByNameContaining(name)
        .stream()
        .map(UserMapper::toResponse)
        .toList();
    }
}