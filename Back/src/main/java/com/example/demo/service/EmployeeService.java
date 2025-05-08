package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.model.EmployeeModel;
import com.example.demo.repository.EmployeeRepository;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public List<EmployeeModel> findAll() {
        return employeeRepository.findAll();
    }

    public Optional<EmployeeModel> findById(String id) {
        return employeeRepository.findById(id);
    }

    public EmployeeModel save(EmployeeModel employeemodel) {
        return employeeRepository.save(employeemodel);
    }

    public void deleteById(String id) {
        employeeRepository.deleteById(id);
    }
}
