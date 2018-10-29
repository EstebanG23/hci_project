package com.example.rator.models;

import javax.persistence.Entity;

@Entity
public class Course {
    private String name;
    private String code;
    private String professorId;
    private String term;
    private String section;

    public Course(String name, String code, String professorId, String term, String section) {
        this.name = name;
        this.code = code;
        this.professorId = professorId;
        this.term = term;
        this.section = section;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getProfessorId() {
        return professorId;
    }

    public void setProfessorId(String professorId) {
        this.professorId = professorId;
    }

    public String getSection() {
        return section;
    }

    public void setSection(String section) {
        this.section = section;
    }

    public String getTerm() {
        return term;
    }

    public void setTerm(String term) {
        this.term = term;
    }

}
