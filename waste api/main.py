from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import torch
from PIL import Image
import io
import torchvision.transforms as transforms
from model import create_efficient_resnet
import torch.nn.functional as F
import os
import httpx
from dotenv import load_dotenv
import json
import torch.nn.utils.prune as prune

# Load environment variables
load_dotenv()
OPENROUTER_API_KEY = os.getenv('OPENROUTER_API_KEY')
if not OPENROUTER_API_KEY:
    raise ValueError("OPENROUTER_API_KEY not found in environment variables")

OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"

# Add OpenRouter headers
openrouter_headers = {
    "Authorization": f"Bearer {OPENROUTER_API_KEY}",
    "HTTP-Referer": "http://localhost:8000",
    "X-Title": "Waste Classification API",
    "Content-Type": "application/json"
}

app = FastAPI(title="Waste Classification API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define class labels
CLASS_LABELS = [
    "Cardboard", "Food Organics", "Glass", "Metal", 
    "Miscellaneous Trash", "Paper", "Plastic", "Textile Trash", "Vegetation"
]

# Define image transformations
transform = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                        std=[0.229, 0.224, 0.225]),
])

# Create and prune the model
try:
    # Create the model
    model = create_efficient_resnet(pretrained=False, resnet_size=50)
    
    # Apply pruning to convolutional and linear layers
    for name, module in model.named_modules():
        if isinstance(module, (torch.nn.Conv2d, torch.nn.Linear)):
            prune.l1_unstructured(module, name='weight', amount=0.3)  # Prune 30% of weights
            
    # Make pruning permanent
    for name, module in model.named_modules():
        if isinstance(module, (torch.nn.Conv2d, torch.nn.Linear)):
            prune.remove(module, 'weight')
    
    # Move model to device and set to eval mode
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = model.to(device)
    model.eval()
    print("Model pruned and loaded successfully!")
except Exception as e:
    raise RuntimeError(f"Error creating pruned model: {str(e)}")

async def get_waste_management_insights(material_type: str) -> str:
    prompt = f"""Provide a structured response about managing {material_type} waste. Follow this exact format and tailor your answer according to the unique properties of the material type:

Decomposition/Composting:

Write 2-3 sentences describing decomposition and composting methods suitable for {material_type} waste.

If the material is unsuitable for composting, explain why and suggest alternative natural breakdown methods if applicable.

Recycling Process:

Write 2-3 sentences detailing recycling methods for {material_type} waste, including sorting techniques and any challenges specific to the material.

Note any limitations if the material is difficult or non-recyclable.

Energy Conversion (Community-based and Home Implementation):

Write 2-3 sentences explaining how torrefaction converts waste into bioenergy pellets and how landfill gas (LFG) can be captured for renewable energy.

Include practical advice for implementing these techniques at home or within a community setting, or suggest alternatives if the material does not lend itself to energy conversion.

Disposal Guidelines:

Write 2-3 sentences outlining proper disposal practices for {material_type} waste to ensure safety and minimize environmental harm.

Environmental Impact:

Write 2-3 sentences summarizing the environmental consequences of managing {material_type} waste, highlighting benefits from energy conversion methods like reduced greenhouse gas emissions, or potential drawbacks if the material is problematic."""

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                OPENROUTER_URL,
                headers=openrouter_headers,
                json={
                    "model": "openai/gpt-4-turbo-preview",
                    "messages": [{"role": "user", "content": prompt}],
                    "temperature": 0.7,
                    "max_tokens": 500
                }
            )
            
            if response.status_code == 200:
                try:
                    response_data = response.json()
                    if "choices" in response_data and len(response_data["choices"]) > 0:
                        content = response_data["choices"][0]["message"]["content"]
                        # Format the response to ensure consistent structure
                        formatted_content = content.replace("\n\n", "\n").strip()
                        return formatted_content
                    else:
                        return "Unable to parse response from OpenRouter API"
                except json.JSONDecodeError:
                    return "Invalid JSON response from OpenRouter API"
            else:
                error_detail = response.text
                return f"OpenRouter API error (Status {response.status_code}): {error_detail}"
    except httpx.RequestError as e:
        return f"Network error while connecting to OpenRouter: {str(e)}"
    except Exception as e:
        return f"Error fetching insights: {str(e)}"

@app.get("/")
async def root():
    return {"message": "Welcome to Waste Classification API"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        # Validate file type
        if not file.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        # Read and preprocess the image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert('RGB')
        image_tensor = transform(image).unsqueeze(0).to(device)
        
        # Make prediction
        with torch.no_grad():
            outputs = model(image_tensor)
            probabilities = F.softmax(outputs, dim=1)
            top_prob, top_class = torch.max(probabilities, 1)
            prediction = CLASS_LABELS[top_class.item()]
        
        # Get waste management insights
        insights = await get_waste_management_insights(prediction)
        
        return {
            "class": prediction,
            "confidence": round(top_prob.item() * 100, 2),
            "filename": file.filename,
            "probabilities": {label: round(prob.item() * 100, 2) 
                            for label, prob in zip(CLASS_LABELS, probabilities[0])},
            "waste_management_insights": insights
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 