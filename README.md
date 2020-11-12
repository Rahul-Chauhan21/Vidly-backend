# Vidly-backend
Vidly is an imaginary service for renting out movies, this repo is a follow up to the Nodejs course by Mosh, it involves
building the backend of Vidly.

Task 1:
Creating a Service for Managing the list of genres.
  - To get the list of genres, update, delete or create a new one.

Task 2:
Refactor application & move all the routes to the route folder.
  - Add Genres route
  - Add Home route

Task 3:
Work with MongoDB and Mongoose.
  - Get rid of dummy data 
  - Use MongoDB database for every route handler

Task 4:
Build the Customers API and Restructure application
  - Create endpoint to manage Customers with some properties.
  - Restructure project to ensure single responsiblity principle
    -eg Customers Module should ensure only managing routes and not the structure of a Customer.

Task 5:
Build the Movies API
  - Embed a genre document inside the movie to optimise query performance.

Task 6:
Build the Rentals API
  - Create a rental schema with customer property defined as a custom schema.
  - Create endpoints to manage Rentals.
  - Use Fawn for transactions.
