package app.jobtracker.service;

import app.jobtracker.model.JobApplication;
import app.jobtracker.repository.JobApplicationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Business layer for JobApplication.
 * Keeps controllers thin and isolates database access.
 */
@Service
public class JobApplicationService {

    private final JobApplicationRepository repository;

    public JobApplicationService(JobApplicationRepository repository) {
        this.repository = repository;
    }

    public List<JobApplication> findAll() {
        return repository.findAll();
    }

    public JobApplication save(JobApplication job) {
        return repository.save(job);
    }
}
