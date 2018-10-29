package com.example.rator.controllers;

import com.example.rator.models.Evaluation;
import com.example.rator.models.ProfCourse;
import com.example.rator.models.Professor;
import com.example.rator.models.ProfessorDto;
import com.example.rator.repositories.EvaluationRepository;
import com.example.rator.repositories.ProfessorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Controller
public class ProfessorController {

    @Autowired
    ProfessorRepository professorRepository;

    @Autowired
    EvaluationRepository evaluationRepository;

    //Creates with professor with empty evaluation in prof course
    @RequestMapping(value = "/professors", method = RequestMethod.POST)
    public ResponseEntity<Professor> createProfessor(@RequestBody Professor professor) {
        professorRepository.save(professor);
        Professor prof = professorRepository.findAllById(professor.getId());
        //Sets courseCode and profId to newly created evaluation
        for(ProfCourse course : prof.getCoursesTaught()) {
            Evaluation evaluation = new Evaluation(course.getCourseCode(), prof.getId(), 0,
                    0, 0, 0, 0, 0, 0);
            course.setEvaluation(evaluation);
            evaluationRepository.save(evaluation);
        }
        professorRepository.save(prof);
        return new ResponseEntity<Professor>(prof, HttpStatus.CREATED);
    }

    //Retrieve all professors
    @RequestMapping(value = "/professors", method = RequestMethod.GET)
    public ResponseEntity<List<Professor>> getAllProfessors() {
        List<Professor> professors = professorRepository.findAll();
        return new ResponseEntity<List<Professor>>(professors, HttpStatus.OK);
    }

    //Retrieve single professor
    @CrossOrigin
    @RequestMapping(value = "/professors/{professorId}", method = RequestMethod.GET)
    public ResponseEntity<Professor> getProfessor(@PathVariable("professorId") String id) {
        Professor professor = professorRepository.findAllById(id);
        return new ResponseEntity<Professor>(professor, HttpStatus.OK);
    }

    //Retrieve professors by course code
    //course code is case sensitive
    @CrossOrigin
    @RequestMapping(value = "/professors/course/{courseCode}", method = RequestMethod.GET)
    public ResponseEntity<List<ProfessorDto>> getAllProfessorsByCourseCode(@PathVariable("courseCode")
                                                                                    String courseCode) {
        List<ProfessorDto> professorDtoList = new ArrayList<>();
        List<Professor> professorsByCourseCode = professorRepository.findByCoursesTaughtCourseCodeIgnoreCase(courseCode);
        for(Professor p: professorsByCourseCode) {
            for(ProfCourse pfc: p.getCoursesTaught()) {
                if(pfc.getCourseCode().equals(courseCode)) {
                    professorDtoList.add(new ProfessorDto(p.getId(), p.getName(), pfc.getTerm()));
                }
            }
        }
        return new ResponseEntity<List<ProfessorDto>>(professorDtoList, HttpStatus.OK);
    }

    //Retrieve all evaluations
    @RequestMapping(value = "/evaluations", method = RequestMethod.GET)
    public ResponseEntity<List<Evaluation>> getAllEvaluations() {
        List<Evaluation> evaluations = evaluationRepository.findAll();
        return new ResponseEntity<List<Evaluation>>(evaluations, HttpStatus.OK);
    }

    //Retrieve evaluation based on profId and courseCode
    @CrossOrigin
    @RequestMapping(value = "/evaluation/{profId}/{courseCode}", method = RequestMethod.GET)
    public ResponseEntity<Evaluation> getEvaluation(@PathVariable("profId") String profId,
                                                    @PathVariable("courseCode") String code) {
        List<Evaluation> evaluations = evaluationRepository.findAll();
        for(Evaluation eval : evaluations) {
            if(eval.getCourseCode().equals(code) && eval.getProfessorId().equals(profId)) {
                return new ResponseEntity<Evaluation>(eval, HttpStatus.OK);
            }
        }
        return new ResponseEntity<Evaluation>(HttpStatus.BAD_REQUEST);
    }

    //Retrieve one evaluations
    @CrossOrigin
    @RequestMapping(value = "/evaluations/{evalId}", method = RequestMethod.PUT)
    public ResponseEntity<Evaluation> updateOneEvaluation(@RequestBody Evaluation evaluation,
                                                          @PathVariable("evalId") String evalId) {
        Evaluation eval = evaluationRepository.findAllById(evalId);
        eval.setNumOfEvaluation(evaluation.getNumOfEvaluation());
        eval.setOverall(evaluation.getOverall());
        eval.setHelpful(evaluation.getHelpful());
        eval.setOrganization(evaluation.getOrganization());
        eval.setCommunication(evaluation.getCommunication());
        eval.setInterest(evaluation.getInterest());
        eval.setDifficulty(evaluation.getDifficulty());
        evaluationRepository.save(eval);
        return new ResponseEntity<Evaluation>(eval, HttpStatus.OK);
    }
}
