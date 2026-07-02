<div align="center">

# 🤖 Multi-Tenant WhatsApp AI Agent

### AI-Powered Multi-Tenant Customer Support Platform using WhatsApp Cloud API, LangGraph & Gemini AI

<p align="center">

![Node.js](https://img.shields.io/badge/Node.js-22.x-green?style=for-the-badge&logo=node.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Express](https://img.shields.io/badge/Express.js-Backend-black?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)
![LangGraph](https://img.shields.io/badge/LangGraph-AI-purple?style=for-the-badge)
![Gemini](https://img.shields.io/badge/Gemini-2.5%20Flash-blue?style=for-the-badge)
![WhatsApp](https://img.shields.io/badge/WhatsApp-Cloud_API-25D366?style=for-the-badge&logo=whatsapp)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=for-the-badge&logo=docker)
![Render](https://img.shields.io/badge/Render-Deployed-46E3B7?style=for-the-badge)
![Vercel](https://img.shields.io/badge/Vercel-Frontend-black?style=for-the-badge&logo=vercel)

</p>

*A production-ready AI-powered WhatsApp customer support platform designed with a multi-tenant architecture. Each business maintains its own AI assistant, media library, customer sessions, and conversation history while sharing a common backend.*

---

</div>

# 📌 Project Overview

The **Multi-Tenant WhatsApp AI Agent** is an intelligent customer support platform that enables multiple businesses to automate customer conversations using **WhatsApp Cloud API**, **LangGraph**, and **Google Gemini AI**.

Instead of building separate chatbot systems for each company, this platform allows multiple organizations to share a single backend while keeping their data, AI behavior, conversations, and media completely isolated.

Each tenant has its own:

- 🏢 Business Profile
- 🤖 AI Personality (System Prompt)
- 📂 Media Library
- 💬 Customer Sessions
- 📄 Catalogs & Documents
- 🖼 Product Images
- 📊 Dashboard Analytics

The platform automatically receives customer messages from WhatsApp, processes them through a LangGraph workflow, generates intelligent responses using Gemini AI, and replies with text, catalogs, images, or escalates the conversation to a human agent when required.

---

# 🎯 Objectives

This project demonstrates:

- Building AI-powered customer support systems
- Multi-Tenant SaaS architecture
- Workflow orchestration using LangGraph
- Integration with WhatsApp Cloud API
- Session and conversation management
- AI-assisted customer interactions
- Full-stack application development
- Cloud deployment using Docker

---

# ✨ Key Features

## 🏢 Multi-Tenant Architecture

Each business operates independently while sharing a common backend.

Features include:

- Tenant-specific AI assistants
- Independent media libraries
- Dedicated customer sessions
- Separate conversation history
- Isolated WhatsApp Business Numbers

---

## 🤖 AI-Powered Customer Support

Powered by **Google Gemini 2.5 Flash**.

The AI can:

- Answer customer questions
- Recommend products
- Explain services
- Share catalogs
- Share product images
- Escalate to human support
- Maintain conversation context

---

## 🔄 LangGraph Workflow

Customer conversations are processed through a structured AI workflow.

```
Incoming Message
        │
        ▼
Acknowledge Node
        │
        ▼
Context Retriever
        │
        ▼
Gemini Reasoning
        │
        ▼
Dispatcher
        │
        ▼
WhatsApp Response
```

This modular architecture keeps AI reasoning separate from business logic, making the system easier to maintain and extend.

---

## 💬 WhatsApp Cloud API Integration

The backend integrates directly with Meta's WhatsApp Cloud API.

Supported capabilities:

- Receive incoming messages
- Send AI-generated replies
- Send product catalogs (PDF)
- Send product images
- Read receipts
- Webhook verification
- Session tracking

---

## 📄 Media Support

The AI can automatically send business assets such as:

- Furniture Catalogs
- Service Price Lists
- Invoices
- Repair Images
- Product Photos

Media is selected dynamically based on the active tenant.

---

## 👨‍💼 Human Handoff

When the AI determines that a human representative is required, the conversation is automatically marked for escalation.

Supported session states:

- WAITING_FOR_BOT
- AGENT_RESPONDING
- RESOLVED
- NEEDS_HUMAN

---

## 📊 Admin Dashboard

The React dashboard allows administrators to monitor customer conversations in real time.

Features include:

- Tenant Switching
- Session Management
- Live Conversation Viewer
- Statistics Dashboard
- Broadcast Messaging
- Customer History
- AI Response Tracking

---

## 📢 Broadcast Messaging

Businesses can send promotional or informational messages to multiple customers from a centralized interface.

---

## 🐳 Docker Support

The backend is containerized using Docker, enabling consistent deployment across development and production environments.

---

# 🛠 Technology Stack

## Frontend

- React 19
- Vite
- Tailwind CSS
- Axios
- Lucide React

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

---

## Artificial Intelligence

- Google Gemini 2.5 Flash
- LangGraph

---

## APIs & Services

- WhatsApp Cloud API
- Meta Graph API

---

## Database

- MongoDB Atlas

---

## Deployment

- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas
- Containerization → Docker

---

# 🏗 High-Level System Architecture

```text
                    Customer
                        │
                        ▼
              WhatsApp Cloud API
                        │
                        ▼
                Webhook Controller
                        │
                        ▼
              Tenant Resolution
                        │
                        ▼
           Session Management
                        │
                        ▼
                 LangGraph Flow
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
 Acknowledge     Context Loader   Gemini AI
        │              │              │
        └──────────────┼──────────────┘
                       ▼
                 Dispatcher Node
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
      Text Reply   Image Reply   PDF Catalog
                       │
                       ▼
              WhatsApp Cloud API
                       │
                       ▼
                   Customer
```

---

# 🌟 Highlights

- ✅ Multi-Tenant SaaS Architecture
- ✅ AI-Powered Customer Support
- ✅ LangGraph Workflow Orchestration
- ✅ Google Gemini Integration
- ✅ WhatsApp Cloud API
- ✅ Dockerized Backend
- ✅ Real-Time Dashboard
- ✅ Session Lifecycle Management
- ✅ Media-Based Responses
- ✅ Human Handoff
- ✅ MongoDB Persistence
- ✅ Cloud Deployment

---

# 📂 Project Structure

```
multi-tenant-whatsapp-agent/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── graph/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── server.js
│   │
│   ├── uploads/
│   ├── Dockerfile
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── assets/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── docs/
│
└── README.md
```

---

# 🏗 Backend Architecture

The backend follows a modular architecture where each component has a single responsibility.

```
Backend
│
├── Configuration
│
├── Controllers
│
├── Routes
│
├── Models
│
├── LangGraph Workflow
│
├── AI Services
│
├── WhatsApp Integration
│
└── Media Library
```

This separation makes the application scalable, maintainable, and easy to extend.

---

# 📦 Backend Modules

## Configuration

```
config/
```

Responsible for:

- MongoDB Connection
- Environment Configuration

---

## Controllers

```
controllers/
```

Business logic lives here.

### webhookController

Responsible for:

- Receiving WhatsApp Webhooks
- Verifying Webhook Requests
- Finding the correct Tenant
- Finding or Creating Sessions
- Saving Customer Messages
- Invoking LangGraph
- Sending AI Responses

---

### tenantController

Responsible for:

- Creating Tenants
- Retrieving Tenant Details
- Managing Business Configurations

---

### sessionController

Responsible for:

- Creating Customer Sessions
- Updating Session Status
- Retrieving Active Sessions

---

### messageController

Responsible for:

- Storing Messages
- Retrieving Chat History

---

### campaignController

Responsible for:

- Broadcast Messaging
- Campaign Management

---

# 🧠 LangGraph Workflow

The AI pipeline is completely separated from the API layer.

```
graph/
│
├── graph.js
├── state.js
└── nodes/
```

Workflow:

```
START
   │
   ▼
Acknowledge Node
   │
   ▼
Context Retriever
   │
   ▼
Reasoning Node
   │
   ▼
Dispatcher Node
   │
   ▼
END
```

---

## Acknowledge Node

Responsibilities:

- Initial workflow entry
- Placeholder for typing indicators
- Future logging

---

## Context Retriever Node

Loads:

- Tenant Details
- System Prompt
- Media Library
- Previous Conversation History

This provides Gemini with the necessary business context before generating a response.

---

## Reasoning Node

Responsible for:

- Building AI Prompt
- Calling Gemini AI
- Parsing JSON Response
- Determining Response Type

Possible response types:

- text
- catalog
- image
- human

---

## Dispatcher Node

Converts AI decisions into executable actions.

Example:

```
responseType = "catalog"
```

↓

```
SEND_CATALOG
```

Responsibilities:

- Execute Actions
- Save Bot Responses
- Update Session Status
- Return Final Action

---

# ⚙ Services

The Services layer separates external integrations from business logic.

```
services/
│
├── llmService.js
├── whatsappService.js
└── actions/
```

---

## llmService

Responsibilities:

- Build AI Prompt
- Call Gemini API
- Parse AI JSON Response

---

## whatsappService

Handles all communication with the WhatsApp Cloud API.

Supported operations:

- Send Text
- Send Images
- Send Documents
- Read Receipts

---

## Action Layer

Instead of placing business logic inside controllers, actions are separated into dedicated modules.

```
actions/
```

Contains:

- textAction
- imageAction
- catalogAction
- humanAction

Benefits:

- Cleaner code
- Better maintainability
- Easier testing
- Extensible architecture

---

# 🗄 Database Design

MongoDB Atlas stores all application data.

Collections:

```
Tenant

Session

Message

Campaign
```

---

## Tenant Collection

Stores:

- Business Name
- AI System Prompt
- WhatsApp Phone Number ID
- Display Phone Number
- Media Library

Example:

```
Furniture Store

↓

Catalog.pdf

↓

Sofa.jpg

↓

DiningTable.jpg
```

---

## Session Collection

Represents an active customer conversation.

Stores:

- Customer Phone Number
- Tenant
- Session Status
- Updated Timestamp

Supported states:

```
WAITING_FOR_BOT

↓

AGENT_RESPONDING

↓

RESOLVED
```

or

```
WAITING_FOR_BOT

↓

NEEDS_HUMAN
```

---

## Message Collection

Every customer and AI message is persisted.

Stores:

- Sender
- Message
- Message Type
- Media URL
- Timestamp

Supported message types:

- text
- image
- catalog
- human

---

## Campaign Collection

Stores broadcast campaigns.

Future improvements include:

- Delivery Status
- Success Count
- Failed Count
- Scheduling

---

# 🎨 Frontend Architecture

The frontend is built using React with reusable components.

```
Frontend

│

├── Navbar

├── Tenant Switcher

├── Statistics Cards

├── Broadcast Drawer

├── Session List

├── Chat Window

└── Message Bubble
```

---

## Dashboard

Acts as the central orchestration layer.

Responsibilities:

- Load Tenants
- Load Sessions
- Load Messages
- Auto Refresh
- Maintain Selected Session

---

## Session List

Displays:

- Customer Phone Number
- Session Status
- Last Updated Time

Supports:

- Searching
- Session Selection
- Status Indicators

---

## Chat Window

Displays:

- Complete Conversation
- User Messages
- AI Responses
- Auto Scroll
- Empty State

---

## Message Bubble

Supports multiple message types:

- Text
- Catalog
- Images
- Human Support

Displays:

- Sender
- Timestamp
- Download Button
- Image Preview

---

## Statistics Dashboard

Displays live metrics:

- Active Sessions
- Waiting Sessions
- Human Escalations
- Resolved Sessions

---

# 🔄 Complete Request Lifecycle

```
Customer

│

▼

WhatsApp Cloud API

│

▼

Webhook Controller

│

▼

Resolve Tenant

│

▼

Create / Find Session

│

▼

Save Customer Message

│

▼

LangGraph

│

├── Context Retrieval

├── Gemini AI

└── Dispatcher

│

▼

Save Bot Response

│

▼

Send WhatsApp Reply

│

▼

Customer Receives Response
```

---

# 🏛 Design Principles

This project follows several software engineering best practices:

- Modular Architecture
- Separation of Concerns
- Single Responsibility Principle
- Reusable Components
- Layered Backend Design
- AI Workflow Isolation
- RESTful API Design
- Multi-Tenant Data Isolation
- Stateless API Architecture
- Containerized Deployment
---

# 🚀 Getting Started

Follow these steps to run the project locally.

---

# 📋 Prerequisites

Before starting, make sure you have the following installed:

- Node.js 22+
- pnpm
- npm
- MongoDB Atlas Account
- Meta Developer Account
- WhatsApp Cloud API
- Google AI Studio API Key (Gemini)
- Git
- Docker (Optional)

---

# 📥 Clone Repository

```bash
git clone https://github.com/<your-github-username>/multi-tenant-whatsapp-agent.git

cd multi-tenant-whatsapp-agent
```

---

# 📦 Backend Setup

Navigate to the backend folder.

```bash
cd backend
```

Install dependencies.

```bash
pnpm install
```

Create a `.env` file.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

GEMINI_API_KEY=your_gemini_api_key

WHATSAPP_TOKEN=your_whatsapp_cloud_api_token

PHONE_NUMBER_ID=your_phone_number_id

VERIFY_TOKEN=your_verify_token

BASE_URL=http://localhost:5000
```

Start the backend.

```bash
pnpm start
```

The backend will run on

```
http://localhost:5000
```

---

# 🎨 Frontend Setup

Navigate to frontend.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Run the development server.

```bash
npm run dev
```

The frontend runs on

```
http://localhost:5173
```

---

# 🐳 Docker Support

The backend is fully containerized using Docker.

## Build Docker Image

```bash
docker build -t whatsapp-agent .
```

---

## Run Container

```bash
docker run -p 5000:5000 whatsapp-agent
```

---

## Docker Workflow

```
Source Code

↓

Docker Image

↓

Docker Container

↓

Render Deployment
```

Docker ensures a consistent environment across development and production.

---

# ☁ Deployment

The application is deployed across multiple cloud services.

---

## Frontend

Hosted on

**Vercel**

Responsibilities

- React Application
- Dashboard
- Admin Interface

---

## Backend

Hosted on

**Render**

Responsibilities

- REST APIs
- LangGraph Workflow
- WhatsApp Integration
- AI Processing

---

## Database

Hosted on

**MongoDB Atlas**

Stores

- Tenants
- Sessions
- Messages
- Campaigns

---

# 🌍 Deployment Architecture

```
                 React Dashboard
                     (Vercel)

                         │

                         ▼

               Express Backend
                   (Render)

                         │

      ┌──────────────────┼──────────────────┐

      ▼                  ▼                  ▼

MongoDB Atlas      Gemini AI       WhatsApp Cloud API

                                         │

                                         ▼

                                   Customer
```

---

# 🔐 Environment Variables

The backend requires the following environment variables.

| Variable | Description |
|-----------|-------------|
| PORT | Server Port |
| MONGODB_URI | MongoDB Atlas Connection String |
| GEMINI_API_KEY | Google Gemini API Key |
| WHATSAPP_TOKEN | WhatsApp Cloud API Access Token |
| PHONE_NUMBER_ID | WhatsApp Phone Number ID |
| VERIFY_TOKEN | Meta Webhook Verification Token |
| BASE_URL | Backend Public URL |

---

# 📁 Uploads

Each tenant has its own media library.

Example:

```
uploads/

├── furniture/

│   ├── catalog.pdf

│   ├── sofa.jpg

│   └── dining-table.jpg

│

└── automotive/

    ├── invoice.pdf

    ├── repair.jpg

    └── service-list.pdf
```

Media is automatically selected based on the active tenant.

---

# 🔄 WhatsApp Webhook Configuration

Configure the Meta Webhook using:

### Callback URL

```
https://your-backend-url/webhook
```

---

### Verify Token

```
whatsapp_agent_verify
```

---

Subscribe to:

- messages

The backend automatically handles

- Verification
- Incoming Messages
- Status Updates

---

# 🧪 Testing

The platform has been tested for:

✅ Webhook Verification

✅ Incoming WhatsApp Messages

✅ AI Responses

✅ Image Replies

✅ PDF Catalog Replies

✅ Human Escalation

✅ Session Persistence

✅ Multi-Tenant Isolation

✅ Dashboard Updates

---

# 📊 Performance

Current workflow

```
Incoming Message

↓

Webhook

↓

Database Lookup

↓

Context Retrieval

↓

Gemini AI

↓

Dispatcher

↓

WhatsApp API

↓

Customer
```

Typical response time

```
2–5 seconds
```

depending on Gemini response time.

---

# 🔒 Security

The project follows several security practices.

- Environment Variables
- MongoDB Atlas Authentication
- Webhook Verification
- WhatsApp Access Token Authentication
- Tenant Isolation
- Dockerized Deployment

---

# 🛠 Troubleshooting

## Webhook Verification Failed

Possible causes

- Incorrect Verify Token
- Wrong Callback URL

---

## Authentication Error (190)

Possible causes

- Expired WhatsApp Token

Solution

Generate a new temporary token or configure a permanent access token.

---

## Document Link Invalid

Possible causes

- Incorrect BASE_URL
- Missing uploaded file
- Invalid media URL

---

## Tenant Not Found

Ensure the tenant's

```
phoneNumberId
```

matches the WhatsApp Business Phone Number ID received from Meta.

---

# 📦 Production Checklist

- ✅ Dockerized Backend
- ✅ Environment Variables Configured
- ✅ MongoDB Atlas Connected
- ✅ Render Deployment
- ✅ Vercel Deployment
- ✅ WhatsApp Webhook Verified
- ✅ Gemini API Connected
- ✅ Media Uploads Configured
- ✅ Dashboard Working
- ✅ Multi-Tenant Isolation Verified
---

# 📡 REST API Endpoints

## Tenant APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/tenants` | Retrieve all tenants |
| POST | `/api/tenants` | Create a new tenant |

---

## Session APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/sessions` | Retrieve all customer sessions |
| POST | `/api/sessions` | Create a session |

---

## Message APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/messages` | Retrieve conversation history |
| POST | `/api/messages` | Save a message |

---

## Campaign APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/campaigns` | Broadcast a campaign |

---

## Agent APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/agent` | AI Agent interaction |

---

## Webhook APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/webhook` | Meta Webhook Verification |
| POST | `/webhook` | Receive WhatsApp Messages |

---

# 📸 Screenshots

## 🏠 Dashboard

> _Add your Dashboard screenshot here_

---

## 💬 Live Chat

> _Add WhatsApp conversation screenshot here_

---

## 📊 Session Management

> _Add session list screenshot here_

---

## 📢 Broadcast Panel

> _Add campaign drawer screenshot here_

---

## 📄 Catalog Response

> _Add PDF catalog reply screenshot here_

---

## 🖼 Image Response

> _Add product image reply screenshot here_

---

# 📚 Documentation

Detailed documentation is available inside the **docs/** directory.

```
docs/

├── architecture.md

├── database_design.md

├── langgraph_flow.md

└── images/
```

These documents explain:

- Overall System Architecture
- Database Design
- LangGraph Workflow
- Internal AI Processing

---

# 🎯 Learning Outcomes

This project demonstrates practical experience with:

- Multi-Tenant SaaS Architecture
- REST API Development
- LangGraph Workflow Design
- Prompt Engineering
- AI Workflow Orchestration
- Google Gemini Integration
- WhatsApp Cloud API
- MongoDB Data Modeling
- Docker Containerization
- Cloud Deployment
- React Dashboard Development
- Session Management
- Broadcast Messaging
- Media Handling
- Production Debugging

---

# 🚀 Future Improvements

Planned enhancements include:

### AI

- Conversation Memory
- RAG-based Knowledge Retrieval
- FAQ Embeddings
- Sentiment Analysis
- Intent Classification

---

### WhatsApp

- Template Messages
- Interactive Buttons
- Quick Replies
- Carousel Messages
- Audio Responses
- Voice Notes

---

### Dashboard

- Login Authentication
- Role-Based Access Control
- Dark Mode
- Analytics Dashboard
- Charts & Reports
- Search & Filters
- Export Conversations

---

### Backend

- Redis Caching
- Queue Processing
- Rate Limiting
- API Versioning
- Logging with Winston
- Unit Tests
- Integration Tests
- Swagger Documentation

---

### DevOps

- GitHub Actions CI/CD
- Kubernetes Deployment
- Nginx Reverse Proxy
- AWS Deployment
- Monitoring
- Docker Compose

---

# 🏆 Project Highlights

✔ Multi-Tenant SaaS Platform

✔ WhatsApp Cloud API Integration

✔ LangGraph Workflow

✔ Google Gemini AI

✔ Dockerized Backend

✔ React Dashboard

✔ Session Lifecycle Management

✔ Broadcast Messaging

✔ Human Handoff

✔ Dynamic Media Library

✔ MongoDB Atlas

✔ Cloud Deployment

✔ Production Ready Architecture

---

# 📈 Skills Demonstrated

### Backend

- Node.js
- Express.js
- REST APIs
- MongoDB
- Mongoose
- Docker
- Webhooks

---

### Artificial Intelligence

- LangGraph
- Prompt Engineering
- Gemini AI
- AI Workflow Design

---

### Frontend

- React
- Vite
- Axios
- Tailwind CSS

---

### Cloud

- Render
- Vercel
- MongoDB Atlas
- Docker

---

### Software Engineering

- Layered Architecture
- Modular Design
- MVC Pattern
- SaaS Design
- Multi-Tenant Systems
- Session Management
- Production Deployment

---

# 🤝 Contributing

Contributions are welcome.

If you would like to improve this project:

1. Fork the repository.

2. Create a feature branch.

```bash
git checkout -b feature/new-feature
```

3. Commit your changes.

```bash
git commit -m "Added new feature"
```

4. Push your branch.

```bash
git push origin feature/new-feature
```

5. Open a Pull Request.

---

# 👨‍💻 Author

**Sameed**

B.Tech Artificial Intelligence

SRM University AP

GitHub:

```
https://github.com/sksameed
```

LinkedIn:

```
www.linkedin.com/in/sk-sameed-0909s
```

---

# ⭐ Support

If you found this project useful:

⭐ Star the repository

🍴 Fork the repository

📢 Share it with others

---

# 📜 License

This project is licensed under the **MIT License**.

---

<div align="center">

## ⭐ Thank You for Visiting ⭐

If you like this project, don't forget to **Star ⭐ the repository.**

Made with ❤️ using

**React • Node.js • Express • MongoDB • LangGraph • Gemini AI • WhatsApp Cloud API • Docker**

</div>