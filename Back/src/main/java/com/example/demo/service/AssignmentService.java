package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.model.AssignmentModel;
import com.example.demo.repository.AssignmentRepository;

@Service
public class AssignmentService {

    private final AssignmentRepository assignmentRepository;

    public AssignmentService(AssignmentRepository assignmentRepository) {
        this.assignmentRepository = assignmentRepository;
    }

    public List<AssignmentModel> findAll() {
        return assignmentRepository.findAll();
    }

    public Optional<AssignmentModel> findById(Long id) {
        return assignmentRepository.findById(id);
    }

    public AssignmentModel save(AssignmentModel AssignmentModel) {
        return assignmentRepository.save(AssignmentModel);
    }

    public void deleteById(Long id) {
        assignmentRepository.deleteById(id);
    }
}
