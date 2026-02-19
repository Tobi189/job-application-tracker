package app.jobtracker.service;

import app.jobtracker.model.JobApplication;
import app.jobtracker.repository.JobApplicationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public Optional<JobApplication> findById(Long id) {
        return repository.findById(id);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    public JobApplication update(Long id, JobApplication incoming) {
        JobApplication existing = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Job not found: " + id));

        existing.setCompany(incoming.getCompany());
        existing.setPosition(incoming.getPosition());
        existing.setStatus(incoming.getStatus());
        existing.setAppliedDate(incoming.getAppliedDate());
        existing.setNotes(incoming.getNotes());

        return repository.save(existing);
    }
}
