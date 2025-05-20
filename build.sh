
#!/bin/bash

# Build the React frontend
cd frontend
echo "Building React frontend..."
npm run build

# Build the Spring Boot backend
cd ../backend
echo "Building Spring Boot backend..."
./mvnw clean package

echo "Build complete!"
echo "Run the application with: java -jar backend/target/fitness-0.0.1-SNAPSHOT.jar"
