package com.exoticsdb.service;

import com.exoticsdb.models.UserProfile;
import com.exoticsdb.repositories.UserRepository;
import com.exoticsdb.service.UserService;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.ui.ModelMap;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service(value = "userService")
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userDao;

    private List<SimpleGrantedAuthority> getAuthority() {
        return Arrays.asList(new SimpleGrantedAuthority("ROLE_ADMIN"));
    }

    public List<UserProfile> findAll() {
        List<UserProfile> list = new ArrayList<>();
        userDao.findAll().iterator().forEachRemaining(list::add);
        return list;
    }

    @Override
    public String getCurrentUser(ModelMap model) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String name = auth.getName(); //get logged in username

        model.addAttribute("username", name);
        return "hello";
    }

    @Override
    public UserProfile findOne(String id) {
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

//        Optional<UserProfile> userProfile = userDao.findById(entity.getId());

        UserProfile newUser = new UserProfile();
        newUser.setId(entity.getId());
        newUser.setUsername(entity.getUsername());
        newUser.setFirstName(entity.getFirstName());
        newUser.setLastName(entity.getLastName());
        newUser.setPassword(BCrypt.hashpw(entity.getPassword(), BCrypt.gensalt()));
        newUser.setEmail(entity.getEmail());
        entity = userDao.save(newUser);
        return  entity;


    }


}
