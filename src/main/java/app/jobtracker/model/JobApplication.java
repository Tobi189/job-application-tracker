package app.jobtracker.model;

import jakarta.persistence.*;      // JPA/Hibernate annotations for mapping this class to a database table.
import java.time.LocalDate;        // Date-only type for "applied on" without time-of-day.

@Entity // Marks this class as a JPA entity so Hibernate can persist it (table row <-> object).
@Table(name = "job_applications") // Explicit table name to avoid relying on default naming strategies.
public class JobApplication {

    @Id // Primary key column.
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    // Use database-generated identity/auto-increment values for the primary key.
    private Long id;

    @Column(nullable = false)
    // Company name is required; maps to a NOT NULL column.
    private String company;

    @Column(nullable = false)
    // Position/title is required (e.g., "Backend Engineer"); maps to a NOT NULL column.
    private String position;

    @Column(nullable = false)
    // Status stored as a string for simplicity (e.g., "APPLIED", "INTERVIEW").
    // Could be refactored to an enum later for stronger typing.
    private String status;

    // Date the application was submitted. LocalDate maps naturally to a SQL DATE type.
    private LocalDate appliedDate;

    @Column(columnDefinition = "text")
    // Notes can be long; use a TEXT column rather than a length-limited VARCHAR.
    private String notes;

    // Required by JPA: Hibernate uses the no-args constructor when materializing entities from the database.
    public JobApplication() {
    }

    // --- Getters/Setters ---
    // Setters allow frameworks (and form binding) to populate entity fields.
    // In larger apps, consider constructors/factories and validation rules in a service layer.

    public Long getId() {
        return id;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getAppliedDate() {
        return appliedDate;
    }

    public void setAppliedDate(LocalDate appliedDate) {
        this.appliedDate = appliedDate;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
