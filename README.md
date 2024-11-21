# Renu-Sharma-Foundation

## Backend

- **controllers/**: Contains logic for handling requests.
- **models/**: Defines schemas and models for database entities (e.g., JobPost, User, Applications).
- **routes/**: Contains route definitions (e.g., routes for jobs, users, applications).
- **middlewares/**: Custom middleware functions (e.g., authentication).
- **config/**: Configuration files (e.g., database connection settings).
- **utils/**: Utility/helper functions (e.g., validation, token generation).
- **server.js/app.js**: Main server file to initialize the backend server.
- **.env**: Environment variables file.

# Internship Website Frontend

This repository contains the frontend code for an Internship Website. The project is built using **HTML**, **CSS**, and **JavaScript** with **Tailwind CSS** for styling.

## Folder Structure

The folder structure is organized as follows:

### `public/`
Contains the main HTML file and static assets like images and fonts.

- `index.html`: The main entry point HTML file for the website.
- `assets/`: Folder containing static assets.
  - `images/`: Images used in the website (e.g., logos, banners).
  - `fonts/`: Custom fonts if any.

### `src/`
Contains the source code for the website.

- `components/`: Reusable UI components.
  - `Navbar.js`: The navigation bar component.
  - `Footer.js`: The footer component.
  - `JobCard.js`: A component for displaying job details.
  
- `pages/`: Page-specific HTML files.
  - `Home.html`: The landing page.
  - `JobListings.html`: Page displaying available internships.
  - `JobDetail.html`: Page for viewing job details.
  - `Login.html`: Login page.
  - `Signup.html`: Signup page.

- `utils/`: Contains utility/helper functions for frontend.
  - `api.js`: Functions for making API requests (e.g., fetching job listings).

- `styles/`: Styling files.
  - `tailwind.css`: The main Tailwind CSS file (CDN or compiled).
  - `custom.css`: Custom styles for the website.

### `tailwind.config.js`
Configuration file for Tailwind CSS (if you're building custom CSS with Tailwind).

---

## Getting Started

To run this project on your local machine:

### Prerequisites

- **Live Server (optional)**: For live reloading, you can install the **Live Server** extension in **VSCode**, or you can use `live-server` globally.
  
```bash
npm install -g live-server


## Suggested Backend Stack

- **Node.js** with **Express.js** for backend server.
- **MongoDB** for database (flexible and scalable).
- **Mongoose** for data modeling (if using MongoDB).
- Consider adding **JWT** (for authentication) and **bcrypt.js** (for password hashing).
