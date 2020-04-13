package com.exoticsdb.controller;

import com.exoticsdb.exceptions.RecordNotFoundException;
import com.exoticsdb.models.Reptile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.exoticsdb.service.ReptileService;

import java.util.List;

@RestController
@RequestMapping("/reptiles")
public class ReptileController {

    @Autowired
    ReptileService service;

    @GetMapping
    public ResponseEntity<List<Reptile>> getAllReptiles() {

        List<Reptile> reptile = service.getAllReptile();

        return new ResponseEntity<>(reptile, new HttpHeaders(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reptile> getReptileById(@PathVariable("id") long id) throws RecordNotFoundException {

        Reptile reptile = service.getReptileById(id);

        return new ResponseEntity<>(reptile, new HttpHeaders(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Reptile> createOrUpdateReptile(@RequestBody Reptile reptile) throws RecordNotFoundException {

        Reptile updated = service.createOrUpdateReptile(reptile);

        return new ResponseEntity<>(updated, new HttpHeaders(), HttpStatus.CREATED);

    }

    @DeleteMapping("/id")
    public HttpStatus deleteReptileById(@PathVariable("id") long id) throws RecordNotFoundException {

        service.deleteReptileById(id);
        return HttpStatus.FORBIDDEN;
    }

    @DeleteMapping
    public HttpStatus deleteAllReptiles() throws RecordNotFoundException {
        service.deleteAllReptiles();
        return HttpStatus.FORBIDDEN;
    }


}
