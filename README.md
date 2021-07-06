# efuture-assignment

## Quick Setup

Install packages 
```
npm install
```

## Run the App
```
npm run start
```

## Endpoints
```
http://localhost:9000/api/auth/register
http://localhost:9000/api/auth/login
http://localhost:9000/api/users/profile
http://localhost:9000/api/auth/logout
```

### User Register Endpoint
```
http://localhost:9000/api/auth/register

**Payload**

{
    "firstName": "John", 
    "lastName": "Doe",
    "email": "john.doe@mail.lk", 
    "password": "!Test@123123", 
    "rePassword": "!Test@123123"
}

validation rules.

1. firstName, email, password and rePassword are required fields.
2. email should be a vaild email
3. password and rePassword should be matched.
```

### User Login Endpoint
```
http://localhost:9000/api/auth/login

**payload**

{
    "email": "john.doe@mail.lk",
    "password": "!Test@123123"
}

```

### User information EndPoint
```
http://localhost:9000/api/users/profile

Authentication token should attached as a bearer token in header to access this endpoint
```

## Running Test Cases

```
npm run test
```
