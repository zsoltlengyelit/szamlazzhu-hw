# Backend Technical Specification

## Overview
This document provides a detailed technical specification for the User CRUD backend service for the Számlázz.hu homework assignment.

## Technology Stack

### Core Technologies
- **Java 25** - Programming language
- **Spring Boot 3.5.7** - Application framework
- **Maven** - Build and dependency management
- **H2 Database** - In-memory relational database
- **Flyway** - Database migration management
- **Spring Data JPA** - Data persistence layer
- **Spring Data REST** - REST API exposure

### Key Dependencies
```xml
- spring-boot-starter-data-rest (REST API)
- spring-boot-starter-data-jpa (Data persistence)
- h2 (In-memory database)
- flyway-core (Database migrations)
- spring-boot-starter-validation (Bean validation)
- spring-boot-starter-test (Testing)
```

## Architecture

### Layered Architecture
```
┌─────────────────────────────────────┐
│     REST Controller Layer           │
│  (UserController)                   │
│  - HTTP endpoint handling           │
│  - Request/Response mapping         │
│  - Input validation                 │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│       Service Layer                 │
│  (UserService)                      │
│  - Business logic                   │
│  - Transaction management           │
│  - Data validation                  │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│     Repository Layer                │
│  (UserRepository)                   │
│  - Data access operations           │
│  - JPA repository interface         │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│       Database Layer                │
│  (H2 In-Memory Database)            │
│  - Data persistence                 │
│  - Flyway migrations                │
└─────────────────────────────────────┘
```

## Data Model

### User Entity

**Table Name**: `users`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| firstname | VARCHAR(64) | NOT NULL, LENGTH(2-64) | User's first name |
| lastname | VARCHAR(64) | NOT NULL, LENGTH(2-64) | User's last name |
| address | VARCHAR(128) | NULLABLE, LENGTH(0-128) | User's address (optional) |
| telephone | VARCHAR(128) | NULLABLE, LENGTH(0-128) | User's phone number (optional) |
| active | BOOLEAN | NOT NULL, DEFAULT TRUE | Active status |
| job | VARCHAR(20) | NOT NULL, CHECK IN ('KERTESZ', 'HENTES', 'PEK') | Job type enum |

**Indexes**:
- Primary key index on `id`
- Optional: Index on `lastname, firstname` for sorting

### Job Enum
```java
public enum Job {
    KERTESZ,  // Gardener
    HENTES,   // Butcher
    PEK       // Baker
}
```

## Validation Rules

### Field-Level Validation

#### firstname
- **Type**: String
- **Required**: Yes
- **Min Length**: 2 characters
- **Max Length**: 64 characters
- **Validation Annotations**: `@NotBlank`, `@Size(min=2, max=64)`

#### lastname
- **Type**: String
- **Required**: Yes
- **Min Length**: 2 characters
- **Max Length**: 64 characters
- **Validation Annotations**: `@NotBlank`, `@Size(min=2, max=64)`

#### address
- **Type**: String
- **Required**: No
- **Min Length**: 0 characters
- **Max Length**: 128 characters
- **Validation Annotations**: `@Size(max=128)`

#### telephone
- **Type**: String
- **Required**: No
- **Min Length**: 0 characters
- **Max Length**: 128 characters
- **Validation Annotations**: `@Size(max=128)`

#### active
- **Type**: Boolean
- **Required**: Yes
- **Default**: true (for new users)
- **Validation Annotations**: `@NotNull`

#### job
- **Type**: Job (Enum)
- **Required**: Yes
- **Valid Values**: KERTESZ, HENTES, PEK
- **Validation Annotations**: `@NotNull`

### Validation Strategy
- **Frontend**: Prevent invalid input (client-side validation)
- **Backend**: Reject invalid data (server-side validation using Bean Validation)
- All validation errors should return HTTP 400 Bad Request with detailed error messages

## REST API Specification

### Base URL
```
http://localhost:8080/api/users
```

### Endpoints

#### 1. List All Users
```http
GET /api/users
```

**Response**: 200 OK
```json
[
  {
    "id": 1,
    "firstname": "János",
    "lastname": "Kovács",
    "address": "Budapest, Fő utca 1.",
    "telephone": "+36-20-123-4567",
    "active": true,
    "job": "KERTESZ"
  }
]
```

#### 2. Get User by ID
```http
GET /api/users/{id}
```

**Path Parameters**:
- `id` (required): User ID

**Response**: 200 OK
```json
{
  "id": 1,
  "firstname": "János",
  "lastname": "Kovács",
  "address": "Budapest, Fő utca 1.",
  "telephone": "+36-20-123-4567",
  "active": true,
  "job": "KERTESZ"
}
```

**Error Response**: 404 Not Found
```json
{
  "timestamp": "2025-11-17T10:30:00",
  "status": 404,
  "error": "Not Found",
  "message": "User not found with id: 1",
  "path": "/api/users/1"
}
```

