package com.example.rator.models;

import javax.persistence.Entity;

@Entity
public class ProfCourse {
    String name;
    String term;
    Evaluation evaluation;
    String courseCode;

    public ProfCourse(String name, String term, String courseCode) {
        this.name = name;
        this.term = term;
        this.evaluation = null;
        this.courseCode = courseCode;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTerm() {
        return term;
    }

    public void setTerm(String term) {
        this.term = term;
    }

    public Evaluation getEvaluation() {
        return evaluation;
    }

    public void setEvaluation(Evaluation evaluation) {
        this.evaluation = evaluation;
    }

    public String getCourseCode() {
        return courseCode;
    }

    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }
}
