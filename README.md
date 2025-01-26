# BlogOp

BlogOp is a modern and feature-rich blog application built using Next.js. It allows users to explore the latest posts, manage their own blogs, and enjoy a seamless reading and writing experience.

[**Live Demo**](https://blogop.vercel.app)

## 🚀 Features

- **User Authentication**: Secure login and signup functionality using NextAuth.
- **CRUD Operations on Blogs**: Create, read, update, and delete blogs.
- **Rich Text Editor**: Write blogs using TinyMCE, a feature-packed text editor.
- **Dynamic Latest Posts**: Displays the most recent blogs with a skeleton loader until data is fetched.
- **Your Recent Posts**: Personalized section showing the user’s most recent blogs.
- **Responsive Design**: Fully responsive design for a smooth experience across all devices.
- **Search Functionality**: Easily search blogs by title or author.
- **Cover Images**: Add cover images to blogs for better visual appeal.
- **Account Management**: Users can update their profile (name, picture) and delete their account.
- **Skeleton Loaders**: Enhances user experience while waiting for API data.

## 🧑‍💻 Tech Stack

- **Frontend**: Next.js, Tailwind CSS, ShadCN, Aceternity UI
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Authentication**: NextAuth
- **Deployment**: Vercel

## 📥 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Anuj579/blog-op.git
   ```

2. Navigate to the project directory:

   ```bash
   cd blogop
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add your environment variables:

   ```env
   # Google OAuth Credentials
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret

   # NextAuth Configuration
   NEXTAUTH_SECRET=your-nextauth-secret
   NEXTAUTH_URL=http://localhost:3000

   # MongoDB URI
   MONGO_URI=your-mongodb-uri

    # Public App URL
   NEXT_PUBLIC_APP_URL=http://localhost:3000

    # SMTP Configuration (for email sending)

    SMTP_USER=your-smtp-email
    SMTP_PASS=your-smtp-password

    # Cloudinary Configuration
    NEXT_PUBLIC_CLOUDINARY_API_URL=https://api.cloudinary.com/v1_1/your-cloudinary-cloud-name/image/upload

    # TinyMCE API Key
    NEXT_PUBLIC_TINYMCE_API_KEY=your-tinymce-api-key
   ```

5. Run the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🌍 Deployment

This application is ready for deployment on platforms like **Vercel**. Follow these steps:

1. Push your code to a GitHub repository.
2. Link the repository to Vercel.
3. Add the required environment variables in the Vercel project settings.
4. Deploy the app.

## 📱 Social Media

- [Twitter](https://x.com/anujbuilds)
- [LinkedIn](https://www.linkedin.com/in/anujchaudhary549/)
- [YouTube](https://www.youtube.com/@anujbuilds)
- [Instagram](https://www.instagram.com/anujbuilds)

Developed with ❤️ by Anuj
