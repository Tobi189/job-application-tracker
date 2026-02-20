# Jobtracker

A full-stack Spring Boot web application for tracking job applications.

Built with **Spring Boot 4**, **Java 25**, **PostgreSQL**,
**Thymeleaf**, and fully containerized with **Docker**.

------------------------------------------------------------------------

## 🚀 Tech Stack

-   Java 25\
-   Spring Boot 4.0.2\
-   Spring Web (MVC)\
-   Spring Data JPA\
-   PostgreSQL\
-   Thymeleaf\
-   Docker & Docker Compose

------------------------------------------------------------------------

## ✨ Features

-   Add job applications (modal popup form)
-   Edit and delete entries
-   Filter by status
-   Search by company name
-   Sorting functionality
-   Persistent PostgreSQL database
-   Clean layered architecture
-   Fully containerized setup

------------------------------------------------------------------------

## 📊 Status Types

  Status      Meaning
  ----------- ----------------------
  APPLIED     Application sent
  INTERVIEW   Interview scheduled
  OFFER       Offer received
  REJECTED    Application rejected

------------------------------------------------------------------------

## 🏗 Project Structure

    src/main/java/app/jobtracker
    │
    ├── controller
    │   └── JobApplicationController
    │
    ├── model
    │   └── JobApplication
    │
    ├── repository
    │   └── JobApplicationRepository
    │
    ├── service
    │   └── JobApplicationService
    │
    └── JobtrackerApplication

Frontend:

    src/main/resources
    ├── static
    │   ├── app.js
    │   └── style.css
    │
    ├── templates
    │   └── jobs.html
    │
    └── application.properties

------------------------------------------------------------------------

## 🖼 Screenshots

Create a folder in the project root:

    docs/screenshots/

Add your screenshots with these names:

-   main-view.png
-   add-modal.png
-   search.png
-   sorting.png

Example usage in README:

    ![Main View](docs/screenshots/main-view.png)

------------------------------------------------------------------------

## 🐳 Running with Docker (Recommended)

Make sure Docker Desktop is running.

### Build and start containers

``` bash
docker compose up --build
```

### Open the application

http://localhost:8081/jobs

### Stop containers

``` bash
docker compose down
```

### Reset database (delete volume)

``` bash
docker compose down -v
```

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

``` bash
mvn spring-boot:run
```

Then open:

http://localhost:8081/jobs

------------------------------------------------------------------------

## 🗄 Database

Table: `job_applications`

Fields: - id - company - position - status - applied_date - notes

Hibernate configuration:

    spring.jpa.hibernate.ddl-auto=update

------------------------------------------------------------------------

## 🎯 Purpose of the Project

This project demonstrates:

-   Layered architecture (Controller → Service → Repository)
-   JPA entity mapping
-   Server-side rendering with Thymeleaf
-   Dockerized Spring Boot application
-   Environment-based configuration
-   PostgreSQL integration

------------------------------------------------------------------------

## 🔮 Possible Improvements

-   REST API endpoints
-   Authentication (Spring Security)
-   Pagination
-   CI/CD pipeline
-   Cloud deployment

------------------------------------------------------------------------

## 📌 Author

Your Name
