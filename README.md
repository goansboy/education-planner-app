# EduPlanner

EduPlanner is an educational planner application designed to interface with the Canvas API to access course information and automatically populate calendars with class due dates. Users can also manually add personal events or dates to their calendars.

## Features

- User Authentication: Register, log in, and log out.
- Calendar Management: View, create, and manage personal and academic calendars.
- Event Management: Add, edit, and delete events in calendars.
- Integration with Canvas API: Automatically fetch and display course due dates.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm
- MongoDB

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourGitHubUsername/EduPlanner.git
Navigate to the project directory:

sh
Copy code
cd EduPlanner
Install necessary packages:
@fullcalendar/core
@fullcalendar/daygrid
axios
bcryptjs
connect-mongo
dotenv
ejs
express
express-session
mongoose
passport
passport-local
eslint

sh
Copy code
npm install
Set up your environment variables:

Create a .env file in the root directory.
Add the following lines, updated with your details:

MONGODB_URI=your_mongodb_connection_string
PORT=3000
Start the server:

open command terminal
cd to the src folder in eduPlanner
node app.js
Navigate to http://localhost:3000 in your browser to start using EduPlanner.

Contributing
Feel free to fork the project and submit pull requests.

License
This project is licensed under the MIT License - see the LICENSE.md file for details.

Acknowledgments
Canvas API
Node.js
Express
MongoDB
