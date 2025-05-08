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

import com.example.demo.model.LocationModel;
import com.example.demo.service.LocationService;

@RestController
@RequestMapping("/api/locations")
public class LocationController {

    private final LocationService locationService;

    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    @GetMapping
    public ResponseEntity<List<LocationModel>> getAllLocations() {
        return ResponseEntity.ok(locationService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LocationModel> getLocationById(@PathVariable String id) {
        return locationService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<LocationModel> createLocation(@RequestBody LocationModel locationmodel) {
        LocationModel savedLocation = locationService.save(locationmodel);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedLocation);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LocationModel> updateLocation(@PathVariable String id,
            @RequestBody LocationModel locationmodel) {
        if (!locationService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        locationmodel.setLocation_id(id);
        return ResponseEntity.ok(locationService.save(locationmodel));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLocation(@PathVariable String id) {
        if (!locationService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        locationService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
