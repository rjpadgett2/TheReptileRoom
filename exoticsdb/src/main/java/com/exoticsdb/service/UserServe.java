package com.exoticsdb.service;

import com.exoticsdb.exceptions.RecordNotFoundException;
import com.exoticsdb.models.UserProfile;
import com.exoticsdb.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class UserServe {

    @Autowired
    UserRepository userRepository;

    public List<UserProfile> getAllUsers() {
        List<UserProfile> userProfileList = userRepository.findAll();

        if(userProfileList.size() > 0) {
            return userProfileList;
        } else {
            return new ArrayList<UserProfile>();
        }
    }

    public UserProfile getOneUser(Long id) throws RecordNotFoundException {
        Optional<UserProfile> userProfile = userRepository.findById(id);

        if(userProfile.isPresent()) {
            return userProfile.get();
        } else {
            throw new RecordNotFoundException("No Reptile exist for given id");
        }
    }

    public UserProfile createOrUpdateUser(UserProfile entity) throws RecordNotFoundException {

        Optional<UserProfile> userProfile = userRepository.findById(entity.getId());

        if(userProfile.isPresent()) {
            UserProfile newUser = userProfile.get();
            newUser.setUsername(entity.getUsername());
            newUser.setFirstName(entity.getFirstName());
            newUser.setLastName(entity.getLastName());
            newUser.setPassword(entity.getPassword());

            return  newUser;
        } else {

            entity = userRepository.save((entity));
            return entity;
        }

    }

    public void deleteUserById(Long id) throws RecordNotFoundException {

        Optional<UserProfile> userProfile = userRepository.findById(id);

        if(userProfile.isPresent()) {
            userRepository.deleteById(id);
        } else {
            throw new RecordNotFoundException("No Reptile found for given id");
        }

    }

    public void deleteAllReptiles() throws RecordNotFoundException {
        userRepository.deleteAll();
    }
}
