package com.example.rator.controllers;

import com.example.rator.models.Course;
import com.example.rator.models.Evaluation;
import com.example.rator.models.User;
import com.example.rator.repositories.EvaluationRepository;
import com.example.rator.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@Controller
@RequestMapping("/")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    EvaluationRepository evaluationRepository;

    //Creates user
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<User> addUser(@RequestBody User user) {
        //save user
        userRepository.save(user);
        return new ResponseEntity<User>(user, HttpStatus.CREATED);
    }

    //Retrieves all users
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        return new ResponseEntity<List<User>>(users, HttpStatus.OK);
    }

    //PROBLEM: need to keep track of totals for averages
    //Score object or array of averages and array of totals??
    //Updates evaluation based on user's courses' code and course's profId
    @RequestMapping(value = "{userId}/course/{courseCode}/evaluate", method = RequestMethod.PUT)
    public ResponseEntity<Evaluation> updateEvaluation(@PathVariable("userId") String userId,
                                                       @PathVariable("courseCode") String courseCode,
                                                       @RequestBody Evaluation evaluation) {
        User user = userRepository.findAllById(userId);
        String professorId = "";
        for(Course c : user.getCourses()) {
            if(courseCode.equals(c.getCode())) {
                professorId = c.getProfessorId();
                break;
            }
        }
        //Retrieved professor id from course student is taking

        //Find evaluation with specific professor Id and course code and update
        List<Evaluation> evaluations = evaluationRepository.findAll();
        for(Evaluation e : evaluations) {
            if(e.getCourseCode().equals(courseCode) && e.getProfessorId().equals(professorId)) {
                Evaluation eval = evaluationRepository.findAllById(e.getId());
                if(eval.getNumOfEvaluation() == 0) {
                    eval.setNumOfEvaluation(1);
                    eval.setOverall(evaluation.getOverall());
                    eval.setCommunication(evaluation.getCommunication());
                    eval.setDifficulty(evaluation.getDifficulty());
                    eval.setHelpful(evaluation.getHelpful());
                    eval.setInterest(evaluation.getInterest());
                    eval.setOrganization(evaluation.getOrganization());
                }
                else {
                    int total = 2;
                    eval.setCommunication(((eval.getCommunication() + evaluation.getCommunication())/total));
                    eval.setDifficulty(((eval.getDifficulty() + evaluation.getDifficulty())/total));
                    eval.setHelpful(((eval.getHelpful() + evaluation.getHelpful())/total));
                    eval.setInterest(((eval.getInterest() + evaluation.getInterest())/total));
                    eval.setOrganization(((eval.getOrganization() + evaluation.getOrganization())/total));
                    eval.setOverall(((eval.getOverall() + evaluation.getOverall())/total));
                    eval.setNumOfEvaluation(eval.getNumOfEvaluation()+1);
                }
                evaluationRepository.save(eval);
                return new ResponseEntity<Evaluation>(eval, HttpStatus.OK);
            }
        }

        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }

}
