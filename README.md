# Insurance Premium Prediction

End-to-end Machine Learning project to predict insurance premiums using Random Forest Regression. Built with FastAPI, Pydantic, and Docker.

## Tech Stack
- Python
- Scikit-learn (Random Forest)
- FastAPI
- Pydantic
- HTML, CSS
- Docker

## Features
- ML-based premium prediction
- FastAPI REST API
- Input validation with Pydantic
- Dockerized application

## Run Locally
```bash
pip install -r requirements.txt
uvicorn app:app --reload

** ## Run with Docker
```bash
docker build -t ahrar123/insurance-premium-api:latest .
docker run -p 8000:8000 ahrar123/insurance-premium-api:latest **
