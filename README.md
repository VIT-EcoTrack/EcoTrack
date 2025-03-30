# EcoTrack - Smart Waste Management Platform

EcoTrack is a comprehensive waste management platform that combines AI-powered waste classification with community engagement features. The platform helps users identify, classify, and properly manage different types of waste while promoting sustainable practices.

## Features

### 1. AI Waste Classification
- Upload images of waste materials for instant classification
- Get detailed material composition analysis
- Receive waste management insights and recommendations
- Real-time confidence scores for classifications

### 2. User Dashboard
- Role-based access (Admin, Worker, User)
- Personalized waste management statistics
- Activity tracking and history
- Community engagement features

### 3. Community Features
- Forum for discussions and knowledge sharing
- Event management and participation
- Task management system
- Worker and truck management

## Technology Stack

### Frontend
- React with TypeScript
- Vite for build tooling
- Shadcn UI components
- Tailwind CSS for styling
- Axios for API requests

### Backend
- Node.js with Express
- FastAPI for AI service
- MongoDB for database
- JWT for authentication

### AI/ML Components
- PyTorch for waste classification
- OpenRouter API for waste management insights
- Custom-trained waste classification model

## Project Structure

```
ecotrack/
├── frontend/                # React frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API services
│   │   └── pages/         # Page components
│   └── package.json
├── backend/                # Express backend server
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── models/        # Database models
│   │   └── controllers/   # Business logic
│   └── package.json
└── waste-api/             # FastAPI waste classification service
    ├── main.py           # API endpoints
    ├── model.py          # ML model implementation
    └── requirements.txt
```

## Getting Started

### Prerequisites
- Node.js 18 or higher
- Python 3.8 or higher
- MongoDB
- CUDA-capable GPU (optional, for faster AI processing)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/ecotrack.git
cd ecotrack
```

2. **Set up the frontend**
```bash
cd frontend
npm install
npm run dev
```

3. **Set up the backend**
```bash
cd backend
npm install
npm run dev
```

4. **Set up the Waste API**
```bash
cd waste-api
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Environment Variables

1. **Frontend (.env)**
```env
VITE_API_URL=http://localhost:3000
VITE_WASTE_API_URL=http://localhost:8000
```

2. **Backend (.env)**
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ecotrack
JWT_SECRET=your_jwt_secret
```

3. **Waste API (.env)**
```env
OPENROUTER_API_KEY=your_openrouter_api_key
```

## API Documentation

### Waste Classification API

#### POST /predict
Upload an image for waste classification.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: form-data with 'file' field containing the image

**Response:**
```json
{
    "class": "Food Organics",
    "confidence": 99.9,
    "filename": "example.jpg",
    "probabilities": {
        "Food Organics": 99.9,
        "Plastic": 0.0,
        "Metal": 0.1,
        // ... other categories
    },
    "waste_management_insights": "..."
}
```

## User Roles and Permissions

1. **Admin**
   - Manage users and roles
   - View system-wide statistics
   - Configure system settings
   - Manage workers and trucks

2. **Worker**
   - View assigned tasks
   - Update task status
   - Access route information
   - Report issues

3. **User**
   - Upload waste images for classification
   - View personal waste statistics
   - Participate in community events
   - Access educational resources

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenRouter API for providing waste management insights
- Shadcn UI for the beautiful component library
- The open-source community for various tools and libraries used in this project
