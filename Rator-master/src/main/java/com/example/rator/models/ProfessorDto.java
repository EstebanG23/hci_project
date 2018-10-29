package com.example.rator.models;

import javax.persistence.Entity;

@Entity
public class ProfessorDto {
    String profId;
    String name;
    String term;

    public ProfessorDto(String profId, String name, String term) {
        this.profId = profId;
        this.name = name;
        this.term = term;
    }

    public String getProfId() {
        return profId;
    }

    public void setProfId(String profId) {
        this.profId = profId;
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
}
