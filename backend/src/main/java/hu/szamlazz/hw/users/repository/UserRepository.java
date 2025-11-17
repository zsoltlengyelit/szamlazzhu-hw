package hu.szamlazz.hw.users.repository;

import hu.szamlazz.hw.users.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for User entity.
 * Extends JpaRepository to provide standard CRUD operations.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // JpaRepository provides the following methods out of the box:
    // - findAll()
    // - findById(Long id)
    // - save(User user)
    // - deleteById(Long id)
    // - count()
    // - existsById(Long id)
    // Additional custom query methods can be added here if needed
}
