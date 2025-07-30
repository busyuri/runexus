# Runexus – Running Event Platform

Runexus is a web platform that enables users to discover, organize, and join local running events. Registered users can create and manage events, participate in community discussions through a forum, and communicate with other runners via direct messaging. The application promotes social engagement among runners by providing a centralized system for event coordination and user interaction.

The idea for this project emerged in 2025, when we started running together and realized the need for a platform that connects runners, makes event participation easier, and builds a sense of community.

This project was created as part of the "Frontend Systems – Portfolio Assignment 05" under the supervision of Prof. Dr. Peter Braun at Technische Hochschule Würzburg-Schweinfurt.

## Features

- User registration, login, and logout
- Event creation, editing, deletion, and joining
- Viewing joined and created events in a personal dashboard
- Dynamic display of remaining spots in each event
- Community forum for posts and discussions
- Commenting on forum entries
- User profile editing
- Direct messaging between users
- Receive notifications whenever a new event is published or your forum entry receives a comment
- Responsive interface for desktop and mobile

## Project Structure

### Frontend (React)

```
src/
.
├── App.jsx
├── api
│   └── api.js
├── assets
│   ├── landingpage.png
│   ├── runexus-text.png
│   └── star.png
├── components
│   ├── Card.jsx
│   └── Navbar.jsx
├── context
│   └── UserContext.jsx
├── index.css
├── main.jsx
└── pages
    ├── EventsPage.jsx
    ├── ForumPage.jsx
    ├── LandingPage.jsx
    ├── MessageDetailPage.jsx
    ├── MessagesPage.jsx
    ├── MyEventsPage.jsx
    ├── ProfilePage.jsx
    ├── SignInPage.jsx
    └── SignUpPage.jsx

```

### Backend (Spring Boot)

```
src/main/java/com/example/runexus/
.
└── main
    ├── java
    │   └── com
    │       └── example
    │           └── runexus
    │               ├── RunexusApplication.java
    │               ├── application
    │               │   ├── controllers
    │               │   │   ├── AuthController.java
    │               │   │   ├── CommentController.java
    │               │   │   ├── DevController.java
    │               │   │   ├── EntryController.java
    │               │   │   ├── EventController.java
    │               │   │   ├── MessageController.java
    │               │   │   ├── NotificationController.java
    │               │   │   └── UserController.java
    │               │   └── dto
    │               │       ├── AuthenticationRequest.java
    │               │       ├── AuthenticationResponse.java
    │               │       ├── CommentInput.java
    │               │       ├── EntryInput.java
    │               │       ├── EventInput.java
    │               │       ├── MessageInput.java
    │               │       └── UserInput.java
    │               ├── config
    │               │   ├── SecurityConfig.java
    │               │   └── jwt
    │               │       ├── JwtAuthenticationFilter.java
    │               │       ├── JwtService.java
    │               │       └── UserDetailsServiceImpl.java
    │               ├── domain
    │               │   ├── enums
    │               │   │   └── Role.java
    │               │   ├── models
    │               │   │   ├── Comment.java
    │               │   │   ├── Entry.java
    │               │   │   ├── Event.java
    │               │   │   ├── Message.java
    │               │   │   ├── Notification.java
    │               │   │   └── User.java
    │               │   └── ports
    │               │       ├── CommentService.java
    │               │       ├── EntryService.java
    │               │       ├── EventService.java
    │               │       ├── MessageService.java
    │               │       ├── NotificationService.java
    │               │       └── UserService.java
    │               └── infrastructure
    │                   ├── mapper
    │                   │   ├── CommentMapper.java
    │                   │   ├── EntryMapper.java
    │                   │   ├── EventMapper.java
    │                   │   ├── MessageMapper.java
    │                   │   ├── NotificationMapper.java
    │                   │   └── UserMapper.java
    │                   └── persistence
    │                       ├── entity
    │                       │   ├── CommentEntity.java
    │                       │   ├── EntryEntity.java
    │                       │   ├── EventEntity.java
    │                       │   ├── MessageEntity.java
    │                       │   ├── NotificationEntity.java
    │                       │   └── UserEntity.java
    │                       ├── exceptions
    │                       │   ├── CannotLikeOwnCommentException.java
    │                       │   ├── CommentAlreadyLikedException.java
    │                       │   └── ElementNotFoundException.java
    │                       ├── repository
    │                       │   ├── CommentRepository.java
    │                       │   ├── EntryRepository.java
    │                       │   ├── EventRepository.java
    │                       │   ├── MessageRepository.java
    │                       │   ├── NotificationRepository.java
    │                       │   └── UserRepository.java
    │                       └── service
    │                           ├── CommentServiceImpl.java
    │                           ├── EntryServiceImpl.java
    │                           ├── EventServiceImpl.java
    │                           ├── MessageServiceImpl.java
    │                           ├── NotificationServiceImpl.java
    │                           └── UserServiceImpl.java
    └── resources
        └── application.properties

```


## Technologies Used

- React (frontend)
- Axios (for HTTP communication: GET, POST, PUT, DELETE)
- Spring Boot (backend)
- PostgreSQL (database)
- Docker & Docker Compose (containerization)
- REST API for frontend-backend communication

## How to Run

### Build and Start the Application
```bash
cd backend
mvn clean package
cd ..
```

```bash
docker compose up --build
```

The application will be accessible at:

```
http://localhost:5175
```

### Stop and Remove Volumes

```bash
docker compose down -v
```

This stops all containers and removes any associated volumes.

## Deployment Notes

- No global tools like Node.js or Maven are required. Docker handles the full environment.
- The frontend is served as a static build inside a containerized web server.
- Ensure that port `8080` is not in use by another application.

## Authors

- Irmak Damla Özdemir – irmakdamla.oezdemir@study.thws.de  
- Buse Okcu – buse.okcu@study.thws.de

## Submission

This project was created as part of the "Frontend Systems – Portfolio Assignment 05" under the supervision of Prof. Dr. Peter Braun at Technische Hochschule Würzburg-Schweinfurt.
