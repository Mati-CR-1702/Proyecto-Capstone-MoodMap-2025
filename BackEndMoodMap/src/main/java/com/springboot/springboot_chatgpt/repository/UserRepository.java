//C:\Users\fabio\OneDrive\Escritorio\Proyecto-Capstone-MoodMap-2025-main\Fase 2\Evidencias Proyecto MoodMap\BackEndMoodMap\src\main\java\com\springboot\springboot_chatgpt\repository\UserRepository.java

package com.springboot.springboot_chatgpt.repository;

import com.springboot.springboot_chatgpt.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository  extends JpaRepository<User, Integer> {
    User findByUsername(String username);
}
