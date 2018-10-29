package com.example.rator.repositories;

import com.example.rator.models.Evaluation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EvaluationRepository extends MongoRepository<Evaluation, String> {

    @Override
    public List<Evaluation> findAll();

    public Evaluation findAllById(String id);

    @Query(value = "{ 'courseCode' : ?0, 'professorId' : ?1 }")
    public Evaluation findByCourseCodeAndProfessorId(String courseCode, String professorId);
}
