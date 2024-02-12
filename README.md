
# socialmedia (Node.js application (Express) backend)

This app is a mock of social media. which have features like creating an account and uploading photos and videos. also interect with other users. this app uses passport js for authentication. 


## Requirements 
- 1 Mongo DB 
- 2 Node Js 


## Features
1) **Login/Signup**
  - Users can create accounts by signing up with their email.
  - Secure login to access the platform with personalized profiles.
2) **Create Posts with Photos and Videos**
- Users can share their experiences by creating posts with images and videos.
- An intuitive interface allows for easy multimedia content upload.
3) **View User Profiles**
- Explore other users' profiles to learn more about their interests and activities on the platform.
- Access a user's posted content and engagement.
4) **Search and Explore**
- Users can search for specific users using usernames.
- Explore a feed of contents from other users.
5) **Hashtags**
- Users can create and use hashtags to categorize their posts.
- Explore posts related to specific hashtags to discover content aligned with your interests.
5) **Stories**
- Users can upload short-lived stories that can be viewed by their followers.
- Engage with real-time updates and ephemeral content shared by others.

## Installation Guide
Follow these steps to set up and run the socialmedia  on your local environment:

**Step 1: Clone the Repository**

```bash
git clone https://github.com/ironsummit72/socialmedia.git
```

**Step 2: Navigate to the Project Directory**

```bash
cd socialmedia
```
**Step 3: Install Dependencies**
```bash
npm install
```
This command installs all the necessary dependencies for the project.

**Step 4: Copy Environment Variables**
Copy the environment variables from `example.env` to a new file named `.env` Customize the values in the `.env` file as needed.

```bash
cp example.env .env
```
**Step 5: Build Tailwind CSS**

Generate the Tailwind CSS file by running the following command:

```bash 
npx style
```
This command compiles the Tailwind CSS and creates the output.css file.

**Step 6: Start the Project**
Start the Social Media Platform by running the following command:

```bash
npm start
```
Visit http://localhost:3000 in your browser to access the platform.

That's it! You've successfully installed and set up the socialmedia express app on your local machine. If you encounter any issues during the installation process, feel free to reach out for assistance. Happy exploring!

## Usage
- Sign up for an account or log in if you already have one.
- Create engaging posts with photos and videos.
- Explore other users' profiles and discover new content.
- Use the search feature to find specific users.
- Create follow hashtags to stay connected with your interests.
- Share short-lived stories for a more dynamic experience.

## What's New
New Features:

1) **Stories Feature Added**
- Users can now upload short-lived stories, providing a more dynamic and real-time sharing experience.
- Stories can be viewed by followers and other users on the platform, enhancing engagement and interaction among users.

2) **Hashtags Feature Introduced**

- Users can create and utilize hashtags to categorize their posts.
- Explore posts related to specific hashtags to easily find and engage with content aligned with your interests.


## Upcoming Features
New Enhancements:
1) **Follow Hashtags**
 - Users will soon have the ability to follow their favorite hashtags.
 - Stay updated with the latest content related to your interests directly in your feed.
 2) **Explore Page with Followed Hashtags**
 - The Explore page will be enhanced to display posts related to the hashtags you are following.
 3)  **Personalized Feed with Similar Hashtags**
 - Your feed will be curated to include posts from different users that share similar hashtags with your interests.
 - Enhance your content discovery experience with a more personalized and relevant feed.
    
## Note 
This Social Media express app is a hobby project created for learning purposes. The primary goal of this project is to provide a practical hands-on experience for developers to explore and enhance their skills in web development, particularly in building social media applications.
Please keep in mind that this platform is not intended for production use and may have limitations in terms of scalability, security, and robustness. It is encouraged to use this project as a playground for experimentation, learning, and collaboration within the developer community.
Happy coding!

## Additional Notes

Ensure you have Node.js installed on your machine. If not, you can download it from https://nodejs.org/.

Review the package.json file for more details on available scripts and dependencies.

Feel free to customize the application according to your specific needs.

Happy coding!




