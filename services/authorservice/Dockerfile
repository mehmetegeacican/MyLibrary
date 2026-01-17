# Use Eclipse Temurin JDK 17 as the base image
FROM eclipse-temurin:17-jdk

# Set the working directory inside the container
WORKDIR /app

# Copy your application's JAR file to the container's working directory
COPY target/authorservice-0.0.1-SNAPSHOT.jar /app/app.jar

# Expose port 8080
EXPOSE 8080

# Specify the command to run your application when the container starts
CMD ["java", "-jar", "app.jar"]
