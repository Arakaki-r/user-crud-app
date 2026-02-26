package com.ryota.hello.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ryota.hello.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
}
