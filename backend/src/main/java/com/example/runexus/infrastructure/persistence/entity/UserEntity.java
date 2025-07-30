package com.example.runexus.infrastructure.persistence.entity;

import com.example.runexus.domain.enums.Role;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String name;
    private String surname;
    private String gender;
    private int age;
    private double pace;
    private LocalDate birthday;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(columnDefinition = "TEXT")
    private String profilePicture;

    private String email;
    private String password;

    @ManyToMany(mappedBy = "likedUsers")
    private Set<CommentEntity> likedComments = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(
            name = "user_event_joined",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "event_id")
    )
    private Set<EventEntity> joinedEvents = new HashSet<>();



    public UserEntity() {
        this.role = Role.VISITOR;
    }

    public UserEntity(Long userId, String name, String surname, String gender, int age, double pace, LocalDate birthday, String profilePicture, String email, String password) {
        this.userId = userId;
        this.name = name;
        this.surname = surname;
        this.gender = gender;
        this.age = age;
        this.pace = pace;
        this.birthday = birthday;
        this.email = email;
        this.password = password;
        this.role= Role.VISITOR;
        this.likedComments = new HashSet<>();
        this.profilePicture = profilePicture;
    }

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserEntity)) return false;
        UserEntity user = (UserEntity) o;
        return userId != null && userId.equals(user.getUserId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    public Set<CommentEntity> getLikedComments() {
        return likedComments;
    }

    public void setLikedComments(Set<CommentEntity> likedComments) {
        this.likedComments = likedComments;
    }


    public Set<EventEntity> getJoinedEvents() {
        return joinedEvents;
    }

    public void setJoinedEvents(Set<EventEntity> joinedEvents) {
        this.joinedEvents = joinedEvents;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

}
