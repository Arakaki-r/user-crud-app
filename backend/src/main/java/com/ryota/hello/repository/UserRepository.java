package com.ryota.hello.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ryota.hello.entity.User;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByNameContaining(String name);
}
