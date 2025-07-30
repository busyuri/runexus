package com.example.runexus.application.dto;

import com.example.runexus.domain.enums.Role;

import java.time.LocalDate;

public class UserInput {

    private String name;
    private String surname;
    private String gender;
    private int age;
    private double pace;
    private LocalDate birthday;
    private String email;
    private String password;
    private Role role;
    private String profilePicture;

    public UserInput() {}

    public UserInput(String name, String surname, String gender, int age, double pace, LocalDate birthday, String email, String password, Role role, String profilePicture) {
        this.name = name;
        this.surname = surname;
        this.gender = gender;
        this.age = age;
        this.pace = pace;
        this.birthday = birthday;
        this.email = email;
        this.password = password;
        this.role = role;
        this.profilePicture = profilePicture;
    }

    // Getters and Setters

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

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }
}

