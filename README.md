# Choco ONE Backend

Choco ONE Backend is a Strapi-based application that powers the handmade chocolate shop, Choco ONE. It provides APIs and an admin dashboard to manage products, orders, users, and content.

## Features

- 🍫 **Product Management**: Create and manage products with custom options and categories.
- 🛒 **Order Management**: Handle customer orders and track their status.
- 🔑 **User Management**: Manage user accounts, including authentication and permissions.
- ✉️ **Support Management**: Manage customer support requests.
- 📄 **Content Management**: Update static content pages such as About, Delivery, Privacy Policy, and Terms and Conditions.
- 🌍 **i18n Support**: Multi-language support using Strapi's i18n plugin.
- 📧 **Email Notifications**: Integrated with Nodemailer for sending transactional emails.
- ☁️ **Cloud Storage**: Cloudinary integration for handling media uploads.
- 🛠️ **Admin Dashboard**: Strapi admin panel for managing all content and data.

## Getting Started

### Prerequisites

- Node.js (v18.x to v20.x)
- Yarn or npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/nginv8/choco-one-server.git
   ```

2. Navigate to the project directory:

   ```bash
   cd choco-one-server
   ```

3. Install dependencies:

   ```bash
   yarn install
   ```

### Environment Configuration

Create a `.env` file in the root directory with the following variables:

```bash
# Server Configuration
HOST=0.0.0.0
PORT=1337
STRAPI_TELEMETRY_DISABLED=true

# Security Keys (replace with your own secure values)
APP_KEYS=your-app-key-1,your-app-key-2
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt
JWT_SECRET=your-jwt-secret

# Database Configuration
DATABASE_CLIENT=postgres
DATABASE_URL=postgres://username:password@localhost:5432/your-database-name
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=your-database-name
DATABASE_USERNAME=your-database-username
DATABASE_PASSWORD=your-database-password
DATABASE_FILENAME=./data.db  # Use for SQLite

# Email (SMTP) Configuration
SMTP_HOST=smtp.your-email-provider.com
SMTP_PORT=587
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password

# Cloudinary Configuration
CLOUDINARY_NAME=your-cloudinary-name
CLOUDINARY_KEY=your-cloudinary-api-key
CLOUDINARY_SECRET=your-cloudinary-api-secret
CLOUDINARY_URL=cloudinary://your-cloudinary-url

```

Scripts
Start the development server.

```bash
yarn install
```

Build the application for production.

```bash
yarn install
```

Start the application in production mode

```bash
yarn install
```

Deployment
The backend is deployed using Render. You can use the provided configuration and environment variables to set up your own deployment.
