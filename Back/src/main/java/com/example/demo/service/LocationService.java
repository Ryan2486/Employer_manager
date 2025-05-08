package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.model.LocationModel;
import com.example.demo.repository.LocationRepository;

@Service
public class LocationService {

    private final LocationRepository locationRepository;

    public LocationService(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    public List<LocationModel> findAll() {
        return locationRepository.findAll();
    }

    public Optional<LocationModel> findById(String id) {
        return locationRepository.findById(id);
    }

    public LocationModel save(LocationModel locationmodel) {
        return locationRepository.save(locationmodel);
    }

    public void deleteById(String id) {
        locationRepository.deleteById(id);
    }
}
