package com.backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Document("User")
public class User {

    @Id
    private String id;
    private String name;

    private String username;
    private String password;
    private Set<User> following;
    private Set<User> followers;
    private Set<String> savedWorkoutIds;
    private Set<String> savedExerciseIds;
    private Date dateOfBirth;
    private Date accountCreated;

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public Date getAccountCreated() {
        return accountCreated;
    }

    public void setAccountCreated(Date accountCreated) {
        this.accountCreated = accountCreated;
    }

    public Set<User> getFollowing() {
        return following;
    }

    public void setFollowing(Set<User> following) {
        this.following = following;
    }

    public Set<User> getFollowers() {
        return followers;
    }

    public void setFollowers(Set<User> followers) {
        this.followers = followers;
    }

    public Set<String> getSavedWorkoutIds() {
        return savedWorkoutIds;
    }

    public void setSavedWorkoutIds(Set<String> savedWorkoutIds) {
        this.savedWorkoutIds = savedWorkoutIds;
    }

    public Set<String> getSavedExerciseIds() {
        return savedExerciseIds;
    }

    public void setSavedExerciseIds(Set<String> savedExerciseIds) {
        this.savedExerciseIds = savedExerciseIds;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void resolveUserData() {
        if (following == null) following = new HashSet<>();
        if (followers == null) followers = new HashSet<>();
        if (savedExerciseIds == null) savedExerciseIds = new HashSet<>();
        if (savedWorkoutIds == null) savedWorkoutIds = new HashSet<>();
        if (dateOfBirth == null) dateOfBirth = new Date();
        if (accountCreated == null) accountCreated = new Date();
    }
}
