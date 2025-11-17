package hu.szamlazz.hw.users.controller;

import hu.szamlazz.hw.users.exception.UserNotFoundException;
import hu.szamlazz.hw.users.model.User;
import hu.szamlazz.hw.users.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for User CRUD operations.
 */
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = {"http://localhost:4200", "http://szamlazzhu.sherpas.hu:4200"})
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Get all users.
     *
     * @return List of all users
     */
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    /**
     * Get a user by ID.
     *
     * @param id User ID
     * @return User if found
     */
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
        return ResponseEntity.ok(user);
    }

    /**
     * Create a new user.
     *
     * @param user User to create
     * @return Created user
     */
    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
        User createdUser = userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    /**
     * Update an existing user.
     *
     * @param id   User ID
     * @param user Updated user data
     * @return Updated user
     */
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @Valid @RequestBody User user) {
        User updatedUser = userService.updateUser(id, user);
        return ResponseEntity.ok(updatedUser);
    }

    /**
     * Delete a user by ID.
     *
     * @param id User ID
     * @return No content
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
