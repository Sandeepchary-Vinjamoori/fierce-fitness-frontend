
# Scarface Fitness - Spring Boot + React Integration

This project integrates a React frontend with a Spring Boot backend. The React app is built and served as static content from the Spring Boot application.

## Project Structure

- `frontend/` - React application
- `backend/` - Spring Boot application

## Development Setup

### Prerequisites

- Node.js and npm
- Java 17 or higher
- Maven
- PostgreSQL

### Database Setup

1. Create a PostgreSQL database named `scarface_fitness`.
2. Update database credentials in `backend/src/main/resources/application.properties` if needed.

### Running in Development Mode

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

The development server will be available at http://localhost:8080.

#### Backend

```bash
cd backend
./mvnw spring-boot:run
```

The backend API will be available at http://localhost:8080/api.

## Building for Production

Execute the build script:

```bash
./build.sh
```

This will:
1. Build the React frontend and output files to `backend/src/main/resources/static`
2. Build the Spring Boot backend with Maven

## Running in Production

After building, run:

```bash
java -jar backend/target/fitness-0.0.1-SNAPSHOT.jar
```

The application will be available at http://localhost:8080.

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Log in a user
- `GET /api/auth/session` - Get current session

### Health Information

- `GET /api/health-info` - Get user's health information
- `POST /api/health-info` - Save user's health information

## Frontend Structure

The React frontend uses React Router for client-side routing. The Spring Boot backend is configured to forward all non-API routes to the React app to support this.

## Security

The application uses JWT (JSON Web Tokens) for authentication. The token is stored in the browser's localStorage and sent with each API request in the Authorization header.