#### 3. Create User
```http
POST /api/users
Content-Type: application/json
```

**Request Body**:
```json
{
  "firstname": "János",
  "lastname": "Kovács",
  "address": "Budapest, Fő utca 1.",
  "telephone": "+36-20-123-4567",
  "active": true,
  "job": "KERTESZ"
}
```

**Response**: 201 Created
```json
{
  "id": 1,
  "firstname": "János",
  "lastname": "Kovács",
  "address": "Budapest, Fő utca 1.",
  "telephone": "+36-20-123-4567",
  "active": true,
  "job": "KERTESZ"
}
```

**Error Response**: 400 Bad Request
```json
{
  "timestamp": "2025-11-17T10:30:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "errors": [
    {
      "field": "firstname",
      "message": "size must be between 2 and 64"
    }
  ]
}
```

#### 4. Update User
```http
PUT /api/users/{id}
Content-Type: application/json
```

**Path Parameters**:
- `id` (required): User ID

**Request Body**:
```json
{
  "firstname": "János",
  "lastname": "Nagy",
  "address": "Budapest, Kossuth utca 5.",
  "telephone": "+36-30-987-6543",
  "active": false,
  "job": "HENTES"
}
```

**Response**: 200 OK
```json
{
  "id": 1,
  "firstname": "János",
  "lastname": "Nagy",
  "address": "Budapest, Kossuth utca 5.",
  "telephone": "+36-30-987-6543",
  "active": false,
  "job": "HENTES"
}
```

**Error Responses**:
- 404 Not Found: User doesn't exist
- 400 Bad Request: Validation failed

#### 5. Delete User
```http
DELETE /api/users/{id}
```

**Path Parameters**:
- `id` (required): User ID

**Response**: 204 No Content

**Error Response**: 404 Not Found

### CORS Configuration
```java
@CrossOrigin(origins = "http://localhost:4200")
```
- Allow requests from Angular dev server (localhost:4200)
- Production: Configure appropriate origin

## Database Configuration

### H2 In-Memory Database

**Configuration** (`application.properties`):
```properties
# Database
spring.datasource.url=jdbc:h2:mem:userdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# JPA
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=true

# H2 Console (for development)
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# Flyway
spring.flyway.enabled=true
spring.flyway.locations=classpath:db/migration
spring.flyway.baseline-on-migrate=true
```

### Flyway Migration

**Migration Files**: `src/main/resources/db/migration/`

**V1__Create_users_table.sql**:
```sql
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(64) NOT NULL,
    lastname VARCHAR(64) NOT NULL,
    address VARCHAR(128),
    telephone VARCHAR(128),
    active BOOLEAN NOT NULL DEFAULT TRUE,
    job VARCHAR(20) NOT NULL,
    CONSTRAINT chk_job CHECK (job IN ('KERTESZ', 'HENTES', 'PEK'))
);

CREATE INDEX idx_users_name ON users(lastname, firstname);
```

**V2__Insert_sample_data.sql**:
```sql
INSERT INTO users (firstname, lastname, address, telephone, active, job) VALUES
('János', 'Kovács', 'Budapest, Fő utca 1.', '+36-20-123-4567', true, 'KERTESZ'),
('Mária', 'Nagy', 'Debrecen, Kossuth tér 5.', '+36-30-987-6543', true, 'HENTES'),
('Péter', 'Tóth', 'Szeged, Tisza utca 12.', '+36-70-555-1234', false, 'PEK'),
('Anna', 'Szabó', 'Pécs, Széchenyi tér 3.', '+36-20-444-5678', true, 'KERTESZ'),
('László', 'Kiss', 'Győr, Baross utca 8.', '+36-30-333-9876', true, 'HENTES'),
('Éva', 'Horváth', 'Miskolc, Deák Ferenc utca 15.', '+36-70-222-3456', true, 'PEK'),
('Gábor', 'Farkas', 'Kecskemét, Rákóczi út 20.', '+36-20-111-2345', false, 'KERTESZ'),
('Katalin', 'Varga', 'Székesfehérvár, Arany János utca 7.', '+36-30-999-8765', true, 'HENTES');
```

## Error Handling

### Exception Handling Strategy

**Global Exception Handler**: `@ControllerAdvice`

```java
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleUserNotFound(UserNotFoundException ex);

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ValidationErrorResponse handleValidationException(MethodArgumentNotValidException ex);

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponse handleGenericException(Exception ex);
}
```

### Custom Exceptions
- `UserNotFoundException` - Thrown when user not found by ID

### Error Response Format
```json
{
  "timestamp": "2025-11-17T10:30:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "path": "/api/users"
}
```

## Implementation Details

