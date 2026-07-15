# U-CAB - MERN Stack Cab Booking Platform

U-CAB is a full-featured, modern cab booking application built on the MERN stack (MongoDB, Express.js, React.js, Node.js). It provides dedicated interfaces for Passengers, Drivers, and Administrators, with real-time ride tracking, secure authentication, and payment processing features.

## 🚀 Features

- **Passenger Portal**: Browse available cabs, search, filter by vehicle type and price, schedule rides, track drivers on an interactive map in real-time, and manage wallet and coupons.
- **Driver Portal**: Toggle online/offline status, receive incoming ride requests instantly, track daily earnings, view trip history, and update vehicle info.
- **Admin Dashboard**: Comprehensive management of the entire platform. Add and manage cab inventory, view all registered users and their details, monitor all platform rides, and view global statistics.
- **Real-Time WebSockets**: Powered by Socket.IO for instant ride request notifications and live location updates.
- **Premium Design**: Built using React, Bootstrap 5, and custom modern CSS for a premium UI experience.

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Bootstrap 5, React Router, Socket.IO Client, Leaflet (Maps), Recharts
- **Backend**: Node.js, Express, MongoDB Atlas, Mongoose, Socket.IO, JWT, bcryptjs
- **Deployment**: Configured for Render (Backend) and Netlify (Frontend)

## 📁 Folder Structure

```text
U-CAB/
├── client/                 # Frontend React Application
│   ├── public/             # Static assets (including _redirects for Netlify)
│   ├── src/                
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React Context (Auth, Socket, Ride, Theme)
│   │   ├── layouts/        # Layout wrappers (e.g., DashboardLayout)
│   │   ├── pages/          # Full page views (Login, Dashboards, RideDetails)
│   │   ├── services/       # API configuration and API calls
│   │   ├── utils/          # Map Icons and helpers
│   │   ├── App.jsx         # App routing
│   │   └── main.jsx        # App entry point
│   └── package.json        
├── server/                 # Backend Node/Express Application
│   ├── config/             # DB & Socket configuration
│   ├── controllers/        # Route controllers (Auth, Ride, Admin, etc.)
│   ├── middleware/         # Auth verification and Error handling
│   ├── models/             # Mongoose schemas
│   ├── routes/             # Express API routes
│   ├── utils/              # Constants and helpers
│   ├── seedCabs.js         # Database seeder for default cars
│   ├── server.js           # Server entry point
│   └── package.json        
└── README.md               # You are here!
```

## ⚙️ Development Setup

### 1. Backend Setup
```bash
cd server
npm install
# Create a .env file (see .env.example)
npm run seed  # To populate initial cars
npm run dev   # Starts the development server on port 5000
```

### 2. Frontend Setup
```bash
cd client
npm install
# Create a .env file (see .env.example)
npm run dev   # Starts Vite development server
```

## 🌐 Environment Variables

### Backend (`server/.env`)
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/ucab?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here
CLIENT_URL=http://localhost:5173 # Or your Netlify domain in production
NODE_ENV=development # Or production
```

### Frontend (`client/.env`)
```env
VITE_API_URL=http://localhost:5000/api # Or your Render URL in production
VITE_SOCKET_URL=http://localhost:5000  # Or your Render URL in production
```

## 🚀 Deployment Steps

This project is fully prepared for production deployment.

### 1. Database (MongoDB Atlas)
1. Create a free cluster on MongoDB Atlas.
2. In Network Access, whitelist `0.0.0.0/0` (or the IP of your Render server).
3. Get your connection string (URI) and replace `<username>` and `<password>`.

### 2. Backend (Render)
1. Push this repository to GitHub.
2. Create a new "Web Service" on Render and link the GitHub repository.
3. Configure the service:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add the Environment Variables to Render:
   - `PORT`: (Render will set this automatically)
   - `MONGO_URI`: Your MongoDB Atlas URI
   - `JWT_SECRET`: A secure random string
   - `CLIENT_URL`: `https://your-frontend.netlify.app` (You will set this after deploying Netlify)
   - `NODE_ENV`: `production`

### 3. Frontend (Netlify)
1. Log in to Netlify and click "Add new site" > "Import an existing project".
2. Select your GitHub repository.
3. Configure the build settings:
   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `client/dist`
4. Add the Environment Variables:
   - `VITE_API_URL`: `https://your-backend.onrender.com/api` (The URL Render gave you)
   - `VITE_SOCKET_URL`: `https://your-backend.onrender.com`
5. Click **Deploy site**.
6. *(Important)* Copy your final Netlify URL and update the `CLIENT_URL` environment variable in your Render backend settings so CORS will allow the requests.

## 🔮 Future Enhancements
- Live GPS tracking for drivers utilizing Geolocation API
- Email/SMS verification and notifications
- Payment Gateway Integration (Stripe/Razorpay)
