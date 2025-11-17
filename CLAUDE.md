# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a homework assignment (próbafeladat) for Számlázz.hu to build a User CRUD application with an Angular frontend and Spring Boot backend. The application should match the design patterns used in Számlázz.hu's modernized Angular pages.

## Project Requirements

### Backend Stack
- **Java** with **Spring Boot**
- **Maven** for build management
- **In-memory data storage** (variables or in-memory database)
- **migrations with Flyway**
- **No authentication/authorization** required
- **Data validation** must prevent invalid data from being saved

### Frontend Stack
- **Angular**
- **Avoid CSS frameworks** (Bootstrap, Material, etc.) - use custom CSS
- **Separate routes** for each page (list, create, edit)
- At least one **reusable component** (button required)

### Data Model

```typescript
User {
  id: number,
  firstname: string,    // min: 2, max: 64
  lastname: string,     // min: 2, max: 64
  address: string,      // min: 0, max: 128
  telephone: string,    // min: 0, max: 128
  active: boolean,
  job: 'KERTESZ' | 'HENTES' | 'PEK'  // Gardener, Butcher, Baker
}
```

## Build and Development Commands

### Backend
```bash
# Build the project
mvn clean install

# Run the Spring Boot application
mvn spring-boot:run

# Run tests
mvn test
```

### Frontend
```bash
# Install dependencies
npm install

# Run development server
ng serve

# Build for production
ng build

# Run tests
ng test

# Run linter
ng lint
```

## Application Features

### 1. List Page (Listázó oldal)
- Display users in a paginated table (5 rows per page)
- Columns: Név (Name), Foglalkozás (Job), Aktív (Active), Műveletek (Actions)
- Actions per row: Törlés (Delete), Módosítás (Edit)
- Delete requires native browser confirmation
- "Létrehozás" (Create) button navigates to create page

### 2. Edit Page (Szerkesztés)
- Pre-filled form with existing user data
- Input validation (prevent invalid data entry)
- Three buttons:
  - **Mégsem** (Cancel): Navigate back to list
  - **Törlés** (Delete): Delete user with confirmation, then navigate to list
  - **Módosítás** (Update): Save changes and navigate to list

### 3. Create Page (Létrehozás)
- Empty form for new user
- Input validation (prevent invalid data entry)
- **Note**: According to the PDF mockup, the "Aktív" (Active) field is NOT shown on the create page (only on edit page)
- Two buttons:
  - **Mégsem** (Cancel): Navigate back to list
  - **Létrehozás** (Create): Save new user and navigate to list

## Design Guidelines

The UX designer provided rough mockups with flexibility for implementation. You can determine:
- Padding and spacing
- Border styles
- Colors
- Functional modifications (if justified)

The design should align with Számlázz.hu's modernized Angular pages (as referenced in nyugta/receipt pages, settings pages, and profile pages).

## Field Labels (Hungarian)

- **Vezetéknév**: Last name
- **Keresztnév**: First name
- **Cím**: Address
- **Telefon**: Telephone
- **Foglalkozás**: Job/Occupation
- **Aktív**: Active

## Validation Rules

All validation must be enforced on both frontend (prevent input) and backend (reject invalid data):
- firstname: 2-64 characters
- lastname: 2-64 characters
- address: 0-128 characters (optional)
- telephone: 0-128 characters (optional)
- job: Must be one of KERTESZ, HENTES, or PEK
- active: Boolean value

## Architecture Notes

### Backend
- Controllers should handle HTTP endpoints for CRUD operations
- Service layer for business logic
- Data validation using annotations (@Valid, @NotNull, @Size, etc.)
- REST API design with appropriate HTTP methods (GET, POST, PUT, DELETE)

### Frontend
- Component-based architecture
- Routing module for navigation
- Reactive forms with validation
- Shared/reusable components (at minimum: button component)
- Services for HTTP communication with backend
- No external CSS frameworks - custom styling only

## Submission Requirements

When submitting the completed homework:
1. **Share the source code** (e.g., Git repository)
2. **Provide access to running application** OR **installation instructions**:
   - If deployed: provide the URL
   - If requires local setup: provide clear step-by-step installation guide
3. **Write a brief description** (few paragraphs) covering:
   - Overview of the completed work
   - **AI assistance details**: Where and to what extent AI helped with the task
   - **Which AI tools were used** (e.g., GitHub Copilot, ChatGPT, Claude, etc.)

**Note**: There is NO deadline for this assignment. Complete it at your own pace without time pressure.
