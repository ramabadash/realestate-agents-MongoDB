# Realestate agents with mongoDB -

---

- Start a new Project, initiating GIT, NPM & Mongo DB.
- Download a csv file of real estate agents from here
- Design a Schema for Agent model
- Write a job script that populates the database using the csv file (see example batch-insert.js)
- Make 3 API endpoints (routes):
  - GET /cities - will respond with a list of all cities
  - GET /agents/?city=<city> - will respond with a list of all agents in that city
  - PUT /agent/:id/edit - will update agent's city
- BONUS implement a frontend application to consume this api.

---
