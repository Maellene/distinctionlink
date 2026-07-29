package com.example.distinctionlink.service;

import com.example.distinctionlink.model.*;
import com.example.distinctionlink.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MentorshipService {

    private final MentorshipSessionRepository sessionRepository;
    private final UserRepository userRepository;
    private final NotificationRepository notificationRepository;

    public List<User> getAllMentors() {
        return userRepository.findByRole(User.Role.MENTOR);
    }

    public MentorshipSession bookSession(Long studentId, Long mentorId,
                                         String topic, LocalDateTime scheduledAt) {
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        User mentor = userRepository.findById(mentorId)
                .orElseThrow(() -> new RuntimeException("Mentor not found"));

        MentorshipSession session = MentorshipSession.builder()
                .student(student)
                .mentor(mentor)
                .topic(topic)
                .scheduledAt(scheduledAt)
                .status(MentorshipSession.Status.CONFIRMED)
                .build();

        MentorshipSession saved = sessionRepository.save(session);

        notificationRepository.save(Notification.builder()
                .user(student)
                .message("Your session with " + mentor.getName() + " is booked for " + scheduledAt)
                .build());

        notificationRepository.save(Notification.builder()
                .user(mentor)
                .message("New session request from " + student.getName() + " — topic: " + topic)
                .build());

        return saved;
    }

    public List<MentorshipSession> getSessionsByStudent(Long studentId) {
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        return sessionRepository.findByStudent(student);
    }

    public List<MentorshipSession> getSessionsByMentor(Long mentorId) {
        User mentor = userRepository.findById(mentorId)
                .orElseThrow(() -> new RuntimeException("Mentor not found"));
        return sessionRepository.findByMentor(mentor);
    }
}