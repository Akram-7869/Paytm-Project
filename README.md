# 📱 **PAYTM-VENAMO-WALLET**

https://github.com/user-attachments/assets/51bda541-6815-484a-b9fc-3444e6b6850b

Welcome to the **Paytm**! This is a financial technology application that allows users to send, receive, and manage their balances seamlessly. Built with a focus on **security** and **scalability**.

## 🗂 **Table of Contents**
- [📱 **PAYTM**](#-paytm)
  - [🗂 **Table of Contents**](#-table-of-contents)
  - [🌟 **Introduction**](#-introduction)
  - [🚀 **Features**](#-features)
  - [🛠 **Tech Stack**](#-tech-stack)
  - [💻 **Installation**](#-installation)
    - [**Use Docker for Installation**](#use-docker-for-installation)
    - [**Or Follow These Steps:**](#or-follow-these-steps)
    - [Additional Notes](#additional-notes)
  - [📁 **Project Structure**](#-project-structure)
  - [🗄 **Database Schema**](#-database-schema)
  - [📦 **Modules**](#-modules)
    - [1. **Authentication**](#1-authentication)
    - [2. **P2P Transfer**](#2-p2p-transfer)
    - [3. **Balance Management**](#3-balance-management)
  - [☁️ **Deployment**](#️-deployment)
  - [📜 **License**](#-license)

## 🌟 **Introduction**

Venamo is a payment app that enables peer-to-peer (P2P) transactions, allowing users to transfer money easily and securely. Users can check their balances and view transaction histories. The app is built with Next.js for both the frontend and backend, and Prisma with PostgreSQL for the database. It utilizes Turborepo for efficient monorepo management, with Express.js handling webhooks.



## 🚀 **Features**
- **🔒 Secure Authentication**: Supports login with email and phone number as well as OAuth providers like Google.
- **💸 Real-time P2P Transfers**: Send and receive money between users.
- **📊 Balance Management**: Displays both available and locked balances.
- **📅 Transaction History**: Detailed transaction records, including timestamps and providers.

## 🛠 **Tech Stack**
- **Monorepo Management**: [Turborepo](https://turbo.build/repo/docs)
- **Frontend**: [Next.js](https://nextjs.org/)
- **Backend**:  [Next.js](https://nextjs.org/),[Node.js](https://nodejs.org/), [Express](https://expressjs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Recoil](https://recoiljs.org/)

Your installation instructions look clear and well-structured! However, there are a few minor improvements and clarifications that can enhance clarity and correctness. Here’s a refined version:

---

## 💻 **Installation**

### **Use Docker for Installation**
1. **Build the Docker image**:
    ```bash
    docker build -t image_name .
    ```
2. **Run the Docker container**:
    ```bash
    docker run -p 3000:3000 image_name
    ```

### **Or Follow These Steps:**

1. **Clone the repository**:
    ```bash
    git clone https://github.com/miravanisri/Venamo_PaymentApp.git
    cd Venamo_PaymentApp
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Configure environment variables**:
    Create a `.env` file in the project root and add the following variable:
    ```plaintext
    DATABASE_URL=your_database_url
    ```

4. **Set up the database**:
    ```bash
    npx prisma migrate dev --name init
    ```

5. **Generate the Prisma client**:
    ```bash
    npx prisma generate
    ```

6. **Seed the database with initial data**:
    ```bash
    npx prisma db seed
    ```

7. **Run the application**:
    ```bash
    npm run dev
    ```

---

### Additional Notes
- **Database URL**: Make sure to replace `your_database_url` with the actual database connection string.
- **Container Port**: Ensure that the application inside the Docker container is listening on port `3000`, as you are mapping it to the host.



## 📁 **Project Structure**
```plaintext
project-name/
├── apps
│   └── user-app    # Frontend built with Next.js
├── packages
│   ├── db          # Prisma and PostgreSQL database setup
│   └── store       # Recoil state management
├── components      # Reusable UI components
└── ...             # Other files and directories
```

## 🗄 **Database Schema**

```prisma
model User {
  id                Int                 @id @default(autoincrement())
  email             String?             @unique
  name              String?
  number            String              @unique
  password          String
  OnRampTransaction OnRampTransaction[]
  Balance           Balance[]
  sentTransfers     p2pTransfer[]       @relation(name: "FromUserRelation")
  receivedTransfers p2pTransfer[]       @relation(name: "ToUserRelation")
}

model Merchant {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  auth_type AuthType
}

model OnRampTransaction {
  id        Int          @id @default(autoincrement())
  status    OnRampStatus
  token     String       @unique
  provider  String
  amount    Int
  startTime DateTime
  userId    Int
  user      User         @relation(fields: [userId], references: [id])
}

model p2pTransfer {
  id         Int          @id @default(autoincrement())
  amount     Int
  timestamp  DateTime
  fromUserId Int
  fromUser   User         @relation(name: "FromUserRelation", fields: [fromUserId], references: [id])
  toUserId   Int
  toUser     User         @relation(name: "ToUserRelation", fields: [toUserId], references: [id])
}

model Balance {
  id     Int  @id @default(autoincrement())
  userId Int  @unique
  amount Int
  locked Int
  user   User @relation(fields: [userId], references: [id])
}

enum AuthType {
  Google
  Github
}

enum OnRampStatus {
  Success
  Failure
  Processing
}


```

## 📦 **Modules**

### 1. **Authentication**
- **OAuth & Credentials Provider**: Login via email/phone or Google using secure `bcrypt` hashing for password storage.

### 2. **P2P Transfer**
- **Real-time Transfers**: Allows users to send money to other users by providing their phone number.
- **Transaction Logs**: Keeps track of all the user’s transactions.

### 3. **Balance Management**
- **Available and Locked Balances**: Displays the current balance with details about locked funds.

## ☁️ **Deployment**

1. **Frontend**: Deploy the Next.js frontend on [Vercel](https://vercel.com/).
2. **Backend**: Host the backend on [Heroku](https://www.heroku.com/) or [DigitalOcean](https://www.digitalocean.com/).
3. **Database**: Use [NeonDB](https://neon.tech/) or [Aiven](https://aiven.io/) for PostgreSQL hosting.


## 📜 **License**
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
