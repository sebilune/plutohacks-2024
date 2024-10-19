# SEMA: A PlutoHacks 2024 Project 🌈

## Overview

SEMA (Severe Emergency Management Application) is a sophisticated web application designed to deliver crucial emergency information during severe weather events. By leveraging multiple APIs, SEMA provides users with real-time data on dangerous weather conditions, nearby shelters, gas stations, and user-specific address information. Our goal is to ensure users have immediate access to vital information in times of crisis.

## Table of Contents

- [SEMA: A PlutoHacks 2024 Project 🌈](#sema-a-plutohacks-2024-project-)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [Key Features](#key-features)
  - [Technologies Used](#technologies-used)
    - [Frontend](#frontend)
    - [Backend \& APIs](#backend--apis)
    - [Additional Tools](#additional-tools)
  - [User Interaction](#user-interaction)
  - [Conclusion](#conclusion)

## Key Features

- **Emergency Weather Information**: Provides alerts from the National Weather Service (NWS) regarding hazardous weather conditions.
- **Nearby Resources**: Uses the Overpass API to find real-time locations of nearby shelters and gas stations.
- **Geolocation Services**: Retrieves the user’s full address via Nominatim from OpenStreetMap.
- **Interactive Mapping**: Displays relevant addresses on maps using the Places API for easy navigation.
- **Custom Chatbot**: A tailored chatbot powered by the OpenAI API to assist users with emergency-related queries.
- **PDF Data Generation**: Users can download a comprehensive PDF report with relevant data for their specific query.

## Technologies Used

### Frontend

- **React**: A JavaScript library for building user interfaces with a component-based architecture.
- **Vite**: A fast build tool that enables a smooth development experience with hot module replacement.
- **Pico CSS**: A lightweight CSS framework for basic styling, ensuring a clean design.
- **SCSS**: Used for extensive styling customizations to enhance the visual appeal of the application.

### Backend & APIs

- **OpenAI API**: Powers the intelligent chatbot functionality for user assistance during emergencies.
- **Overpass API**: Supplies real-time data about nearby shelters and gas stations.
- **Nominatim**: Provides geolocation services to obtain user addresses from their coordinates.
- **Chart.js**: A library for rendering dynamic charts that visualize weather data trends.
- **Axios**: A promise-based HTTP client used for API requests, facilitating streamlined data management.

### Additional Tools

- **HTML2PDF.js**: Generates downloadable PDF reports containing emergency data relevant to the user's location.
- **React Router DOM**: Manages routing and navigation within the application for an enhanced user experience.

## User Interaction

SEMA’s user experience begins with a single button on the home page, prompting users to share their location through the Geolocation API. The application then processes this data, fetching information from various APIs to generate a comprehensive report. Users can download this report as a PDF, ensuring they have all necessary information at their fingertips during emergencies.

## Conclusion

SEMA exemplifies full-stack development skills by integrating various technologies and APIs to deliver a robust emergency management solution. Developed during the Plutohacks 2024 hackathon, this project not only showcases technical proficiency but also emphasizes the importance of timely access to critical information during emergencies. SEMA aims to make a significant impact on emergency preparedness and response.

For further information or to contribute to the project, please reach out or visit our repository.
