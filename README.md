# Forms Clone API

A RESTful API for managing forms and user sessions, built with Express.js. This API allows users to create, update, and manage forms with multiple question types and collect responses efficiently.

## Getting Started

### Prerequisites

* Node.js (v16 or higher)
* npm (v8 or higher)

### Installation

Clone the repository:

```sh
git clone https://github.com/BrigitaKasemets/FormsCloneAPI.git
cd FormsCloneAPI
```

Install dependencies:

```sh
npm install
```

### Start the server

```sh
npm run dev
```

Access the API at http://localhost:3000


## API Documentation

Access the interactive Swagger documentation at http://localhost:3000/api-docs/



### Authentication
Uses JWT (JSON Web Token) Bearer authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_token>
```