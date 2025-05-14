# Delivery Portal - Order Tracking API Documentation

This document outlines the API endpoints, request/response formats, and usage examples for the Order Tracking System within the Delivery Portal application.

## Table of Contents

- [Overview](#overview)
- [Authentication](#authentication)
- [Base URL](#base-url)
- [Endpoints](#endpoints)
  - [Update Tracking Information](#update-tracking-information)
  - [Get Tracking History](#get-tracking-history)
  - [Get Current Status](#get-current-status)
- [Data Models](#data-models)
- [Status Transitions](#status-transitions)
- [Error Handling](#error-handling)
- [Example Scenarios](#example-scenarios)

## Overview

The Order Tracking System enables real-time tracking of orders, including:
- Current location (coordinates and text description)
- Status updates with timestamps
- Estimated delivery time
- Delivery agent/person assignment

## Authentication

All tracking endpoints require authentication using JSON Web Tokens (JWT).

- Include the token in the request header as:
  ```
  Authorization: Bearer <your_jwt_token>
  ```

- Different endpoints have different role requirements:
  - **Shopkeeper**: Can update tracking information
  - **Customer/Shopkeeper**: Can view tracking history and current status for their own orders

## Base URL

```
https://your-domain.com/api/tracking
```

## Endpoints

### Update Tracking Information

Updates tracking details for an order including location, status, delivery agent, and estimated delivery time.

- **URL**: `/orders/:orderId`
- **Method**: `PUT`
- **Access**: Shopkeeper only
- **Parameters**:
  - `orderId` (path parameter): ID of the order to update

#### Request Body

```json
{
  "currentLocation": {
    "coordinates": [37.7749, -122.4194],
    "description": "In transit - Main St and Market Ave"
  },
  "statusUpdate": {
    "status": "out_for_delivery",
    "note": "Order has left the shop and is on the way"
  },
  "estimatedDeliveryTime": "2025-05-09T14:30:00Z",
  "deliveryAgent": {
    "id": "60d21b4667d0d8992e610c85",
    "name": "John Doe",
    "contact": "+1234567890"
  }
}
```

**Notes**:
- All fields are optional - include only what you want to update
- Only valid status transitions are allowed (see [Status Transitions](#status-transitions))

#### Response

```json
{
  "message": "Tracking information updated successfully",
  "order": {
    "_id": "60d21b4667d0d8992e610c85",
    "customerId": {
      "_id": "60d21b4667d0d8992e610c85",
      "name": "Jane Customer",
      "email": "jane@example.com"
    },
    "shopkeeperId": {
      "_id": "60d21b4667d0d8992e610c85",
      "name": "Shop Owner",
      "location": "Downtown"
    },
    "status": "out_for_delivery",
    "items": [...],
    "totalAmount": 45.90,
    "trackingDetails": {
      "currentLocation": {
        "coordinates": [37.7749, -122.4194],
        "description": "In transit - Main St and Market Ave"
      },
      "statusUpdates": [
        {
          "status": "pending",
          "timestamp": "2025-05-09T12:00:00Z",
          "note": "Order created"
        },
        {
          "status": "processing",
          "timestamp": "2025-05-09T12:30:00Z",
          "note": "Order is being prepared"
        },
        {
          "status": "out_for_delivery",
          "timestamp": "2025-05-09T13:15:00Z",
          "note": "Order has left the shop and is on the way"
        }
      ],
      "estimatedDeliveryTime": "2025-05-09T14:30:00Z",
      "deliveryAgent": {
        "id": "60d21b4667d0d8992e610c85",
        "name": "John Doe",
        "contact": "+1234567890"
      }
    },
    "createdAt": "2025-05-09T12:00:00Z"
  }
}
```

#### Error Responses

- `400 Bad Request`: Invalid input (coordinates, dates, status transitions)
- `401 Unauthorized`: Missing or invalid token
- `403 Forbidden`: User does not have required role
- `404 Not Found`: Order not found
- `500 Internal Server Error`: Server-side error

### Get Tracking History

Retrieves the full tracking history for an order.

- **URL**: `/orders/:orderId`
- **Method**: `GET`
- **Access**: Customer who placed the order, Shopkeeper who owns the order
- **Parameters**:
  - `orderId` (path parameter): ID of the order

#### Response

```json
{
  "orderId": "60d21b4667d0d8992e610c85",
  "status": "out_for_delivery",
  "trackingDetails": {
    "currentLocation": {
      "coordinates": [37.7749, -122.4194],
      "description": "In transit - Main St and Market Ave"
    },
    "statusUpdates": [
      {
        "status": "pending",
        "timestamp": "2025-05-09T12:00:00Z",
        "note": "Order created"
      },
      {
        "status": "processing",
        "timestamp": "2025-05-09T12:30:00Z", 
        "note": "Order is being prepared"
      },
      {
        "status": "out_for_delivery",
        "timestamp": "2025-05-09T13:15:00Z",
        "note": "Order has left the shop and is on the way"
      }
    ],
    "estimatedDeliveryTime": "2025-05-09T14:30:00Z",
    "deliveryAgent": {
      "id": "60d21b4667d0d8992e610c85",
      "name": "John Doe",
      "contact": "+1234567890"
    }
  },
  "customerInfo": {
    "_id": "60d21b4667d0d8992e610c85",
    "name": "Jane Customer",
    "email": "jane@example.com"
  },
  "shopkeeperInfo": {
    "_id": "60d21b4667d0d8992e610c85",
    "name": "Shop Owner",
    "location": "Downtown"
  },
  "createdAt": "2025-05-09T12:00:00Z"
}
```

#### Error Responses

- `400 Bad Request`: Invalid order ID format
- `401 Unauthorized`: Missing or invalid token
- `403 Forbidden`: Not authorized to view this order
- `404 Not Found`: Order not found
- `500 Internal Server Error`: Server-side error

### Get Current Status

Retrieves only the current status and essential tracking details for an order (lightweight response for frequent polling).

- **URL**: `/orders/:orderId/status`
- **Method**: `GET`
- **Access**: Customer who placed the order, Shopkeeper who owns the order
- **Parameters**:
  - `orderId` (path parameter): ID of the order

#### Response

```json
{
  "orderId": "60d21b4667d0d8992e610c85",
  "status": "out_for_delivery",
  "currentLocation": {
    "coordinates": [37.7749, -122.4194],
    "description": "In transit - Main St and Market Ave"
  },
  "estimatedDeliveryTime": "2025-05-09T14:30:00Z",
  "lastUpdated": "2025-05-09T13:15:00Z"
}
```

#### Error Responses

- Same as [Get Tracking History](#get-tracking-history)

## Data Models

### Tracking Details

```json
{
  "currentLocation": {
    "coordinates": [Number, Number], // [latitude, longitude]
    "description": String
  },
  "statusUpdates": [
    {
      "status": String,
      "timestamp": Date,
      "note": String
    }
  ],
  "estimatedDeliveryTime": Date,
  "deliveryAgent": {
    "id": ObjectId,
    "name": String,
    "contact": String
  }
}
```

### Status Values

- `pending`: Order has been created but not yet processed
- `processing`: Order is being prepared by the shop
- `out_for_delivery`: Order has left the shop and is on the way
- `delivered`: Order has been successfully delivered
- `cancelled`: Order has been cancelled

## Status Transitions

Only certain status transitions are allowed:

- `pending` → `processing`, `cancelled`
- `processing` → `out_for_delivery`, `cancelled`
- `out_for_delivery` → `delivered`, `cancelled`
- `delivered` → (no further transitions allowed)
- `cancelled` → (no further transitions allowed)

Attempts to make invalid transitions will result in a 400 Bad Request error.

## Error Handling

All API responses use standard HTTP status codes. Error responses include:

```json
{
  "message": "Error description",
  "error": "Detailed error information (in development mode)"
}
```

## Example Scenarios

### Complete Order Lifecycle

1. **Create Order**
   - Order created with initial status `pending`
   - Initial status update added to tracking history

2. **Start Processing**
   - Update status to `processing`
   - Add details about preparation

3. **Assign Delivery Agent**
   - Add delivery agent details
   - Set estimated delivery time

4. **Send Out for Delivery**
   - Update status to `out_for_delivery`
   - Update current location

5. **Location Updates**
   - Periodically update current location as order moves
   - No status change needed for these updates

6. **Mark as Delivered**
   - Update status to `delivered`
   - Final location update (delivery address)

### Cancellation Example

At any point before delivery:
- Update status to `cancelled`
- Include reason in the status update note

