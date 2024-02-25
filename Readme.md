# Authentication API 🚀

## Introduction

Welcome to the Authentication API! This secure and robust solution provides user authentication and authorization features for your Node.js and Express web applications or APIs.

## 🌟 Features

- **User Sign-Up:** Register new users easily.
- **User Sign-In:** Authenticate users securely.
- **Email Verification:** Ensure user emails are valid.
- **Token-Based Authentication:** Utilize JWT for enhanced security.
- **User Profile Management:** Allow users to update their profiles.
- **User Deletion:** Empower users to delete their accounts.

## 🛠️ Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ashishthotwe07/Authentication-API.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd authentication-api
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Set up environment variables:**
   - Create a `.env` file in the root directory.
   - Define the following variables:
     ```
     PORT=3000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     USER_EMAIL=your_email_for_sending_verification_emails
     USER_PASS=your_email_password
     ```
5. **Start the server:**
   ```bash
   npm start
   ```

## 🚀 Usage

1. **Register a new user:**
   - Endpoint: `POST /api/v1/users/signup`
   - Request Body: `{ "name": "User Name", "email": "user@example.com", "password": "password" }`

2. **Sign in with registered user credentials:**
   - Endpoint: `POST /api/v1/users/signin`
   - Request Body: `{ "email": "user@example.com", "password": "password" }`

3. **Verify email address:**
   - Endpoint: `GET /api/v1/users/verify/:token`

4. **Update user profile:**
   - Endpoint: `PUT /api/v1/users/update`
   - Authorization: Bearer Token

5. **Delete user account:**
   - Endpoint: `DELETE /api/v1/users/delete`
   - Authorization: Bearer Token

## 📖 API Documentation

Explore the [API Documentation](https://www.postman.com/martian-crater-429846/workspace/e-commerce-web-app/documentation/30357775-516c4f1d-359e-4b35-8dbf-f9c61c18e06b) for detailed insights.

## 🤝 Contributing

Contributions are welcome! Please check the [Contributing Guidelines](CONTRIBUTING.md) for more details.

## 📝 License

This project is licensed under the [MIT License](LICENSE).

## 📧 Contact Information

For any inquiries or support, feel free to reach out to [Ashish Thotwe](mailto:ashishthotwe20@example.com).
