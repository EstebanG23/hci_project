package com.example.rator.repositories;

import com.example.rator.models.Professor;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProfessorRepository extends MongoRepository<Professor, String> {

    @Override
    public List<Professor> findAll();

    @Query(value = "{ 'coursesTaught.courseCode' : ?0 }")
    List<Professor> findByCoursesTaughtCourseCodeIgnoreCase(String courseCode);

    public Professor findAllById(String id);
}
