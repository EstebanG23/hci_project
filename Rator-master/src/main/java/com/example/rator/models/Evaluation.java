package com.example.rator.models;

import org.springframework.data.annotation.Id;

import javax.persistence.Entity;

@Entity
public class Evaluation {
    @Id
    String id;
    String courseCode;
    String professorId;
    int numOfEvaluation;
    int overall;
    int helpful;
    int organization;
    int communication;
    int interest;
    int difficulty;

    //we only need to create a new update object with the num of evals and 5 categories
    //courseCode and professorId can be set based on path variables

    public Evaluation(String courseCode, String professorId, int numOfEvaluation, int overall, int helpful, int organization,
                      int communication, int interest, int difficulty) {
        this.courseCode = courseCode;
        this.professorId = professorId;
        this.numOfEvaluation = numOfEvaluation;
        this.overall = overall;
        this.helpful = helpful;
        this.organization = organization;
        this.communication = communication;
        this.interest = interest;
        this.difficulty = difficulty;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCourseCode() {
        return courseCode;
    }

    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }

    public String getProfessorId() {
        return professorId;
    }

    public void setProfessorId(String professorId) {
        this.professorId = professorId;
    }

    public int getNumOfEvaluation() {
        return numOfEvaluation;
    }

    public void setNumOfEvaluation(int numOfEvaluation) {
        this.numOfEvaluation = numOfEvaluation;
    }

    public int getOverall() {
        return overall;
    }

    public void setOverall(int overall) {
        this.overall = overall;
    }

    public int getHelpful() {
        return helpful;
    }

    public void setHelpful(int helpful) {
        this.helpful = helpful;
    }

    public int getOrganization() {
        return organization;
    }

    public void setOrganization(int organization) {
        this.organization = organization;
    }

    public int getCommunication() {
        return communication;
    }

    public void setCommunication(int communication) {
        this.communication = communication;
    }

    public int getInterest() {
        return interest;
    }

    public void setInterest(int interest) {
        this.interest = interest;
    }

    public int getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(int difficulty) {
        this.difficulty = difficulty;
    }
}
