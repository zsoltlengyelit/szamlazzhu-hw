package hu.szamlazz.hw.users.service;

import hu.szamlazz.hw.users.model.User;

import java.util.List;
import java.util.Optional;

/**
 * Service interface for User business logic.
 */
public interface UserService {

    /**
     * Get all users.
     *
     * @return List of all users
     */
    List<User> getAllUsers();

    /**
     * Get a user by ID.
     *
     * @param id User ID
     * @return Optional containing the user if found
     */
    Optional<User> getUserById(Long id);

    /**
     * Create a new user.
     *
     * @param user User to create
     * @return Created user
     */
    User createUser(User user);

    /**
     * Update an existing user.
     *
     * @param id   User ID
     * @param user Updated user data
     * @return Updated user
     */
    User updateUser(Long id, User user);

    /**
     * Delete a user by ID.
     *
     * @param id User ID
     */
    void deleteUser(Long id);
}
