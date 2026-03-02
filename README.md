# Jobtracker

Jobtracker is a full-stack Spring Boot web application for managing and
tracking job applications.

The application allows users to create, update, delete, search, and
filter job applications with persistent PostgreSQL storage. The project
follows a clean layered architecture and is fully containerized using
Docker.

------------------------------------------------------------------------

## 🚀 Tech Stack

-   Java 25\
-   Spring Boot 4.0.2\
-   Spring Web (Spring MVC)\
-   Spring Data JPA (Hibernate)\
-   PostgreSQL\
-   Thymeleaf\
-   Docker & Docker Compose

------------------------------------------------------------------------

## ✨ Features

-   Add job applications using a modal popup window
-   Edit and delete entries
-   Filter by status (APPLIED, INTERVIEW, OFFER, REJECTED)
-   Search by company name
-   Sort by company name and status
-   Persistent PostgreSQL database
-   Clean layered architecture (Controller → Service → Repository)
-   Fully containerized setup

------------------------------------------------------------------------

## 📊 Status Types

  Status      Description
  ----------- -----------------------
  APPLIED     Application submitted
  INTERVIEW   Interview in progress
  OFFER       Offer received
  REJECTED    Application rejected

------------------------------------------------------------------------

## 🖼 Application Screenshots

The screenshots are located in:

docs/screenshots/

### Main View

Displays the list of all job applications with status badges, filtering,
searching, and sorting controls.

![Main View](docs/screenshots/main%20view.png)

------------------------------------------------------------------------

### Add Job Window

Modal popup form used to create a new job application.

![Add Window](docs/screenshots/add%20window.png)

------------------------------------------------------------------------

### Sorting by Company Name

Example of sorting the table by company name.

![Sorting Company Name](docs/screenshots/sorting%20company%20name.png)

------------------------------------------------------------------------

### Sorting by Status

Example of sorting the table by application status.

![Sorting Status](docs/screenshots/sorting%20status.png)

------------------------------------------------------------------------

## 🐳 Running with Docker (Recommended)

Make sure Docker Desktop is running.

### Build and start containers

    docker compose up --build

### Open the application

http://localhost:8081/jobs

### Stop containers

    docker compose down

### Reset database (delete volume)

    docker compose down -v

------------------------------------------------------------------------

## 💻 Running Without Docker

1.  Create a PostgreSQL database.
2.  Set environment variables:

```{=html}
<!-- -->
```
    DB_URL=jdbc:postgresql://localhost:5432/app
    DB_USERNAME=your_username
    DB_PASSWORD=your_password
    APP_PORT=8081

3.  Run the application:

```{=html}
<!-- -->
```
    mvn spring-boot:run

Then open:

http://localhost:8081/jobs

------------------------------------------------------------------------

## 🗄 Database

Table: job_applications

Fields:

-   id\
-   company\
-   position\
-   status\
-   applied_date\
-   notes

Hibernate configuration:

    spring.jpa.hibernate.ddl-auto=update


