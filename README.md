<h1>Meeting Room Booking System for Co-working spaces(SET-2)</h1>
<p>
  This booking system allows a co-working space to book meeting rooms for specific times and durations electronically.
</p>
<h2>Table of Contents</h2>
<ul>
  <li>Features</li>
  <li>Installation</li>
  <li>Usage</li>
  <li>API EndPoints</li>
  <li>Techonologies Used</li>
</ul>
<h2>Features</h2>
<ul>
  <li>User registration and authentication</li>
  <li>Room management</li>
  <li>Slots time</li>
  <li>Booking functionality for meating</li>
  <li>Soft delete for booking by admin</li>
  <li>Confirm booking by admin</li>
  <li>Password hasing</li>
  <li>Role based access</li>
</ul>
<h2>Installatin</h2>
<ul>
  <li>
    <h3>Clone the Repository</h3>
    <p>https://github.com/rupomhasan/Co-Working-Room-Booking-System.git</p>
  </li>
    <li>
    <h3>Install Dependencies</h3>
    <p>npm install</p>
  </li>
    <li>
    <h3>Start the Application</h3>
    <p>npm run start:dev</p>
  </li>
</ul>


<h2>Usage</h2>
<ul>
  <li>
    <h3>Register a User</h3>
    <p><strong>Route:</strong> /api/auth/signup (POST)</p>
  </li>
    <li>
    <h3>Login</h3>
    <p><b>Route:</b> /api/auth/login (POST)</p>
  </li>
    <li>
    <h3>Create a Booking</h3>
    <p><b>Route:</b> /api/bookings (POST)</p>
  </li>
    </li>
    <li>
    <h3>Get User Booking</h3>
    <p><b>Route : </b>/api/my-bookings(GET)</p>
  </li>
</ul>
<h2>Endpoints</h2>
<h3>User Authentication</h3>
<ul>
  <li>POST : /api/auth/singup  - Register a new user</li>
  <li>POST : /api/auth/login - Login a user</li>
</ul>
<h3>Room Management</h3>
  <ul>
  <li>POST : /api/rooms - Add a new room</li>
  <li>GET : /api/rooms - Get all rooms</li>
  <li>GET : /api/rooms/:id - Get room details</li>
  <li>PUT : /api/rooms/:id - Update room details</li>
  <li>DELETE : /api/rooms/:id - Delete a room</li>
  </ul>
<h3>Create Slots </h3>
<ul>
  <li>Post : /api/slots - Create time slots</li>
  <li>GET : /api/slots/availability Get available slots</li>
</ul>
<h3>Booking Management</h3>
<ul>
  <li>POST /api/bookings - Create a new booking</li>
  <li>GET /api/bookings - Get all bookings for a user</li>
  <li>/api/my-bookings - Get my-bookings</li>
  <li>PUT /api/bookings/:id - Update booking details</li>
  <li>DELETE /api/bookings/:id - Delete a booking</li>
</ul>

<h2>Techonologies Used</h2>
<ul>
<li>Node.js</li>
<li>Express.js</li>
  <li>TypeScript</li>
<li>MongoDB</li>
<li>Mongoose</li>
<li>JWT</li>
<li>Bcrypt</li>
<li>Zod</li>
  <li>Eslint</li>
</ul>
