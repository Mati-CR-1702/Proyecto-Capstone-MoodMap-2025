package com.springboot.springboot_chatgpt.repository;

import com.springboot.springboot_chatgpt.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository  extends JpaRepository<User, Integer> {
    User findByUsername(String username);
}
