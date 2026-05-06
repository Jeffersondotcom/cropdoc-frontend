from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import time

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Simulate processing time
    time.sleep(2)
    
    return {
        "disease_name": "Cassava Brown Streak Disease",
        "confidence": "94%",
        "severity": "Moderate",
        "affected_crop_type": "Cassava",
        "treatment_recommendation": "Remove and destroy infected plants. Use disease-free planting materials for the next season. Control whiteflies which spread the virus using appropriate insecticides."
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
