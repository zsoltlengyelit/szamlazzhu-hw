# User CRUD Backend

Spring Boot backend for the Számlázz.hu homework assignment - a User management application with CRUD operations.

## Requirements

### System Requirements
- **Java 25** (JDK)
- **Maven 3.6+** (or use included Maven wrapper)

### Dependencies
- Spring Boot 3.5.7
- Spring Data REST
- H2 Database (in-memory)
- Flyway (database migrations)

## Installation with asdf

[asdf](https://asdf-vm.com/) is a version manager that can manage multiple runtime versions including Java and Maven.

### 1. Install asdf

Follow the official installation guide: https://asdf-vm.com/guide/getting-started.html

```bash
# Example for Linux/macOS with bash
git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.14.0
echo '. "$HOME/.asdf/asdf.sh"' >> ~/.bashrc
echo '. "$HOME/.asdf/completions/asdf.bash"' >> ~/.bashrc
source ~/.bashrc
```

### 2. Install Java plugin

```bash
asdf plugin add java
```

### 3. Install Java 25

```bash
# List available Java versions
asdf list all java | grep 25

# Install Java 25 (adjust the exact version as needed)
asdf install java openjdk-25

# Set Java 25 as the global version
asdf global java openjdk-25

# Or set it locally for this project only
asdf local java openjdk-25
```

### 4. Verify Installation

```bash
java -version
# Should show Java version 25
```

### 5. Optional: Install Maven

The project includes Maven wrapper (`mvnw`), so Maven installation is optional.

```bash
asdf plugin add maven
asdf install maven latest
asdf global maven latest
```

## Running the Backend

### Using Maven Wrapper (Recommended)

The project includes Maven wrapper scripts that don't require Maven to be installed.

#### On Linux/macOS:
```bash
# Build the project
./mvnw clean install

# Run the application
./mvnw spring-boot:run

# Run tests
./mvnw test
```

#### On Windows:
```bash
# Build the project
mvnw.cmd clean install

# Run the application
mvnw.cmd spring-boot:run

# Run tests
mvnw.cmd test
```

### Using Installed Maven

If you have Maven installed (via asdf or system package manager):

```bash
# Build the project
mvn clean install

# Run the application
mvn spring-boot:run

# Run tests
mvn test
```

## Application Details

### Default Configuration
- **Port**: 8080 (default Spring Boot port)
- **Database**: H2 in-memory database
- **Base URL**: http://localhost:8080

### API Endpoints

The application provides REST API endpoints for User CRUD operations:

- `GET /users` - List all users
- `GET /users/{id}` - Get user by ID
- `POST /users` - Create new user
- `PUT /users/{id}` - Update existing user
- `DELETE /users/{id}` - Delete user

### User Data Model

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

**Validation Rules:**
- `firstname`: 2-64 characters (required)
- `lastname`: 2-64 characters (required)
- `address`: 0-128 characters (optional)
- `telephone`: 0-128 characters (optional)
- `job`: Must be one of: `KERTESZ` (Gardener), `HENTES` (Butcher), `PEK` (Baker)
- `active`: Boolean value

## Development

### Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── hu/szamlazz/hw/users/
│   │   │       └── UsersApplication.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
│       └── java/
│           └── hu/szamlazz/hw/users/
│               └── UsersApplicationTests.java
├── mvnw (Maven wrapper - Linux/macOS)
├── mvnw.cmd (Maven wrapper - Windows)
└── pom.xml
```

### Configuration

Edit `src/main/resources/application.properties` to customize application settings.

### Building for Production

```bash
# Create executable JAR
./mvnw clean package

# Run the JAR
java -jar target/users-0.0.1-SNAPSHOT.jar
```

## Docker Deployment

The backend includes a Dockerfile for containerized deployment using multi-stage build for optimal image size.

### Building the Docker Image

```bash
# Navigate to the backend directory
cd backend

# Build the Docker image
docker build -t szamlazzhu-users:latest .
```

### Running with Docker

```bash
# Run the container (foreground)
docker run -p 8080:8080 szamlazzhu-users:latest

# Run the container (detached mode)
docker run -d -p 8080:8080 --name users-app szamlazzhu-users:latest

# View logs
docker logs users-app

# Stop the container
docker stop users-app

# Remove the container
docker rm users-app
```

The application will be accessible at `http://localhost:8080` when the container is running.

## Troubleshooting

### Port 8080 already in use
If port 8080 is already in use, you can change it in `application.properties`:
```properties
server.port=8081
```

### Java version mismatch
Ensure Java 25 is active:
```bash
java -version
asdf current java
```

### Maven wrapper permission denied (Linux/macOS)
```bash
chmod +x mvnw
```

## Related Documentation

- [Spring Boot Documentation](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/)
- [Spring Data REST](https://docs.spring.io/spring-data/rest/docs/current/reference/html/)
- [H2 Database](https://www.h2database.com/)
- [asdf Documentation](https://asdf-vm.com/)
