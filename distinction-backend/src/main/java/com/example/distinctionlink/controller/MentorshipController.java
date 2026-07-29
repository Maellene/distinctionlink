package com.example.distinctionlink.controller;

import com.example.distinctionlink.model.MentorshipSession;
import com.example.distinctionlink.model.User;
import com.example.distinctionlink.service.MentorshipService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/mentorship")
@RequiredArgsConstructor
public class MentorshipController {

    private final MentorshipService mentorshipService;

    @GetMapping("/mentors")
    public ResponseEntity<List<User>> getMentors() {
        return ResponseEntity.ok(mentorshipService.getAllMentors());
    }

    @PostMapping("/sessions")
    public ResponseEntity<MentorshipSession> bookSession(@RequestBody Map<String, Object> body) {
        Long studentId   = Long.valueOf(body.get("studentId").toString());
        Long mentorId    = Long.valueOf(body.get("mentorId").toString());
        String topic     = body.get("topic").toString();
        LocalDateTime at = LocalDateTime.parse(body.get("scheduledAt").toString());
        return ResponseEntity.ok(
                mentorshipService.bookSession(studentId, mentorId, topic, at));
    }

    @GetMapping("/sessions/student/{studentId}")
    public ResponseEntity<List<MentorshipSession>> getStudentSessions(
            @PathVariable Long studentId) {
        return ResponseEntity.ok(mentorshipService.getSessionsByStudent(studentId));
    }

    @GetMapping("/sessions/mentor/{mentorId}")
    public ResponseEntity<List<MentorshipSession>> getMentorSessions(
            @PathVariable Long mentorId) {
        return ResponseEntity.ok(mentorshipService.getSessionsByMentor(mentorId));
    }
}