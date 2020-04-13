package com.exoticsdb.service;

import com.exoticsdb.models.UserProfile;

import java.util.List;

public interface UserService {

    UserProfile save(UserProfile user);
    List<UserProfile> findAll();
    UserProfile findOne(long id);
    UserProfile createOrUpdateUser(UserProfile user);
    void delete(long id);
}
