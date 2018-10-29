package com.example.rator.repositories;

import com.example.rator.models.ProfCourse;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfCourseRepository extends MongoRepository<ProfCourse, String> {
}
