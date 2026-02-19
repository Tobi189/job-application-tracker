package app.jobtracker.controller;

import app.jobtracker.model.JobApplication;
import app.jobtracker.service.JobApplicationService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ModelAttribute;

@Controller
public class JobApplicationController {

    private final JobApplicationService service;

    public JobApplicationController(JobApplicationService service) {
        this.service = service;
    }

    @GetMapping("/jobs")
    public String listJobs(Model model) {
        model.addAttribute("jobs", service.findAll());
        model.addAttribute("job", new JobApplication()); // used by the modal form
        return "jobs";
    }

    @PostMapping("/jobs")
    public String createJob(@ModelAttribute JobApplication job) {
        service.save(job);
        return "redirect:/jobs";
    }
}
