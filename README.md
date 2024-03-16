Social Networking API

This API provides endpoints for a social networking application, allowing users to register, login, create posts, follow other users, and more.

Endpoints
The API provides the following endpoints:

/users/register: Register a new user.
/users/login: User login.
/users/profile/{username}: Get user profile by username.
/posts: Create a new post and retrieve user's posts.
/posts/{postId}: Update or delete a post.
/follow/feed: Get user's feed.
/follow/users/follow/{userId}: Follow a user.
/follow/users/unfollow/{userId}: Unfollow a user.
/follow/users/following: Get users followed by the current user.
/follow/users/followers: Get users following the current user.
/follow/hello: Test endpoint.
Authentication
Authentication is handled using JSON Web Tokens (JWT). To authenticate, include the JWT token in the Authorization header of your requests.

Database Configuration
Install MongoDB on your local machine or use a cloud-based MongoDB service.
Create a new database for the project.
Copy the MongoDB connection URI provided by your database provider.
Configure Environment Variables:
Create a .env file in the root directory of the project.
Add the MongoDB connection URI and other sensitive information to the .env file. For example:
php
Copy code
MONGODB_URI=mongodb+srv://<Username>:<YourPassWord>@cluster0.e1pgcys.mongodb.net<DatabaseName>retryWrites=truew=majority&appName=Cluster0

Logging with Winston
Centralized logging is implemented using Winston. Logs are stored in separate log files for different levels (info, warning, error). You can find log files in the logs directory. Additionally, logs are timestamped and formatted for easy readability.

Swagger Documentation
Swagger documentation is available at the /api-docs endpoint. You can use this interface to explore the API endpoints and their specifications.

Configuration
You can configure the API settings in the config.js file. Here, you can specify the port number, rate limiting settings, and other parameters.

Contributing
Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or create a pull request.

This format is suitable for rendering on GitHub and provides clear formatting for each section of the README file.





