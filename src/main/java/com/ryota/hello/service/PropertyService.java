package com.ryota.hello.service;

import com.ryota.hello.dto.PropertyCreateRequest;
import com.ryota.hello.dto.PropertyResponse;
import com.ryota.hello.entity.Property;
import com.ryota.hello.entity.User;
import com.ryota.hello.mapper.PropertyMapper;
import com.ryota.hello.repository.PropertyRepository;
import com.ryota.hello.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PropertyService {

    private final PropertyRepository propertyRepository;
    private final UserRepository userRepository;
    private final PropertyMapper mapper;

    public List<PropertyResponse> getAll() {

        return propertyRepository.findAll()
                .stream()
                .map(mapper::toResponse)
                .collect(Collectors.toList());
    }

    public PropertyResponse get(Long id) {

        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        return mapper.toResponse(property);
    }

    public PropertyResponse create(PropertyCreateRequest req) {

        User owner = userRepository.findById(req.getOwnerId())
                .orElseThrow(() -> new RuntimeException("Owner not found"));

        Property property = new Property();

        property.setName(req.getName());
        property.setAddress(req.getAddress());
        property.setRent(req.getRent());
        property.setStatus(req.getStatus());
        property.setOwner(owner);

        return mapper.toResponse(propertyRepository.save(property));
    }

    public PropertyResponse update(Long id, PropertyCreateRequest req) {

        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        property.setName(req.getName());
        property.setAddress(req.getAddress());
        property.setRent(req.getRent());
        property.setStatus(req.getStatus());

        return mapper.toResponse(propertyRepository.save(property));
    }

    public void delete(Long id) {
        propertyRepository.deleteById(id);
    }

}