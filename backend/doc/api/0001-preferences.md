# User Preferences API

Date: 2024-02-27

## Status

Implemented.

## Introduction

This API allows users to manage their preferences.

## Authentication

All endpoints require authentication via JSON Web Token (JWT).

## Base URL

`/api/v1/user/preferences`

## Endpoints

### Add User Preference

- **URL:** `/`
- **Method:** `POST`
- **Description:** Adds a new preference for the authenticated user.
- **Authentication:** Yes
- **Permissions:** Requires appropriate user permissions.
- **Request Body:**
  - Example:
    ```json
    {
      "name": "user_name",
      "email": "user_email",
      "user_id": "user_id",
      "picture": "optional_user_image"
    }
    ```
- **Response:**
  - **Status Code:** `200 OK`
  - **Content:** The added preference object.
  - Example:
    ```json
    {
      "status": "success",
      "preference": {
        "name": "user_name",
        "email": "user_email",
        "user_id": "user_id",
        "picture": "optional_user_image"
      }
    }
    ```

### Get User Preference

- **URL:** `/`
- **Method:** `GET`
- **Description:** Retrieves the preferences of the authenticated user.
- **Authentication:** Yes
- **Permissions:** Requires appropriate user permissions.
- **Response:**
  - **Status Code:** `200 OK`
  - **Content:** The user's preferences.
  - Example:
    ```json
    {
      "name": "user_name",
      "email": "user_email",
      "user_id": "user_id",
      "picture": "optional_user_image"
    }
    ```
