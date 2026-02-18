package app.jobtracker.controller;

import app.jobtracker.service.JobApplicationService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * MVC controller for rendering job-related pages.
 */
@Controller
public class JobApplicationController {

    private final JobApplicationService service;

    public JobApplicationController(JobApplicationService service) {
        this.service = service;
    }

    @GetMapping("/jobs")
    public String listJobs(Model model) {
        model.addAttribute("jobs", service.findAll());
        return "jobs";
    }
}
