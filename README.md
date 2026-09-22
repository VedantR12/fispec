# FiSpec

### AI-powered food intelligence from a single scan.

**FiSpec** is a food analysis platform that turns packaged-food data into understandable insights.

Scan a product barcode or search for a food → identify the product → analyze its ingredients and nutritional information → generate an AI-powered explanation.

[🌐 Live Demo](https://fispec.vercel.app)

---

## What is FiSpec?

Food labels contain a lot of information, but most of it isn't presented in a way that's easy to understand.

FiSpec acts as an intelligence layer between **raw food data and the person consuming it**.

Instead of making users manually interpret:

* ingredients
* additives
* nutritional values
* serving sizes
* product information

FiSpec processes the available product data and presents it as a concise, understandable analysis.

### The core workflow

```text
          ┌──────────────┐
          │ Scan / Search│
          └───────┬──────┘
                  ↓
          ┌──────────────┐
          │    Product   │
          │Identification│
          └───────┬──────┘
                  ↓
          ┌──────────────┐
          │ Food Data +  │
          │ Ingredients  │
          └───────┬──────┘
                  ↓
          ┌──────────────┐
          │    FiSpec    │
          │   Analysis   │
          └───────┬──────┘
                  ↓
          ┌──────────────┐
          │ AI-generated │
          │   Insights   │
          └──────────────┘
```

---

## Features

### 1. Barcode-based product lookup

Scan a packaged food product and use its barcode to identify it.

### 2. Unified search

Don't have the barcode?

Search for the product by name instead.

### 3. Ingredient analysis

FiSpec processes the ingredient information available for a product and turns the raw label into structured information.

### 4. Nutritional analysis

View nutritional information in a cleaner and more understandable format.

### 5. AI-powered explanations

Instead of simply displaying raw food-label data, FiSpec uses an AI layer to explain the information in natural language.

### 6. Food intelligence

The goal isn't just to display what's written on the package.

FiSpec adds an interpretation layer that helps users understand **what they're actually looking at**.

### 7. Authentication & history

Users can authenticate and maintain their analysis history, allowing previously analyzed products to remain accessible.

---

# Architecture

### High-level system

```text
                   ┌───────────────┐
                   │     User      │
                   └───────┬───────┘
                           │
                      Scan / Search
                           │
                           ▼
                   ┌───────────────┐
                   │   Frontend    │
                   │ React + Vite  │
                   └───────┬───────┘
                           │
                          API
                           │
                           ▼
                   ┌───────────────┐
                   │    FastAPI    │
                   │    Backend    │
                   └───────┬───────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
              ▼            ▼            ▼
        Product Data   Analysis     AI Engine
              │            │            │
              └────────────┼────────────┘
                           │
                           ▼
                    Structured Result
                           │
                           ▼
                    User-facing Insight
```

---

# Tech Stack

## Frontend

* React
* Vite
* JavaScript
* CSS
* Firebase Authentication

## Backend

* Python
* FastAPI
* REST APIs

## Data & Services

* Supabase
* PostgreSQL
* Open Food Facts

## AI

* LLM-powered food analysis
* Groq API

## Deployment

* Vercel — frontend
* Render — backend

---

# Product Flow

### 1. Identify

The user scans a barcode or searches for a product.

### 2. Retrieve

FiSpec retrieves the available product information.

### 3. Process

The backend processes the product's nutritional and ingredient data.

### 4. Analyze

The analysis engine extracts relevant food information.

### 5. Explain

The AI layer converts the processed information into an understandable explanation.

### 6. Save

Authenticated users can retain their analysis history.

---

# Why FiSpec?

Nutrition labels are optimized for **regulatory compliance**, not necessarily for human understanding.

FiSpec explores a different interface:

> **Don't just show the label. Explain the label.**

The project combines:

**Food databases + data processing + backend APIs + AI + consumer-facing UX**

into a single application.

---

# Engineering Highlights

FiSpec was built as a full-stack system rather than a standalone AI demo.

### 1. Full-stack architecture

The application separates the user-facing interface from the backend analysis layer.

### 2. API-driven design

The frontend communicates with a dedicated FastAPI backend rather than embedding the analysis logic directly into the UI.

### 3. AI integration

AI is used as an interpretation layer on top of structured food information.

### 4. External data integration

FiSpec integrates external food-product data instead of relying exclusively on manually created datasets.

### 5. Authentication

User authentication enables personalized product-analysis history.

### 6. Production deployment

The application is deployed as a real web application with separate frontend and backend infrastructure.

---

# Running Locally

## Clone

```bash
git clone https://github.com/VedantR12/fispec.git
cd fispec
```

## Backend

```bash
cd backend

python -m venv venv
```

### Linux / macOS

```bash
source venv/bin/activate
```

### Windows

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create your environment variables and start the API:

```bash
uvicorn api.server:app --reload
```

The API will be available at:

```text
http://localhost:8000
```

Interactive API documentation:

```text
http://localhost:8000/docs
```

---

## Frontend

```bash
cd frontend

npm install
npm run dev
```

The frontend will be available at:

```text
http://localhost:5173
```

---

# Environment Variables

Create the required environment files for the frontend and backend.

Typical configuration includes:

```env
GROQ_API_KEY=your_key
SUPABASE_URL=your_url
SUPABASE_KEY=your_key
```

Never commit production credentials or `.env` files to the repository.


# Disclaimer

FiSpec is an informational food-analysis project.

Its analysis should not be treated as medical, dietary, or clinical advice.

Product information can vary by region, manufacturer, formulation, and time. Always verify information against the product's packaging and official sources.

---

# Built By

**Vedant R.**

AI & Full-Stack Developer focused on building practical software, AI systems, and intelligent products.

[GitHub](https://github.com/VedantR12)

---

## If you find FiSpec interesting

Star the repository and check out the project.
