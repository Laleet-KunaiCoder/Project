FastAPI Backend and React Vite Frontend
### Description
This project consists of a backend built with FastAPI and a frontend built with React using Vite. It provides a powerful API backend for your application along with a modern, efficient frontend for user interaction.

## Documentation


### Backend
#### Technologies Used:
- FastAPI: A modern, fast (high-performance), web framework for building APIs with Python.
- SQLModel: A SQL database interface for Python, integrated with SQLAlchemy Core.
- React: A JavaScript library for building user interfaces.
- Vite: A build tool that aims to provide a faster and leaner development experience for modern web projects.
- Tailwind CSS: A utility-first CSS framework for rapidly building custom designs.
- Shadcn/UI: It's a collection of re-usable components that you can copy and paste into your apps.
#### Requirements
- Python 3.10 or higher
- Node.js v21.7.1 or higher
- Package maneger (npm, yarn, pnpm)


## Installation

Install the codebase & open the project folder

```bash
  git clone <repository-url>
  cd Project

```
    
#### Backend Installation 
Navigate to the Backend directory:
```bash
cd Backend
```

Create a Virtual Environment: 
```bash
python -m venv env
```

Activate the Virtual Environment (On windows): 

```bash
env\Scripts\activate
```
(On macOS and Linux)

```bash
source env/bin/activate
```


Install dependencies:

```bash
pip install -r requirements.txt
```

Run the development server:

```bash
uvicorn main:app --reload
```

#### Frontend Installation 

Navigate to the Frontend directory:

```bash
cd Frontend
```
Install dependencies:
```bash
npm install
```
Run the development server:
```bash
npm run dev
```
Open your browser and navigate to:

- Backend Endpoint http://localhost:8000/
- Frontend Endpoint http://localhost:5173/

## Installation

Install the codebase & open the project folder

```bash
  git clone <repository-url>
  cd Project

```
    
#### Backend Installation 
Navigate to the Backend directory:
```bash
cd Backend
```

Create a Virtual Environment: 
```bash
python -m venv env
```

Activate the Virtual Environment (On windows): 

```bash
env\Scripts\activate
```
(On macOS and Linux)

```bash
source env/bin/activate
```


Install dependencies:

```bash
pip install -r requirements.txt
```

Run the development server:

```bash
uvicorn main:app --reload
```

#### Frontend Installation 

Navigate to the Frontend directory:

```bash
cd Frontend
```
Install dependencies:
```bash
npm install
```
Run the development server:
```bash
npm run dev
```
Open your browser and navigate to:

- Backend Endpoint http://localhost:8000/
- Frontend Endpoint http://localhost:5173/

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file eachone in the Frontend and Backend folder

#### Frontend :

`VITE_APP_API_ENDPOINT` = http://127.0.0.1:8000

#### Backend :

`DATABASE_URL` = postgresql database url 

`SECRET_KEY` = Secret key for encoding JWT tokens

`ALGORITHM` = Algorithm for encoding

`connection_string` = Blob storge connection string

`container_name` = azure container name

## Acknowledgements
We extend our sincere appreciation to Professor Aerospace Engineering for their invaluable guidance and support throughout the development of the Birdfeeder project. Their insightful feedback and encouragement were instrumental in shaping our project and overcoming challenges along the way. We are grateful for the opportunity to learn under their mentorship and for their dedication to fostering our growth and success. Thank you, Professor, for your unwavering support and mentorship.




 - [Vite Guide Frontend](https://vitejs.dev/guide/)
 - [Shadcn/UI Documentation](https://ui.shadcn.com/docs)
 - [Fastapi Documentation](https://fastapi.tiangolo.com/)
 - [Azure Documentation](https://fastapi.tiangolo.com/)