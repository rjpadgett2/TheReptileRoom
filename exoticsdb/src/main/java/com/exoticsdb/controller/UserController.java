package com.exoticsdb.controller;

import com.exoticsdb.models.UserProfile;
import com.exoticsdb.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@EnableGlobalMethodSecurity(prePostEnabled=true)
public class UserController {


    @Autowired
    private UserService userService;

    @RequestMapping(value="/user", method = RequestMethod.GET)
    public List listUser(){
        return userService.findAll();
    }

    @RequestMapping(value = "/user/{id}", method = RequestMethod.PUT)
    public UserProfile update(@PathVariable long id, @RequestBody UserProfile user){
        user.setId(id);
        return userService.save(user);
    }

    @RequestMapping(value = "/user", method = RequestMethod.POST)
    public UserProfile create(@RequestBody UserProfile user){
        return userService.createOrUpdateUser(user);
    }



    @RequestMapping(value = "/user/{id}", method = RequestMethod.GET)
    public UserProfile findOne(@PathVariable long id) {
        return userService.findOne(id);
    }


    @RequestMapping(value = "/user/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable(value = "id") Long id) {
        userService.delete(id);
    }
}
