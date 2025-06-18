# Quote Vote Project

A fullstack web application for voting on quotes, built with:
- **Frontend:** Next.js/React (TypeScript)
- **Backend:** NestJS (TypeScript)
- **Database:** MongoDB
- **Containerization:** Docker & Docker Compose

---

## 🛠️ Local Development

### 1. Clone the repository
```sh
git clone https://github.com/whatbest121/quote_vote.git
cd quote_vote
```

### 2. Install dependencies
#### Backend
```sh
cd backend
npm install
```
#### Frontend
```sh
cd ../frontend
npm install
```

### 3. Setup Environment Variables

#### Backend (`backend/.env`)
```
MONGO_URI=mongodb://localhost:27017/quotevote
PORT=3003
JWT_SECRET=your_jwt_secret
```

#### Frontend (`frontend/.env`)
```
NEXT_PUBLIC_API_URL=http://localhost:3003
```

### 4. Run MongoDB (local, optional if not using Docker)
```sh
docker run -d --name mongo -p 27017:27017 mongo:6
```

### 5. Start Backend
```sh
cd backend
npm run start:dev
```

### 6. Start Frontend
```sh
cd frontend
npm run dev
```

- Frontend: http://localhost:3000
- Backend: http://localhost:3003

---

## 🐳 Docker & Docker Compose

### 1. Build and Run All Services
```sh
docker-compose up --build
```
- Frontend: http://localhost:3000 (or port you set)
- Backend: http://localhost:3003
- MongoDB: localhost:27017

### 2. Example docker-compose.yml
```yaml
version: '3.8'
services:
  mongo:
    image: mongo:6
    container_name: mongo
    restart: always
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

  backend:
    build:
      context: ./backend
    container_name: backend
    restart: always
    ports:
      - "3003:3003"
    environment:
      - MONGO_URI=mongodb://mongo:27017/quotevote
      - PORT=3003
    depends_on:
      - mongo

  frontend:
    build:
      context: ./frontend
    container_name: frontend
    restart: always
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://backend:3003
    depends_on:
      - backend

volumes:
  mongo_data:
```

---

## 🧪 Running Tests

### Backend
```sh
cd backend
npm run test
```

---

## 📦 Project Structure
```
quote_vote/
├── backend/      # NestJS API
├── frontend/     # Next.js/React frontend
├── docker-compose.yml
├── README.md
```

---

## 📝 Notes
- Ensure ports 3000 (frontend), 3003 (backend), and 27017 (mongo) are available or change them as needed.
- For production, set strong secrets in your .env files.
- For any issues, check logs with `docker-compose logs` or `npm run start:dev`.

---

Happy coding! 🚀