### Package Structure
```
hu.szamlazz.hw.users
├── UsersApplication.java           # Main application class
├── controller/
│   └── UserController.java         # REST controller
├── service/
│   ├── UserService.java           # Service interface
│   └── UserServiceImpl.java       # Service implementation
├── repository/
│   └── UserRepository.java        # JPA repository
├── model/
│   ├── User.java                  # Entity class
│   └── Job.java                   # Job enum
├── dto/
│   ├── UserCreateRequest.java     # DTO for user creation
│   ├── UserUpdateRequest.java     # DTO for user update
│   └── UserResponse.java          # DTO for user response
├── exception/
│   ├── UserNotFoundException.java
│   └── GlobalExceptionHandler.java
└── config/
    └── CorsConfig.java            # CORS configuration
```

### Key Implementation Classes

#### 1. User Entity
```java
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

    // Getters, setters, constructors
}
```

#### 2. Job Enum
```java
public enum Job {
    KERTESZ,  // Gardener
    HENTES,   // Butcher
    PEK       // Baker
}
```

#### 3. User Repository
```java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // JpaRepository provides standard CRUD operations
    // Additional custom queries can be added here
}
```

#### 4. User Service Interface
```java
public interface UserService {
    List<User> getAllUsers();
    Optional<User> getUserById(Long id);
    User createUser(User user);
    User updateUser(Long id, User user);
    void deleteUser(Long id);
}
```

#### 5. User Controller
```java
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers();

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id);

    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody User user);

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @Valid @RequestBody User user);

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id);
}
```

## Testing Strategy

### Unit Tests
- **UserServiceTest**: Test business logic in service layer
- **UserRepositoryTest**: Test data access operations
- Coverage: All CRUD operations, validation, edge cases

### Integration Tests
- **UserControllerTest**: Test REST API endpoints
- Use `@SpringBootTest` and `@AutoConfigureMockMvc`
- Test scenarios:
  - Valid requests (200, 201, 204 responses)
  - Invalid requests (400 responses)
  - Not found scenarios (404 responses)
  - Validation errors

### Test Data
- Use in-memory H2 database for tests
- Separate test data setup per test class

## Security Considerations

### Current Implementation
- **No authentication/authorization** (as per requirements)
- CORS enabled for Angular frontend

### Future Enhancements
- Add Spring Security
- Implement JWT authentication
- Role-based access control (RBAC)

## Performance Considerations

### Database
- In-memory H2 database provides fast read/write operations
- Suitable for development and small-scale applications
- For production: migrate to persistent database (PostgreSQL, MySQL)

### Caching
- Not implemented in current version
- Future: Add Spring Cache for frequently accessed data

## Deployment

### Local Development
```bash
# Build
mvn clean install

# Run
mvn spring-boot:run

# Access
http://localhost:8080/api/users
```

### Production Build
```bash
# Create executable JAR
mvn clean package -DskipTests

# Run JAR
java -jar target/users-0.0.1-SNAPSHOT.jar
```

## Monitoring and Logging

### Logging Configuration
- Use SLF4J with Logback
- Log levels:
  - INFO: Application lifecycle, important events
  - DEBUG: Detailed execution flow
  - ERROR: Exceptions and errors

### Actuator Endpoints (Future)
- `/actuator/health` - Health check
- `/actuator/metrics` - Application metrics

## API Documentation (Future Enhancement)

### Swagger/OpenAPI
- Add `springdoc-openapi-starter-webmvc-ui` dependency
- Generate interactive API documentation
- Access at: `http://localhost:8080/swagger-ui.html`

## Compliance with Requirements

### ✅ Backend Requirements Met
- [x] Java with Spring Boot
- [x] Maven build management
- [x] In-memory data storage (H2 database)
- [x] Flyway database migrations
- [x] No authentication/authorization
- [x] Data validation (prevents invalid data)

### ✅ Data Model Requirements Met
- [x] User entity with all required fields
- [x] All validation constraints (min/max lengths)
- [x] Job enum (KERTESZ, HENTES, PEK)
- [x] Boolean active field

### ✅ Architecture Requirements Met
- [x] REST API with proper HTTP methods
- [x] Controller layer for HTTP endpoints
- [x] Service layer for business logic
- [x] Repository layer for data access
- [x] Validation annotations (@Valid, @NotNull, @Size)

## Appendix

### Sample API Calls (cURL)

#### Create User
```bash
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "firstname": "János",
    "lastname": "Kovács",
    "address": "Budapest, Fő utca 1.",
    "telephone": "+36-20-123-4567",
    "active": true,
    "job": "KERTESZ"
  }'
```

#### Get All Users
```bash
curl http://localhost:8080/api/users
```

#### Update User
```bash
curl -X PUT http://localhost:8080/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "firstname": "János",
    "lastname": "Nagy",
    "address": "Budapest, Kossuth utca 5.",
    "telephone": "+36-30-987-6543",
    "active": false,
    "job": "HENTES"
  }'
```

#### Delete User
```bash
curl -X DELETE http://localhost:8080/api/users/1
```

---

**Document Version**: 1.0
**Last Updated**: 2025-11-17
**Author**: Generated for Számlázz.hu Homework Assignment
