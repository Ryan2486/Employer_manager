package com.example.demo.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.AssignmentModel;
import com.example.demo.service.AssignmentService;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {

    private final AssignmentService assignmentService;

    public AssignmentController(AssignmentService assignmentService) {
        this.assignmentService = assignmentService;
    }

    @GetMapping
    public ResponseEntity<List<AssignmentModel>> getAllAssignments() {
        return ResponseEntity.ok(assignmentService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssignmentModel> getAssignmentById(@PathVariable Long id) {
        return assignmentService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<AssignmentModel> createAssignment(@RequestBody AssignmentModel assignmentmodel) {
        AssignmentModel savedAssignment = assignmentService.save(assignmentmodel);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedAssignment);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AssignmentModel> updateAssignment(@PathVariable Long id,
            @RequestBody AssignmentModel assignmentmodel) {
        if (!assignmentService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        assignmentmodel.setId(id);
        return ResponseEntity.ok(assignmentService.save(assignmentmodel));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAssignment(@PathVariable Long id) {
        if (!assignmentService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        assignmentService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
