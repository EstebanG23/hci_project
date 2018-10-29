package com.example.rator.repositories;

import com.example.rator.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    @Override
    public List<User> findAll();

    public User findAllById(String id);
 }
