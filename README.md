# EAM - Employee Assignment Management

**EAM** (Employee Assignment Management) is a simple student project aimed at managing employees, their assignments, and the locations where they are deployed.  
It is a full-stack web application built with modern technologies and can be used **as a starting point** or **as-is** for lightweight internal tools.

---

## 📚 About

This project was developed in an academic context and is freely available for reuse or extension.  
The codebase is designed to be simple and readable for learning, prototyping, or even production with small teams.

---

## 🧩 Features

- 📋 Manage employees
- 📍 Manage locations
- 🔄 Assign employees to specific locations
- RESTful API (Spring Boot)
- Clean UI with Radix UI and Tailwind CSS
- PostgreSQL integration

---

## 🏗️ Project Structure

```
eam/
├── back/     # Java + Spring Boot backend
└── front/    # Next.js + TypeScript frontend
```

---

## 🛠️ Technologies Used

### Backend (`back/`)
- Java 23
- Spring Boot 3.4.2
- Spring Data JPA
- PostgreSQL
- Gradle Wrapper (`./gradlew`)

### Frontend (`front/`)
- Next.js 14 (React + TypeScript)
- Tailwind CSS
- Radix UI
- Lucide Icons
- Next Themes

---

## ⚙️ Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/eam.git
cd eam
```

---

### 2. Backend Setup

```bash
cd back

# Start the backend in development mode
./gradlew bootRun
```

#### ➕ Configure PostgreSQL

Edit the file `back/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/eam_db
spring.datasource.username=your_db_user
spring.datasource.password=your_db_password
spring.jpa.hibernate.ddl-auto=update
```

> Make sure PostgreSQL is running and the database exists.

---

### 3. Frontend Setup

```bash
cd front

# Install dependencies
npm install

# Start development server
npm run dev
```

Create a `.env.local` file if needed to point to the backend:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

---

## 🚀 Production Setup

### Backend

```bash
cd back
./gradlew build
java -jar build/libs/back-0.0.1-SNAPSHOT.jar
```

### Frontend

```bash
cd front
npm run build
npm start
```

> You can also deploy the frontend on Vercel or export it statically (`npm run export`).

---

## 📄 License

This project is **free to use**, either:
- As a learning resource
- As a base for new projects
- Or directly in small-scale environments

---

## 🤝 Contributing

Feel free to fork, modify, and improve this project. Contributions are always welcome!
