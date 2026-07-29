# Distinction Link

A full-stack youth empowerment platform built to address youth unemployment in Africa
by providing accessible tech education, mentorship and career development tools.

Built with: Java Spring Boot · React · PostgreSQL · JWT Authentication


## Requirements

Before you start, make sure you have these installed:

- Java JDK  17 or higher 
- Maven comes with IntelliJ
- Node.js 
- PostgreSQL 
- IntelliJ IDEA 
- VS Code 

## Step 1: Set up the Database

1. Open pgAdmin (installed with PostgreSQL)
2. In the left panel, expand Servers - PostgreSQL
3. Right-click Databases - Create - Database
4. Name it: distinction_db
5. Click Save


## Step 2: Configure the backend

1. Open IntelliJ IDEA
2. Click File - Open - select the backend/ folder
3. Wait for Maven to finish downloading dependencies.
4. Open src/main/resources/application.properties.
5. Update these two lines with your PostgreSQL credentials:

spring.datasource.url=jdbc:postgresql://localhost:5432/distinction_db
spring.datasource.username=postgres
spring.datasource.password=YOUR_POSTGRES_PASSWORD


## Step 3: Add JWT dependency

Open pom.xml and add these three dependencies inside the dependencies block:

```xml
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.11.5</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-impl</artifactId>
    <version>0.11.5</version>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-jackson</artifactId>
    <version>0.11.5</version>
    <scope>runtime</scope>
</dependency>
```

Click the Maven refresh icon that appears in IntelliJ.


## Step 4: Run the backend

1. In IntelliJ, find DistinctionlinkApplication.java
2. Click the green play button
3. Wait for this message in the console:
   Started DistinctionlinkApplication in X seconds

## Step 5: Set up and run the frontend

Open a new terminal window (separate from the backend):


cd frontend

npm install

npm start


The React app will open automatically at http://localhost:3000

Keep both terminals running at the same time the backend on port 8080 and the frontend on port 3000.


## How to Use the Platform

### As a Student
1. Go to `http://localhost:3000/register`
2. Register with role Student
3. Browse Courses and click Enroll and Start Learning
4. Your progress is saved automatically even after closing the browser
5. Go to My Learning to resume where you left off
6. Go to Mentorship to book a session with a registered mentor

### As a Mentor
1. Register with role Mentor
2. Log in and view your booked sessions on the Dashboard and Mentorship page

### As an Admin
1. Log in with admin@distinctionlink.com / admin123
2. Go to Admin Panel to create courses and view all registered users

## Tech Stack

### Backend
- Java 17
- Spring Boot 3.2
- Spring Security with JWT
- Spring Data JPA
- PostgreSQL
- Maven

### Frontend
- React 18
