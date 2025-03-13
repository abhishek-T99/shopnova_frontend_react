# ---- Build Stage ----
    FROM node:18-alpine AS builder

    # Set working directory
    WORKDIR /app
    
    # Copy package.json and yarn.lock first (to leverage Docker caching)
    COPY package.json yarn.lock ./
    
    # Install dependencies
    RUN yarn install --frozen-lockfile
    
    # Copy the rest of the application
    COPY . .
    
    # Copy the .env file (important for Vite)
    COPY .env .env
    
    # Build the React app
    RUN yarn build
    
    # ---- Production Stage ----
    FROM nginx:alpine
    
    # Set working directory inside Nginx
    WORKDIR /usr/share/nginx/html
    
    # Remove default Nginx static files
    RUN rm -rf ./*
    
    # Copy built frontend from builder stage
    COPY --from=builder /app/dist .
    
    # Copy custom Nginx configuration
    COPY nginx.conf /etc/nginx/conf.d/default.conf
    
    # Expose port 80
    EXPOSE 80
    
    # Start Nginx
    CMD ["nginx", "-g", "daemon off;"]
    