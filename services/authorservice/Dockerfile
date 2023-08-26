# Use the official JDK 17 image as the base image
FROM openjdk:17-jdk

# Set the working directory inside the container
WORKDIR /app

# Copy your application's JAR file to the container's working directory
COPY target/authorservice-0.0.1-SNAPSHOT.jar /app/app.jar

EXPOSE 8080

# Specify the command to run your application when the container starts
CMD ["java", "-jar", "app.jar"]
