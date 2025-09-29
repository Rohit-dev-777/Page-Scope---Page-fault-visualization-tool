# Page-Scope (Page-fault-visualization-tool)
To solve the problem of abstract understanding of page faults, our project will focus on building an interactive visualization tool that demonstrates how different page replacement algorithms work in real time. 

***

## Installation and Setup

To get started with the Page Fault Visualization Tool locally, follow these steps:

1. **Clone the repository:**

```bash
git clone <repository-url>
cd <repository-folder>
```

2. **Install dependencies:**

```bash
npm install
```

3. **Setup environment variables:**

Create a `.env` file in the project root and add your Google Gemini API key and URL you may see `.env.example` file for reference :

```
VITE_GEMINI_API_KEY=your_api_key_here
VITE_GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent
```

4. **Start the development server:**

```bash
npm run dev
```

5. **Open your browser and navigate to:**

```
http://localhost:5173
```

You should see the interactive page fault visualization tool ready to use.

***
