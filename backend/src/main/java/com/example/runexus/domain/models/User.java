package com.example.runexus.domain.models;

import com.example.runexus.domain.enums.Role;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

public class User {

    private Long userId;
    private String name;
    private String surname;
    private String gender;
    private int age;
    private double pace;
    private LocalDate birthday;
    private Role role;
    private String email;
    private String password;
    private String profilePicture;

    private Set<Comment> likedComments = new HashSet<>();

    private Set<Event> joinedEvents = new HashSet<>();


    public User() {
        this.role = Role.VISITOR;
    }

    public User(Long userId, String name, String surname, String gender, int age, double pace, LocalDate birthday, Role role, String email, String password, String profilePicture) {
        this.userId = userId;
        this.name = name;
        this.surname = surname;
        this.gender = gender;
        this.age = age;
        this.pace = pace;
        this.birthday = birthday;
        this.role = role != null ? role : Role.VISITOR;
        this.email = email;
        this.password = password;
        this.profilePicture = profilePicture;
        this.joinedEvents = new HashSet<>();
    }

    // Getters and Setters

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public double getPace() {
        return pace;
    }

    public void setPace(double pace) {
        this.pace = pace;
    }

    public LocalDate getBirthday() {
        return birthday;
    }

    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Comment> getLikedComments() {
        return likedComments;
    }

    public void setLikedComments(Set<Comment> likedComments) {
        this.likedComments = likedComments;
    }

    public Set<Event> getJoinedEvents() {
        return joinedEvents;
    }

    public void setJoinedEvents(Set<Event> joinedEvents) {
        this.joinedEvents = joinedEvents;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }
}
