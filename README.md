# MinecraftMe AI Photo Blender

Transform your photos into Minecraft-style pixelated art using AI!!

## Features

- 📸 **Photo Conversion**: Upload any photo and convert it to Minecraft style
- 🔐 **Google OAuth Authentication**: Secure login with Google accounts
- 📊 **Daily Usage Limits**: Track and limit daily usage per user
- ⚡ **Real-time Processing**: See your conversion status in real-time
- 📱 **Responsive UI**: Works on desktop and mobile devices

## Environment Setup

### 1. Copy Environment File
```bash
cp .env.local.example .env.local
```

### 2. Configure Required Variables

#### Replicate API
Get your API token from [Replicate](https://replicate.com/account/api-tokens):
```bash
REPLICATE_API_TOKEN=r8_your_actual_token_here
```

#### NextAuth Configuration
Generate a random secret:
```bash
NEXTAUTH_SECRET=your_random_secret_at_least_32_characters
NEXTAUTH_URL=http://localhost:3000
```

#### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Set authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
```bash
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

#### Supabase Database
1. Create account at [Supabase](https://supabase.com/)
2. Create a new project
3. Go to Settings → API
4. Copy your project URL and anon key
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Setup Database
1. In your Supabase dashboard, go to SQL Editor
2. Copy and run the SQL script from `database/schema.sql`
3. This will create the `user_usage` table for tracking daily limits

## Installation

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.local.example .env.local
# Edit .env.local with your actual values

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Usage

1. **Sign In**: Click "Sign in with Google" to authenticate
2. **Upload Photo**: Drag and drop or click to upload your photo
3. **Wait for Processing**: Watch the real-time processing status
4. **Download Result**: Download your Minecraft-style image

## Tech Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **NextAuth.js**: Authentication
- **Supabase**: Database and backend services
- **Replicate**: AI image processing
- **SWR**: Data fetching and caching

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable UI components
├── lib/                 # Utility functions and configurations
├── contexts/            # React contexts
└── types/               # TypeScript type definitions
```

## Database Schema

The application uses a simple `user_usage` table to track daily usage limits:

```sql
user_usage (
  id: SERIAL PRIMARY KEY,
  user_email: VARCHAR(255),
  usage_count: INTEGER,
  usage_date: DATE,
  created_at: TIMESTAMP,
  updated_at: TIMESTAMP
)
```

## 🚀 Deployment

### Netlify (Recommended)

1. **Connect Repository**
   - Link your GitHub repository to Netlify
   - Set build command: `bun run build`
   - Set publish directory: `.next`

2. **Environment Variables**
   ```
   REPLICATE_API_TOKEN=your_token_here
   ```

3. **Deploy**
   - Push to main branch triggers automatic deployment
   - Your app will be live at `your-site.netlify.app`

### Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

3. **Set Environment Variables**
   ```bash
   vercel env add REPLICATE_API_TOKEN
   ```

## 🎯 Features in Detail

### Demo Mode
The app includes a demo mode that works without API configuration:
- Mock background removal with sample processing
- Simulated AI blending responses
- Perfect for testing and development

### Error Handling
- Graceful fallbacks for API failures
- User-friendly error messages
- Automatic retry mechanisms

### Performance Optimizations
- Image compression and optimization
- Lazy loading for backgrounds
- Efficient canvas rendering

## 🔧 Development

### Code Quality
```bash
# Lint and format code
bun run lint

# Type checking
bun run type-check
```

### Adding New Backgrounds
1. Add images to `public/backgrounds/`
2. Update `backgrounds.json` with metadata
3. Follow naming convention: `scene-name.jpg`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Replicate** for providing powerful AI models
- **shadcn/ui** for beautiful UI components
- **Minecraft** for the inspiration and aesthetic
- **Next.js** team for the amazing framework

## 📞 Support

- 🐛 **Bug Reports**: [Open an issue](https://github.com/tian-Sun/MinecraftMe-AI-Photo-Blender/issues)
- 💡 **Feature Requests**: [Discussions](https://github.com/tian-Sun/MinecraftMe-AI-Photo-Blender/discussions)
- 📧 **Contact**: [Your Email](mailto:your.email@example.com)

---

Made with ❤️ and ☕ by [Your Name](https://github.com/tian-Sun)

**⭐ Star this repo if you found it helpful!**
