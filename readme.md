# Coupon Service

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
4. [API Documentation](#api-documentation)
   - [Add Repeat Counts to a Coupon Code](#add-repeat-counts-to-a-coupon-code)
   - [Verify Coupon Code Validity](#verify-coupon-code-validity)
   - [Apply Coupon Code](#apply-coupon-code)
5. [Testing](#testing)
6. [Design Decisions and Trade-offs](#design-decisions-and-trade-offs)
7. [Scalability Considerations](#scalability-considerations)
8. [Contributing](#contributing)
9. [License](#license)

## Project Overview

This project enhances a SaaS platform providing "Coupon Code" services with a new feature to mitigate fraud using "repeat counts" - the number of times a coupon can be used. The system implements various repeat count configurations across user and time axes.

## Features

- Add repeat count configurations to coupon codes
- Verify coupon code validity
- Apply coupon codes with adherence to repeat count limits
- Supports multiple repeat count axes:
  - Global Total Repeat Count
  - User Total Repeat Count
  - User Daily Repeat Count
  - User Weekly Repeat Count

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/coupon-service.git
   cd coupon-service
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```

## API Documentation

### Add Repeat Counts to a Coupon Code

- **Endpoint:** `POST /api/coupons/repeat-counts`
- **Description:** Adds repeat count configuration to a coupon code
- **Request Body:**
  ```json
  {
    "couponCode": "SUMMER2023",
    "repeatCounts": {
      "globalTotal": 10000,
      "userTotal": 3,
      "userDaily": 1,
      "userWeekly": 1
    }
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Repeat counts added successfully"
  }
  ```

### Verify Coupon Code Validity

- **Endpoint:** `GET /api/coupons/verify/:couponCode`
- **Description:** Verifies if a coupon code is valid and adheres to repeat count configurations
- **Response:**
  ```json
  {
    "valid": true,
    "message": "Coupon code is valid"
  }
  ```

### Apply Coupon Code

- **Endpoint:** `POST /api/coupons/apply`
- **Description:** Applies a coupon code and updates repeat counts
- **Request Body:**
  ```json
  {
    "couponCode": "SUMMER2023",
    "userId": "user123"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Coupon applied successfully"
  }
  ```

## Testing

To run the unit tests:

```
npm test
```

To test the API using curl:

1. Add repeat counts to a coupon:
   ```
   curl -X POST http://localhost:3000/api/coupons/repeat-counts \
   -H "Content-Type: application/json" \
   -d '{"couponCode": "SUMMER2023", "repeatCounts": {"globalTotal": 10000, "userTotal": 3, "userDaily": 1, "userWeekly": 1}}'
   ```

2. Verify a coupon code:
   ```
   curl http://localhost:3000/api/coupons/verify/SUMMER2023
   ```

3. Apply a coupon code:
   ```
   curl -X POST http://localhost:3000/api/coupons/apply \
   -H "Content-Type: application/json" \
   -d '{"couponCode": "SUMMER2023", "userId": "user123"}'
   ```

## Design Decisions and Trade-offs

1. In-memory Database: We've used an in-memory database abstraction for quick development and testing. This allows for easy transition to a persistent store in the future.

2. Modular Architecture: The project is structured with separate modules for coupon management, validation, and application to improve maintainability and scalability.

3. Assumption: We assume that coupon codes are case-sensitive. This decision was made to provide more unique code possibilities but could be adjusted if needed.

## Scalability Considerations

1. Database Scaling: As the system grows, transitioning to a distributed database system might be necessary to handle increased load.

2. Caching: Implementing a caching layer (e.g., Redis) for frequently accessed coupon data could improve performance.

3. Rate Limiting: To prevent abuse, implementing rate limiting on API endpoints should be considered.

4. Horizontal Scaling: The server should be designed to allow for easy horizontal scaling to handle increased traffic.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.