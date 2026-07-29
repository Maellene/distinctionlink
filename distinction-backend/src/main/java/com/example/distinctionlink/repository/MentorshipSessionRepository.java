package com.example.distinctionlink.repository;

import com.example.distinctionlink.model.MentorshipSession;
import com.example.distinctionlink.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MentorshipSessionRepository extends JpaRepository<MentorshipSession, Long> {
    List<MentorshipSession> findByStudent(User student);
    List<MentorshipSession> findByMentor(User mentor);
}