package com.ryota.hello.mapper;

import com.ryota.hello.entity.User;
import com.ryota.hello.dto.UserResponse;

public class UserMapper {

    public static UserResponse toResponse(User user) {
        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail()
        );
    }

}