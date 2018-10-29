package com.example.rator.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Entity;
import java.util.List;

@Entity
public class Professor {
    @Id
    String id;
    String name;
    List<ProfCourse> coursesTaught;

    public Professor(String id, String name, List<ProfCourse> coursesTaught) {
        this.id = id;
        this.name = name;
        this.coursesTaught = coursesTaught;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<ProfCourse> getCoursesTaught() {
        return coursesTaught;
    }

    public void setCoursesTaught(List<ProfCourse> coursesTaught) {
        this.coursesTaught = coursesTaught;
    }
}
