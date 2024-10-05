# User Management Application

This is a simple User Management application built with **Next.js**. The application allows users to view a list of users, view their details, create new users, edit existing users, and delete users.

## Features

- **User Listing**: Displays a list of users fetched from the JSONPlaceholder API.
- **User Details**: Click on a user to view their detailed information.
- **Create User**: A form to add a new user.
- **Edit User**: Update the details of an existing user.
- **Delete User**: Remove a user from the list.

## Tech Stack

- **Frontend**: Next.js (React framework)
- **Styling**: Tailwind CSS
- **API**: JSONPlaceholder

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Atul-Shivnani/user-management
   ```
2. Navigate to the project directory:

   ```bash
   cd user-management
   ```
3. Install the dependencies:

   ```bash
   npm install
   ```
4. Run the application:

   ```bash
   npm run dev
   ```
## API

The application uses the JSONPlaceholder API for user data. Here are some example endpoints:

- **Get Users**: GET https://jsonplaceholder.typicode.com/users
- **Get User Details**: GET https://jsonplaceholder.typicode.com/users/{id}
- **Create User**: POST https://jsonplaceholder.typicode.com/users
- **Update User**: PUT https://jsonplaceholder.typicode.com/users/{id}
- **Delete User**: DELETE https://jsonplaceholder.typicode.com/users/{id}

## Components

- **Home**: Displays the list of users with options to view details or create a new user.
- **UserDetails**: Shows detailed information for a specific user and options to edit or delete the user.
- **CreateUser**: A form to add a new user.
- **EditUser**: A form to edit an existing user's details.

