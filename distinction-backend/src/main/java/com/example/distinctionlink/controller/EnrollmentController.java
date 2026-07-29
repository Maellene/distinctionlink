package com.example.distinctionlink.controller;

import com.example.distinctionlink.model.Enrollment;
import com.example.distinctionlink.service.EnrollmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/enrollments")
@RequiredArgsConstructor
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    @PostMapping
    public ResponseEntity<Enrollment> enroll(@RequestBody Map<String, Long> body) {
        return ResponseEntity.ok(
                enrollmentService.enroll(body.get("studentId"), body.get("courseId")));
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Enrollment>> getByStudent(@PathVariable Long studentId) {
        return ResponseEntity.ok(enrollmentService.getEnrollmentsByStudent(studentId));
    }

    @PatchMapping("/{id}/progress")
    public ResponseEntity<Enrollment> updateProgress(
            @PathVariable Long id,
            @RequestBody Map<String, Integer> body) {
        return ResponseEntity.ok(enrollmentService.updateProgress(id, body.get("progress")));
    }
}