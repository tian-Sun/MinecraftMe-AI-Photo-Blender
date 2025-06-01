# minecraftstyle.online - AI照片融合 · 像素艺术生成器 🎮

一个 AI 驱动的工具，将您的照片一键融合进 Minecraft 风格世界，生成专属像素艺术照！

![Demo](https://minecraftstyle.online/demo.png)

## ✨ 主要功能

- **🖼️ 拖拽上传**：便捷上传照片，实时预览
- **🤖 智能抠图**：AI自动去除背景
- **🏔️ 像素背景库**：精选 Minecraft 风格场景
- **🎨 画布编辑**：自由拖动缩放人物
- **⚡ AI融合生成**：一键生成像素艺术照
- **📱 响应式设计**：移动端/桌面端完美适配
- **💾 即时下载**：高质量 PNG 导出
- **🎭 演示模式**：无需 API 配置即可体验

## 🚀 在线体验

🌐 **[立即体验 minecraftstyle.online](https://minecraftstyle.online)**

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **AI Integration**: Replicate API
- **Canvas**: HTML5 Canvas (no external libraries)
- **Deployment**: Netlify
- **Package Manager**: Bun

## 📋 Prerequisites

- Node.js 18+ or Bun
- Replicate API account (for production use)

## 🔧 Installation

1. **Clone the repository**
```bash
git clone https://github.com/tian-Sun/MinecraftMe-AI-Photo-Blender.git
cd MinecraftMe-AI-Photo-Blender
```

2. **Install dependencies**
```bash
# Using Bun (recommended)
bun install

# Or using npm
npm install
```

3. **Environment Setup**
```bash
# Copy the environment file
cp .env.local.example .env.local

# Edit .env.local and add your Replicate API token
REPLICATE_API_TOKEN=your_replicate_token_here
```

4. **Start development server**
```bash
# Using Bun
bun dev

# Or using npm
npm run dev
```

Visit `http://localhost:3000` to see the app in action!

## 🔑 API Configuration

### Replicate API Setup

1. **Create a Replicate Account**
   - Visit [replicate.com](https://replicate.com)
   - Sign up for a free account

2. **Get Your API Token**
   - Go to your [account settings](https://replicate.com/account/api-tokens)
   - Create a new API token
   - Copy the token (starts with `r8_`)

3. **Add Token to Environment**
   ```bash
   # In your .env.local file
   REPLICATE_API_TOKEN=r8_your_actual_token_here
   ```

### AI Models Used

- **Background Removal**: `men1scus/birefnet` - High-quality subject segmentation
- **AI Blending**: `black-forest-labs/flux-fill-pro` - Advanced inpainting and blending

## 📖 Usage Guide

### 1. Upload Your Photo
- Drag and drop an image or click to browse
- Supports JPG, PNG, and other common formats
- Preview appears instantly

### 2. Remove Background
- Click "Remove Background" button
- AI automatically detects and removes the background
- Preview the cutout result

### 3. Choose Minecraft Scene
- Browse through curated Minecraft backgrounds
- Click to select your favorite scene
- Preview updates in real-time

### 4. Position Your Character
- Use the canvas editor to position your portrait
- Resize and adjust placement as needed
- Visual guides help with positioning

### 5. AI Blend & Download
- Click "Blend with AI" for realistic integration
- AI seamlessly merges your photo with the scene
- Download your Minecraft avatar as PNG

## 🏗️ Project Structure

```
MinecraftMe-AI-Photo-Blender/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── ai-blend/route.ts      # AI blending endpoint
│   │   │   └── remove-background/route.ts # Background removal endpoint
│   │   ├── globals.css                # Global styles
│   │   ├── layout.tsx                 # App layout
│   │   └── page.tsx                   # Main page
│   ├── components/
│   │   ├── AIBlendButton.tsx          # AI blend trigger
│   │   ├── BackgroundSelector.tsx     # Minecraft backgrounds
│   │   ├── CanvasEditor.tsx           # Portrait positioning
│   │   └── ImageUploader.tsx          # File upload component
│   └── lib/
│       ├── replicate.ts               # Replicate client setup
│       └── utils.ts                   # Utility functions
├── public/
│   └── backgrounds/                   # Minecraft background images
├── package.json                       # Dependencies
├── tailwind.config.ts                 # Tailwind configuration
├── next.config.js                     # Next.js configuration
└── netlify.toml                       # Netlify deployment config
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