package com.exoticsdb.service;

import com.exoticsdb.exceptions.RecordNotFoundException;
import com.exoticsdb.models.Reptile;
import com.exoticsdb.repositories.ReptileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReptileService {

    @Autowired
    ReptileRepository reptileRepository;

    public List<Reptile> getAllReptile() {

        List<Reptile> reptileList = reptileRepository.findAll();

        if(reptileList.size() > 0) {
            return reptileList;
        } else {
            return new ArrayList<Reptile>();
        }
    }

    public Reptile getReptileById(Long id) throws RecordNotFoundException {

        Optional<Reptile> reptile = reptileRepository.findById(id);

        if(reptile.isPresent()) {
            return reptile.get();
        } else {
            throw new RecordNotFoundException("No Reptile exist for given id");
        }

    }

    public Reptile createOrUpdateReptile(Reptile entity) throws RecordNotFoundException {

        Optional<Reptile> reptile = reptileRepository.findById(entity.getId());

        if(reptile.isPresent()) {
            Reptile newReptile = reptile.get();
            newReptile.setBreeder(entity.isBreeder());
            newReptile.setNickName(entity.getNickName());
            newReptile.setAge(entity.getAge());
            newReptile.setLength(entity.getLength());
            newReptile.setScientificName(entity.getScientificName());
            newReptile.setPurchaseDate((entity.getPurchaseDate()));
            newReptile.setShed(entity.isShed());
            newReptile.setWeight(entity.getWeight());
            newReptile.setWeight(entity.getWeight());

            return  newReptile;
        } else {

            entity = reptileRepository.save((entity));
            return entity;
        }



    }

    public void deleteReptileById(Long id) throws RecordNotFoundException {

        Optional<Reptile> reptile = reptileRepository.findById(id);

        if(reptile.isPresent()) {
            reptileRepository.deleteById(id);
        } else {
            throw new RecordNotFoundException("No Reptile found for given id");
        }

    }

    public void deleteAllReptiles() throws RecordNotFoundException {
         reptileRepository.deleteAll();
    }


}
