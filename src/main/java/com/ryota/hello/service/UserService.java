package com.ryota.hello.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ryota.hello.entity.User;
import com.ryota.hello.repository.UserRepository;
import com.ryota.hello.exception.ResourceNotFoundException;


@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> findAll() {
        return userRepository.findAll();
        
    }
    public User save(User user) {
    return userRepository.save(user);
    }
    public User update(Long id, User user) {
        User existing = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        existing.setName(user.getName());
        existing.setEmail(user.getEmail());

        return userRepository.save(existing);
    }
     public void delete(Long id) {
        userRepository.deleteById(id);
    }

    public User findById(Long id) {
    return userRepository.findById(id)
            .orElseThrow(() ->
                    new ResourceNotFoundException("User not found with id: " + id));
                    
    }
}
