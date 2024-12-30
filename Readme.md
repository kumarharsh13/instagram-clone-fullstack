# ChhaviAnvaya

## Overview

This project is a fully-functional social media platform built with a modern full-stack architecture. It mimics the core features of Instagram, allowing users to engage with content, interact with other users, and share multimedia posts. The platform includes functionalities such as liking, commenting, following/unfollowing, posting images and private messages, providing a dynamic and engaging social experience.

## Key Features

- **User Authentication**: Secure sign-up, login, and account management with email verification (upcoming feature) and password reset (upcoming feature) functionality.
- **Profile Management**: Users can create and edit their profiles, including uploading a profile picture, bio, and personal information.
- **Post Creation**: Users can post images with captions. Support for multiple formats (JPG and PNG).
- **Like & Comment**: Users can like and comment on posts, interact with content, and engage in discussions.
- **Follow/Unfollow**: Users can follow other users to see their posts in the feed and unfollow them when desired.
- **News Feed**: Personalized news feed displaying posts from followed users, with the ability to scroll, like, comment, and share (upcoming feature).
- **Search**: Search for users to discover new content.
- **Real-time Updates (upcoming feature)**: Notifications for likes, comments, follows, and other user interactions, with instant updates via WebSockets.
- **Real-Time Chat (upcoming feature)**: Direct messaging between user.
- **Backend Architecture**: Built using a robust backend with a RESTful API to handle user requests, posts, comments, and interactions securely.

## Tech Stack

- **Frontend**: React.js for dynamic user interfaces, styled with CSS3.
- **Backend**: Node.js with Express.js for API development and handling user authentication and data storage.
- **Database**: PostgreSQL for storing user data, posts, comments, likes, and relationships (followers/following).
- **Authentication**: JWT (JSON Web Tokens) for secure user authentication and session management.
- **File Storage**: Local storage for handling media uploads (images).
- **Real-Time Notifications**: Socket.io for real-time notifications and updates.
- **Real-Time Messaging**: Socket.io for instant messaging, ensuring real-time communication in chats.
