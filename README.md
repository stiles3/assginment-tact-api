# TACT API - NestJS GraphQL Application

## Overview
This is a NestJS-based GraphQL API for managing departments and sub-departments with user authentication. The application uses Prisma as the ORM and PostgreSQL as the database.

## Prerequisites
- Node.js (v16 or later)
- npm or yarn
- PostgreSQL database
- GraphQL client (like Apollo Studio or GraphQL Playground)

## Setup Instructions

### 1. Clone the repository
```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```

### 3. Set up environment variables
Create a `.env` file in the root directory with the following variables:

```env
JWT_REFRESH_TOKEN_SECRET=***
JWT_ACCESS_TOKEN_SECRET=***
JWT_REFRESH_TOKEN_EXPIRY=10h
JWT_ACCESS_TOKEN_EXPIRY=10h
FRONTEND_URL=***
DATABASE_URL=postgresql://username:password@localhost:5432/tact-api?schema=public
```

### 4. Database setup
- Ensure PostgreSQL is running
- Create a database named `tact-api`


### 5. Start the application
```bash
npm run start:dev
# or
yarn start:dev
```

The GraphQL playground will be available at http://localhost:3000/graphql

## Production Deployment
The API is also deployed on Render at:
https://assginment-tact-api.onrender.com/graphql

## Example Queries and Mutations

### Authentication

#### Login
```graphql
mutation LoginUser($loginUserInput: LoginUserInput!) {
  loginUser(loginUserInput: $loginUserInput) {
    status,
    message,
    data {
      user {
        id,
        username
      }
      token
    }
  }
}
```

With variables:
```json
{
  "loginUserInput": {
    "username": "tinu",
    "password": "123456"
  }
}
```

#### Get Current User
```graphql
query GetUser {
  getUser {
    data {
      id
      username
    }
    message
    status
  }
}
```

### Department Operations

#### Create Department
```graphql
mutation CreateDepartment($createDepartmentInput: CreateDepartmentDto!) {
  createDepartment(createDepartmentInput: $createDepartmentInput) {
    data {
      id
      name
      subDepartments {
        id
        name
      }
    }
    message
    status
  }
}
```

With variables (simple department):
```json
{
  "createDepartmentInput": {
    "name": "Science"
  }
}
```

With variables (department with sub-departments):
```json
{
  "createDepartmentInput": {
    "name": "Science",
    "subDepartments": [
      { "name": "Biology" }
    ]
  }
}
```

#### Update Department
```graphql
mutation UpdateDepartment($updateDepartmentInput: UpdateDepartmentDto!) {
  updateDepartment(updateDepartmentInput: $updateDepartmentInput) {
    data {
      id
      name
    }
    message
    status
  }
}
```

With variables:
```json
{
  "updateDepartmentInput": {
    "id": "1",
    "name": "Health Department"
  }
}
```

#### Delete Department
```graphql
mutation DeleteDepartment($deleteDepartmentInput: DeleteDepartmentDto!) {
  deleteDepartment(deleteDepartmentInput: $deleteDepartmentInput) {
    message
    status
  }
}
```

With variables:
```json
{
  "deleteDepartmentInput": {
    "id": "2"
  }
}
```

### Sub-Department Operations

#### Add Sub-Department
```graphql
mutation AddSubDepartment($createSubDepartmentInput: CreateSubDepartmentDto!) {
  addSubDepartment(createSubDepartmentInput: $createSubDepartmentInput) {
    data {
      id,
      name 
    }
    message
    status
  }
}
```

With variables:
```json
{
  "createSubDepartmentInput": {
    "departmentId": "1",
    "name": "Nose"
  }
}
```

#### Update Sub-Department
```graphql
mutation UpdateSubDepartment($updateSubDepartmentInput: UpdateSubDepartmentDto!) {
  updateSubDepartment(updateSubDepartmentInput: $updateSubDepartmentInput) {
    message
    status
  }
}
```

With variables:
```json
{
  "updateSubDepartmentInput": {
    "id": "1",
    "name": "Eyes and brows"
  }
}
```

#### Delete Sub-Department
```graphql
mutation DeleteSubDepartment($deleteDepartmentInput: DeleteDepartmentDto!) {
  deleteSubDepartment(deleteDepartmentInput: $deleteDepartmentInput) {
    message
    status
  }
}
```

With variables:
```json
{
  "deleteDepartmentInput": {
    "id": "2"
  }
}
```

## Troubleshooting
- If you encounter database connection issues, verify your `DATABASE_URL` in the `.env` file
- Ensure all required environment variables are set
- Ensure you have created your database
- Check the console logs for detailed error messages