# NeXa BuY - E-commerce Platform

🔗 **Live Demo:** [https://job-task-again.web.app/](https://job-task-again.web.app/)

## 📋 Project Overview

NeXa BuY is a modern, full-stack e-commerce platform built with React and Firebase. It provides a complete shopping experience with user authentication, product management, shopping cart functionality, and secure payment processing. The application features role-based access control for users, sellers, and administrators.

## ✨ Key Features

### 🔍 **Search & Filter System**
- **Advanced Search:** Find products quickly with intelligent search functionality
- **Price Sorting:** Sort products by price (high to low, low to high)
- **Smart Categorization:** Filter by price range, brand name, and product categories
- **Multi-category Selection:** Choose from multiple product categories simultaneously

### 👤 **User Management**
- **Secure Authentication:** Firebase-powered login/registration system
- **Role-based Access Control:** Three user roles (User, Seller, Admin)
- **Protected Routes:** Secure access to user-specific features
- **Profile Management:** User profile and account management

### 🛒 **Shopping Experience**
- **Interactive Shopping Cart:** Add/remove products with real-time updates
- **Product Management:** CRUD operations for product listings
- **Purchase History:** Track all user transactions and orders
- **Wishlist Functionality:** Save favorite products for later

### 💳 **Payment & Orders**
- **Secure Payment Processing:** Integrated payment gateway
- **Order Management:** Complete order tracking system
- **Payment Status:** Success, failure, and cancellation handling
- **Transaction History:** Detailed payment records

### 📊 **Dashboard System**
- **User Dashboard:** Personal cart, history, and profile management
- **Seller Dashboard:** Product management and sales analytics
- **Admin Dashboard:** User management and platform oversight
- **Analytics & Reports:** Sales data and user statistics

## 🛠️ Technology Stack

### **Frontend**
- **React 18.3.1** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Beautiful UI components
- **Framer Motion** - Smooth animations and transitions

### **Backend & Database**
- **Firebase Authentication** - Secure user authentication
- **Firestore Database** - NoSQL cloud database
- **Firebase Hosting** - Fast and secure web hosting

### **State Management & Data**
- **TanStack React Query** - Server state management
- **React Hook Form** - Efficient form handling
- **Axios** - HTTP client for API requests

### **UI/UX Libraries**
- **React Icons** - Comprehensive icon library
- **Lottie React** - High-quality animations
- **Swiper** - Modern touch slider
- **React Hot Toast** - Beautiful notifications
- **SweetAlert2** - Elegant popup alerts
- **Recharts** - Responsive chart library

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Firebase account for backend services

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd job-task-again
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Create .env.local file and add Firebase configuration
   cp .env.example .env.local
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
src/
├── Components/          # Reusable UI components
│   ├── Navbar/         # Navigation component
│   ├── Footer/         # Footer component
│   ├── Sidebar/        # Sidebar navigation
│   └── Loading/        # Loading components
├── Pages/              # Application pages
│   ├── Home/           # Homepage
│   ├── Products/       # Product listing
│   ├── AddProduct/     # Add new product
│   ├── MyCart/         # Shopping cart
│   ├── Payment/        # Payment processing
│   ├── DashBoard/      # User dashboard
│   └── ManageAll/      # Admin management
├── Layout/             # Layout components
├── Routes/             # Routing configuration
├── Authentication/     # Auth logic
├── PrivateRoute/       # Route protection
├── Firebase/           # Firebase config
└── hooks/              # Custom React hooks
```

## 🔐 User Roles & Permissions

### **👤 Regular User**
- Browse and search products
- Add products to cart
- Make purchases
- View purchase history
- Manage profile

### **🏪 Seller**
- All user permissions
- Add new products
- Manage own products
- Update product information
- View sales analytics

### **👑 Administrator**
- All seller permissions
- Manage all users
- Platform oversight
- System analytics
- User role management

## 🌟 Key Highlights

- **Responsive Design:** Fully responsive across all devices
- **Modern UI/UX:** Clean, intuitive interface with smooth animations
- **Performance Optimized:** Fast loading with efficient state management
- **Secure:** Firebase authentication and secure payment processing
- **Scalable Architecture:** Modular component structure
- **SEO Friendly:** Optimized for search engines

## 📱 Responsive Design

The application is fully responsive and optimized for:
- 📱 Mobile devices (320px and up)
- 📱 Tablets (768px and up)
- 💻 Desktop (1024px and up)
- 🖥️ Large screens (1440px and up)

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🚀 Deployment

The application is deployed on Firebase Hosting:
- **Live URL:** [https://job-task-again.web.app/](https://job-task-again.web.app/)
- **Automatic Deployment:** Connected to Firebase CLI
- **SSL Certificate:** Secure HTTPS connection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

For any questions or support, please reach out through the application's help & support section.

---

**Built with ❤️ using React, Firebase, and modern web technologies**
