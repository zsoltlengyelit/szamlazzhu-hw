package hu.szamlazz.hw.users.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/**
 * User entity representing a user in the system.
 */
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "First name is required")
    @Size(min = 2, max = 64, message = "First name must be between 2 and 64 characters")
    @Column(nullable = false, length = 64)
    private String firstname;

    @NotBlank(message = "Last name is required")
    @Size(min = 2, max = 64, message = "Last name must be between 2 and 64 characters")
    @Column(nullable = false, length = 64)
    private String lastname;

    @Size(max = 128, message = "Address must not exceed 128 characters")
    @Column(length = 128)
    private String address;

    @Size(max = 128, message = "Telephone must not exceed 128 characters")
    @Column(length = 128)
    private String telephone;

    @NotNull(message = "Active status is required")
    @Column(nullable = false)
    private Boolean active = true;

    @NotNull(message = "Job is required")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Job job;

    /**
     * Default constructor for JPA.
     */
    public User() {
    }

    /**
     * Constructor with all fields.
     */
    public User(String firstname, String lastname, String address, String telephone, Boolean active, Job job) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.address = address;
        this.telephone = telephone;
        this.active = active;
        this.job = job;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Job getJob() {
        return job;
    }

    public void setJob(Job job) {
        this.job = job;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", firstname='" + firstname + '\'' +
                ", lastname='" + lastname + '\'' +
                ", address='" + address + '\'' +
                ", telephone='" + telephone + '\'' +
                ", active=" + active +
                ", job=" + job +
                '}';
    }
}
