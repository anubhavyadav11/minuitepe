from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Minuite Pe API")

# Setup CORS to allow the Next.js frontend to communicate with the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"], # Add Next.js ports
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ContactForm(BaseModel):
    name: str
    email: str
    subject: str = None
    message: str

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Minuite Pe API is running"}

@app.post("/api/contact")
async def contact(form: ContactForm):
    # In a real app, this would send an email or save to database
    print(f"Received contact from {form.name} ({form.email}): {form.message}")
    return {"status": "success", "message": "Message sent! We'll be in touch within 24 hours."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
