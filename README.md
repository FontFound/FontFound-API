# FontFound API

![FontFound API](https://res.cloudinary.com/dyg5rtwwe/image/upload/v1733753082/rhwrs4hfyeifxivof3oy.png)

FontFound API is a backend service built using **TypeScript**, **NestJS**, and **Prisma**, designed to power the FontFound application. This repository provides a fully containerized environment using **Docker** and an automated CI/CD pipeline with **GitHub Actions** for deployment to **Google Cloud Run**.

---

## Features

- **NestJS Framework**: Modular and efficient API architecture.
- **Prisma ORM**: Powerful database interaction with schema-based type safety.
- **Docker Support**: Consistent and portable containerized deployments.
- **GitHub Actions**: Streamlined CI/CD for automated testing and deployment.
- **Google Cloud Run**: Serverless application hosting with scalable infrastructure.

---

## Prerequisites

To set up the project locally or for deployment, ensure the following tools are installed:

1. **Node.js** (v16 or higher)  
   - [Download Node.js](https://nodejs.org/)
   
2. **Docker**  
   - [Install Docker](https://www.docker.com/get-started)
   
3. **Google Cloud SDK**  
   - [Install Google Cloud SDK](https://cloud.google.com/sdk/docs/install)
   
4. **Git**  
   - [Install Git](https://git-scm.com/)

---

## Environment Variables

To configure the project, create a `.env` file in the root directory. Add the following environment variables:

```env
# Database connection URL
DATABASE_URL=your_database_connection_url

# Google Cloud Project credentials
PROJECT_ID=your_google_cloud_project_id
PRIVATE_KEY="your_google_cloud_service_account_private_key"
CLIENT_EMAIL=your_google_cloud_service_account_email

# Google Cloud Storage
STORAGE_MEDIA_BUCKET=your_google_cloud_storage_bucket_name
