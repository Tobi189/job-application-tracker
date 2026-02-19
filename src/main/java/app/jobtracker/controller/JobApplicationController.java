package app.jobtracker.controller;

import app.jobtracker.model.JobApplication;
import app.jobtracker.service.JobApplicationService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;

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

    @PostMapping("/jobs/{id}/update")
    public String updateJob(@PathVariable Long id, @ModelAttribute JobApplication job) {
        service.update(id, job);
        return "redirect:/jobs";
    }

    @PostMapping("/jobs/{id}/delete")
    public String deleteJob(@PathVariable Long id) {
        service.deleteById(id);
        return "redirect:/jobs";
    }

}
