## Social Networking API

This project provides a robust API for a social networking application, empowering users to register, log in, manage their profiles, create and interact with posts, follow other users, and stay connected.

Key Features

# Comprehensive Endpoints:
User Management:
/users/register: Register a new user.
/users/login: User login.
/users/profile/{username}: Get user profile information by username.

Post Management:
/posts: Create a new post and retrieve the current user's posts.
/posts/{postId}: Update or delete a specific post (requires authentication).

Following and Feed:
/follow/feed: Get the current user's personalized feed based on followed users.
/follow/users/follow/{userId}: Follow a specific user.
/follow/users/unfollow/{userId}: Unfollow a specific user.
/follow/users/following: Get a list of users the current user is following.
/follow/users/followers: Get a list of users following the current user.


# Secure Authentication:
Utilizes JSON Web Tokens (JWT) for secure authentication. Include the JWT token in the Authorization header of your requests to access protected endpoints.

# Database Integration:
Supports MongoDB for user data and post storage.
Instructions provided for setting up a local MongoDB instance or using a cloud-based service.

# Centralized Logging:
Leverages Winston for comprehensive logging.
Logs are segregated by level (info, warning, error) for better organization.
Timestamped and formatted log files located in the logs directory for easy analysis.

# Swagger Documentation:
Integrated Swagger documentation at the /api-docs endpoint, providing an interactive interface to explore available endpoints and their details.
Customization:
Configure API settings like port number and rate limiting in the config.js file.
Open Source and Contributions:
We welcome your contributions! Feel free to report issues or suggest improvements by creating an issue or pull request.
Getting Started

Prerequisites:
Node.js and npm (or yarn)
MongoDB (local or cloud-based)
Clone the Repository:
Bash
git clone https://github.com/your-username/social-networking-api.git


# Database Configuration:
Create a .env file in the root directory and add your MongoDB connection URI.
Refer to your MongoDB provider's instructions for obtaining the connection URI.
Start the API:
Bash
npm start (or yarn start)
Use code with caution.
Usage

API documentation is available at http://localhost:<port>/api-docs (replace <port> with the configured port number).
Refer to the documentation for specific endpoint usage, request and response formats, authentication requirements, and error codes.
