package com.exoticsdb.service.impl;

import com.exoticsdb.models.UserProfile;
import com.exoticsdb.repositories.UserRepository;
import com.exoticsdb.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service(value = "userService")
public class UserServiceImpl implements UserService, UserDetailsService {

    @Autowired
    private UserRepository userDao;

    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        UserProfile user = userDao.findByUsername(userId);
        if(user == null){
            throw new UsernameNotFoundException("Invalid username or password.");
        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), getAuthority());
    }

    private List<SimpleGrantedAuthority> getAuthority() {
        return Arrays.asList(new SimpleGrantedAuthority("ROLE_ADMIN"));
    }

    public List<UserProfile> findAll() {
        List<UserProfile> list = new ArrayList<>();
        userDao.findAll().iterator().forEachRemaining(list::add);
        return list;
    }

    @Override
    public UserProfile findOne(long id) {
        return userDao.findById(id).get();
    }

    @Override
    public void delete(long id) {
        userDao.deleteById(id);
    }

    @Override
    public UserProfile save(UserProfile user) {
        return userDao.save(user);
    }

    @Override
    public UserProfile createOrUpdateUser(UserProfile entity) {

        Optional<UserProfile> userProfile = userDao.findById(entity.getId());

        UserProfile newUser = new UserProfile();
        newUser.setUsername(entity.getUsername());
        newUser.setFirstName(entity.getFirstName());
        newUser.setLastName(entity.getLastName());
        newUser.setPassword(BCrypt.hashpw(entity.getPassword(), BCrypt.gensalt()));
        newUser.setEmail(entity.getEmail());
        entity = userDao.save(newUser);
        return  entity;


    }


}
