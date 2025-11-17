# PathTree Deployment Guide

## 🚀 Quick Deployment to Vercel

### Step 1: Get the Code
1. Download the project files from the repository
2. Extract the files to your local machine

### Step 2: Create GitHub Repository
1. Go to [GitHub](https://github.com) and create a new repository named `pathtree`
2. Clone the repository locally:
   ```bash
   git clone https://github.com/yourusername/pathtree.git
   cd pathtree
   ```
3. Copy all the project files into the cloned repository
4. Commit and push:
   ```bash
   git add .
   git commit -m "Initial commit: PathTree application"
   git push origin main
   ```

### Step 3: Deploy to Vercel
1. Go to [Vercel](https://vercel.com) and sign in with your GitHub account
2. Click "New Project"
3. Import your `pathtree` repository
4. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

### Step 4: Environment Variables
1. In the Vercel project settings, go to "Environment Variables"
2. Add the following variable:
   - **Name**: `MISTRAL_API_KEY`
   - **Value**: Your Mistral API key (get it from [Mistral Console](https://console.mistral.ai/))
   - **Environment**: Production, Preview, Development

### Step 5: Deploy
1. Click "Deploy"
2. Wait for the deployment to complete
3. Your PathTree application will be live at `https://your-project-name.vercel.app`

## 🔧 Local Development

### Prerequisites
- Node.js 18 or later
- npm or yarn
- Mistral AI API key

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/pathtree.git
   cd pathtree
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env.local
   ```

4. Edit `.env.local` and add your Mistral API key:
   ```env
   MISTRAL_API_KEY=your_mistral_api_key_here
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🌐 Alternative Deployment Options

### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variable: `MISTRAL_API_KEY`

### Railway
1. Connect your GitHub repository to Railway
2. Railway will auto-detect Next.js
3. Add environment variable: `MISTRAL_API_KEY`

### Docker
1. Build the Docker image:
   ```bash
   docker build -t pathtree .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 -e MISTRAL_API_KEY=your_api_key pathtree
   ```

## 🔐 Security Notes

1. **Never commit API keys** to your repository
2. Use environment variables for sensitive data
3. The default API key is for demo purposes only
4. Replace with your own API key for production use
5. Consider using Vercel's secret management for production

## 🐛 Troubleshooting

### Common Issues

1. **Build fails with "Module not found"**
   - Run `npm install` to ensure all dependencies are installed
   - Check that all import paths are correct

2. **API calls fail with 401 Unauthorized**
   - Verify your Mistral API key is correct
   - Check that the environment variable is properly set

3. **File upload doesn't work**
   - Ensure the `uploads` directory exists and is writable
   - Check file size limits (default: 10MB)

4. **PDF parsing issues**
   - PDF parsing is temporarily disabled due to Node.js compatibility
   - Use text files or Word documents instead

### Getting Help

1. Check the [Issues](https://github.com/yourusername/pathtree/issues) page
2. Create a new issue with:
   - Error message
   - Steps to reproduce
   - Environment details (Node.js version, OS, etc.)

## 📊 Performance Optimization

### For Production
1. Enable Next.js optimizations in `next.config.js`
2. Use Vercel's Edge Functions for better performance
3. Implement caching for API responses
4. Optimize images and assets

### Monitoring
1. Use Vercel Analytics for performance monitoring
2. Set up error tracking (Sentry, LogRocket, etc.)
3. Monitor API usage and costs

---

**Happy Deploying! 🚀**