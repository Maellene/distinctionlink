package com.example.distinctionlink.service;

import com.example.distinctionlink.model.*;
import com.example.distinctionlink.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final NotificationRepository notificationRepository;

    public Enrollment enroll(Long studentId, Long courseId) {
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        if (enrollmentRepository.existsByStudentAndCourse(student, course)) {
            throw new RuntimeException("Already enrolled in this course");
        }

        Enrollment enrollment = Enrollment.builder()
                .student(student)
                .course(course)
                .progress(0)
                .build();

        Enrollment saved = enrollmentRepository.save(enrollment);

        Notification notification = Notification.builder()
                .user(student)
                .message("You have successfully enrolled in: " + course.getTitle())
                .build();
        notificationRepository.save(notification);

        return saved;
    }

    public List<Enrollment> getEnrollmentsByStudent(Long studentId) {
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        return enrollmentRepository.findByStudent(student);
    }

    public Enrollment updateProgress(Long enrollmentId, Integer progress) {
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));

        enrollment.setProgress(progress);
        if (progress >= 100) {
            enrollment.setCompleted(true);
            Notification notification = Notification.builder()
                    .user(enrollment.getStudent())
                    .message("Congratulations! You completed: "
                            + enrollment.getCourse().getTitle())
                    .build();
            notificationRepository.save(notification);
        }
        return enrollmentRepository.save(enrollment);
    }
}