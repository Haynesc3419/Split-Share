package com.backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("Exercise")
public class Exercise {
    @Id
    private String id;
    private String name;
    private String description;
    private int setRangeBottom;
    private int setRangeTop;
    private int repRangeBottom;
    private int repRangeTop;

    public Exercise(String id, String name, String description, int setRangeBottom, int setRangeTop, int repRangeBottom, int repRangeTop) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.setRangeBottom = setRangeBottom;
        this.setRangeTop = setRangeTop;
        this.repRangeBottom = repRangeBottom;
        this.repRangeTop = repRangeTop;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getSetRangeBottom() {
        return setRangeBottom;
    }

    public void setSetRangeBottom(int setRangeBottom) {
        this.setRangeBottom = setRangeBottom;
    }

    public int getSetRangeTop() {
        return setRangeTop;
    }

    public void setSetRangeTop(int setRangeTop) {
        this.setRangeTop = setRangeTop;
    }

    public int getRepRangeBottom() {
        return repRangeBottom;
    }

    public void setRepRangeBottom(int repRangeBottom) {
        this.repRangeBottom = repRangeBottom;
    }

    public int getRepRangeTop() {
        return repRangeTop;
    }

    public void setRepRangeTop(int repRangeTop) {
        this.repRangeTop = repRangeTop;
    }
}
