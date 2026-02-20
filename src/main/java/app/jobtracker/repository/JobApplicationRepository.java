package app.jobtracker.repository;

import app.jobtracker.model.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {

    // default listing (newest first)
    List<JobApplication> findAllByOrderByIdDesc();

    // filter by status
    List<JobApplication> findByStatusOrderByIdDesc(String status);

    // search by company (case-insensitive, partial match)
    List<JobApplication> findByCompanyContainingIgnoreCaseOrderByIdDesc(String company);

    // filter by status AND search by company
    List<JobApplication> findByStatusAndCompanyContainingIgnoreCaseOrderByIdDesc(String status, String company);
}