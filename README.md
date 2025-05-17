
# MMC Project

## Overview
The **MMC Project** is a job application tracking system designed to streamline the recruitment workflow. It allows users to add, update, and manage candidate applications efficiently. Admins have secure access to modify application data, while general users can view entries.

## Features
- 🔍 **View Applications**: See a list of all job applications and their statuses.
- ✍️ **Add/Update/Delete**: Admins can create, update, or delete application records.
- 🔒 **Admin Authentication**: Secure login to manage admin-only access.
- 🌙 **Dark Mode**: Toggle between light and dark themes for better accessibility.

## Installation

To install and run the project locally:

1. **Clone the repository**
    ```sh
    git clone https://github.com/yourusername/mmc-project.git
    ```

2. **Navigate to the project directory**
    ```sh
    cd mmc-project
    ```

3. **Install dependencies**
    ```sh
    npm install
    ```

4. **Start the development server**
    ```sh
    npm start
    ```

> Make sure your backend server is also running at `http://localhost:5000` as configured in `api.js`.

## Usage

- Visit `http://localhost:3000` in your browser.
- Click **Admin Login** in the header to log in using:
  - Username: `admin`
  - Password: `admin123`
- Add or update applications as needed.
- Toggle dark mode using the top-right button.

## Folder Structure

```
src/
├── components/
│   └── Dashboard.jsx
│   └── Form.jsx
├── context/
│   └── AuthContext.js
├── services/
│   └── api.js
├── App.js
└── index.js
```

## Contributing

We welcome contributions! Follow these steps to contribute:

1. Fork the repository.
2. Create a feature branch:
    ```sh
    git checkout -b feature-name
    ```
3. Commit your changes:
    ```sh
    git commit -m "Add feature"
    ```
4. Push to your branch:
    ```sh
    git push origin feature-name
    ```
5. Open a pull request.

