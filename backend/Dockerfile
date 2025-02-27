# Use Deno official image
FROM denoland/deno:latest

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Expose the API port
EXPOSE 8000

# Start the application
CMD ["deno", "task", "start"]
