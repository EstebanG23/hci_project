package com.example.rator.controllers;

import com.example.rator.models.ProfCourse;
import com.example.rator.repositories.EvaluationRepository;
import com.example.rator.repositories.ProfCourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/professor-course")
public class ProfCourseController {

    @Autowired
    ProfCourseRepository profCourseRepository;

    @Autowired
    EvaluationRepository evaluationRepository;

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<ProfCourse> createProfCourse(@RequestBody ProfCourse profCourse) {
        profCourseRepository.save(profCourse);
        evaluationRepository.save(profCourse.getEvaluation());
        return new ResponseEntity<ProfCourse>(profCourse, HttpStatus.CREATED);
    }
}
