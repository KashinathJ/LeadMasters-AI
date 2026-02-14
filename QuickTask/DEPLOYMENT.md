# 🚀 QuickTask - Deployment Guide

This guide covers deploying QuickTask to various platforms.

## 📋 Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] MongoDB database set up (local or cloud)
- [ ] JWT_SECRET is strong and secure
- [ ] All services tested locally
- [ ] Build scripts verified

---

## 🌐 Frontend Deployment

### Vercel (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   cd frontend
   vercel
   ```

3. **Set Environment Variables in Vercel Dashboard:**
   - `VITE_API_URL` - Your backend API URL
   - `VITE_ANALYTICS_URL` - Your analytics API URL

4. **Or use GitHub Integration:**
   - Connect your GitHub repository
   - Vercel will auto-deploy on push

### Netlify

1. **Build command:** `npm run build`
2. **Publish directory:** `dist`
3. **Environment variables:** Set in Netlify dashboard

### GitHub Pages

1. **Update `vite.config.js`:**
   ```js
   export default defineConfig({
     base: '/QuickTask/',
     // ... other config
   })
   ```

2. **Deploy:**
   ```bash
   cd frontend
   npm run build
   # Push dist folder to gh-pages branch
   ```

---

## 🔧 Backend Deployment

### Railway

1. **Connect GitHub repository**
2. **Add service:**
   - Select `backend` folder
   - Set root directory: `backend`

3. **Environment Variables:**
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   NODE_ENV=production
   ```

4. **Deploy automatically on push**

### Render

1. **Create new Web Service**
2. **Connect repository**
3. **Settings:**
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`

4. **Environment Variables:** Same as Railway

### Heroku

1. **Install Heroku CLI:**
   ```bash
   npm i -g heroku
   ```

2. **Create app:**
   ```bash
   cd backend
   heroku create your-app-name
   ```

3. **Set environment variables:**
   ```bash
   heroku config:set MONGODB_URI=your_uri
   heroku config:set JWT_SECRET=your_secret
   heroku config:set NODE_ENV=production
   ```

4. **Deploy:**
   ```bash
   git push heroku main
   ```

---

## 🐍 Analytics Service Deployment

### Railway

1. **Add Python service**
2. **Root directory:** `analytics_service`
3. **Start command:** `python main.py`

4. **Environment Variables:**
   ```
   MONGODB_URI=your_mongodb_uri
   ANALYTICS_PORT=8000
   ```

### Render

1. **Create Web Service**
2. **Environment:** Python 3
3. **Build Command:** `pip install -r requirements.txt`
4. **Start Command:** `python main.py`

### PythonAnywhere

1. **Upload files via web interface**
2. **Create web app**
3. **Set WSGI file:**
   ```python
   import sys
   path = '/home/yourusername/QuickTask/analytics_service'
   if path not in sys.path:
       sys.path.append(path)
   from main import app
   application = app
   ```

---

## 🗄️ MongoDB Setup

### MongoDB Atlas (Recommended for Production)

1. **Create cluster** (free tier available)
2. **Get connection string**
3. **Add IP whitelist** (0.0.0.0/0 for all, or specific IPs)
4. **Create database user**
5. **Update MONGODB_URI in all services**

### Connection String Format:
```
mongodb+srv://username:password@cluster.mongodb.net/quicktask?retryWrites=true&w=majority
```

---

## 🔒 Security Checklist

- [ ] Use strong JWT_SECRET (32+ characters, random)
- [ ] Enable HTTPS for all services
- [ ] Set CORS to specific origins (not *)
- [ ] Use environment variables (never commit secrets)
- [ ] Enable MongoDB authentication
- [ ] Use MongoDB IP whitelist
- [ ] Set NODE_ENV=production
- [ ] Enable rate limiting (if needed)

---

## 📊 Monitoring

### Recommended Tools

- **Uptime Monitoring:** UptimeRobot, Pingdom
- **Error Tracking:** Sentry, Rollbar
- **Logging:** LogRocket, Papertrail
- **Analytics:** Google Analytics, Mixpanel

---

## 🔄 CI/CD Setup

See `.github/workflows/ci.yml` for GitHub Actions setup.

---

## 🐳 Docker Deployment (Optional)

### Dockerfile Example (Backend)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm ci --only=production
COPY backend/ .
EXPOSE 5000
CMD ["node", "server.js"]
```

### docker-compose.yml

```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=mongodb://mongo:27017/quicktask
      - JWT_SECRET=your_secret
    depends_on:
      - mongo
  
  analytics:
    build: ./analytics_service
    ports:
      - "8000:8000"
    environment:
      - MONGODB_URI=mongodb://mongo:27017/quicktask
  
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
  
  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
```

---

## ✅ Post-Deployment

1. **Test all endpoints**
2. **Verify environment variables**
3. **Check logs for errors**
4. **Test authentication flow**
5. **Verify database connection**
6. **Test analytics endpoints**

---

## 🆘 Troubleshooting

### Services not connecting
- Check environment variables
- Verify CORS settings
- Check network/firewall rules

### Database connection issues
- Verify MongoDB URI
- Check IP whitelist
- Verify credentials

### Build failures
- Check Node.js/Python versions
- Verify all dependencies
- Check build logs

---

**Happy Deploying! 🚀**
