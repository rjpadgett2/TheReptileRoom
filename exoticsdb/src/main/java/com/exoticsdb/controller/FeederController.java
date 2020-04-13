package com.exoticsdb.controller;

import com.exoticsdb.exceptions.RecordNotFoundException;
import com.exoticsdb.models.Feeder;
import com.exoticsdb.repositories.FeedersRepository;
import com.exoticsdb.repositories.ReptileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/reptiles")
public class FeederController {

    @Autowired
    private FeedersRepository feederRepository;

    @Autowired
    private ReptileRepository reptileRepository;

    @GetMapping("/{reptileId}/feeder")
    public List< Feeder > getFeedersByReptile(@PathVariable(value = "reptileId") Long reptileId) {
        return feederRepository.findByReptileId(reptileId);
    }

    @PostMapping("/{reptileId}/feeder")
    public Feeder createFeeder(@PathVariable(value = "reptileId") Long reptileId,
                               @RequestBody Feeder feeder) throws RecordNotFoundException {
        return reptileRepository.findById(reptileId).map(reptile -> {
                feeder.setReptile(reptile);
        return feederRepository.save(feeder);
        }).orElseThrow(() -> new RecordNotFoundException("Reptile not found"));
    }

    @PutMapping("/{reptileId}/feeder/{feederId}")
    public Feeder updateCourse(@PathVariable(value = "reptileId") Long instructorId,
                               @PathVariable(value = "feederId") Long feederId, @Valid @RequestBody Feeder feederRequest)
            throws RecordNotFoundException {
        if (!reptileRepository.existsById(instructorId)) {
            throw new RecordNotFoundException("instructorId not found");
        }

        return feederRepository.findById(feederId).map(feeder -> {
                feeder.setId(feederRequest.getId());
        return feederRepository.save(feeder);
        }).orElseThrow(() -> new RecordNotFoundException("course id not found"));
    }

    @DeleteMapping("/{reptileId}/feeder/{feederId}")
    public ResponseEntity <?> deleteFeeder(@PathVariable(value = "reptileId") Long reptileId,
                                              @PathVariable(value = "feederId") Long feederId) throws RecordNotFoundException {
        return feederRepository.findByIdAndReptileId(feederId, reptileId).map(feeder -> {
                feederRepository.delete(feeder);
        return ResponseEntity.ok().build();
        }).orElseThrow(() -> new RecordNotFoundException(
                "Course not found with id " + feederId + " and instructorId " + reptileId));
    }


}
