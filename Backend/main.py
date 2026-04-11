# main.py
import os
from fastapi import FastAPI, BackgroundTasks, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Universal Mail Relay")

origins = [
    "http://ramsam-trends-bucket.s3-website.ap-south-1.amazonaws.com",
]

app.add_middleware(
    CORSMiddleware,
 11111111111111111111111111111   allow_origins=["*"],  # you can restrict later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

conf = ConnectionConfig(
    MAIL_USERNAME=os.getenv("MAIL_USERNAME"),
    MAIL_PASSWORD=os.getenv("MAIL_PASSWORD"),
    MAIL_FROM=os.getenv("MAIL_USERNAME"),
    MAIL_PORT=int(os.getenv("MAIL_PORT", 465)),
    MAIL_SERVER=os.getenv("MAIL_SERVER", "smtp.gmail.com"),
    MAIL_STARTTLS=False,
    MAIL_SSL_TLS=True,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True
)

# ---------------------------------------------------------
# THE ROUTING MAP (Map secret keys to destination inboxes)
# ---------------------------------------------------------
ROUTING_MAP = {
    "ramsam": os.getenv("RAMSAM_INBOX"),
    "software_x": os.getenv("SOFTWARE_X_INBOX"),
    "garden": os.getenv("GARDEN_INBOX")
}

# Added 'source_key' to the data model
class MailPayload(BaseModel):
    source_key: str  
    subject: str
    reply_to: EmailStr
    html_content: str

@app.post("/api/contact")
async def send_email(payload: MailPayload, background_tasks: BackgroundTasks):
    try:
        # 1. Look up the destination email using the secure key
        destination_email = ROUTING_MAP.get(payload.source_key)
        
        # 2. If the key is invalid, reject the request (stops spammers)
        if not destination_email:
            raise HTTPException(status_code=400, detail="Invalid source key.")

        # 3. Route the message to the correct inbox
        # FIXED CODE
        message = MessageSchema(
            subject=payload.subject,
            recipients=[destination_email],  
            body=payload.html_content,
            subtype=MessageType.html,
            reply_to=[payload.reply_to]  # <--- Wrap it in brackets!
        )

        fm = FastMail(conf)
        background_tasks.add_task(fm.send_message, message)

        return {"status": "success", "message": f"Email routed to {payload.source_key}"}

    except HTTPException:
        raise
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Failed to send email")



@app.get("/")
def run():
    return {"message": "App running"}