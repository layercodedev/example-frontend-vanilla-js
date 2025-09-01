import os
from fastapi import FastAPI, Request, HTTPException, Depends
from fastapi.responses import JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from httpx import AsyncClient
from pathlib import Path
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
async def read_root():
    return FileResponse('index.html')

@app.post("/authorize")
async def authorize_endpoint(request: Request):
    api_key = os.getenv("LAYERCODE_API_KEY")
    if not api_key:
        return JSONResponse({"error": "LAYERCODE_API_KEY is not set."}, status_code=500)
    try:
        body = await request.json()
    except Exception:
        return JSONResponse({"error": "Invalid JSON body."}, status_code=400)
    if not body or not body.get("agent_id"):
        return JSONResponse({"error": "Missing agent_id in request body."}, status_code=400)
    endpoint = "https://api.layercode.com/v1/agents/web/authorize_session"
    try:
        async with AsyncClient() as client:
            response = await client.post(
                endpoint,
                headers={
                    "Content-Type": "application/json",
                    "Authorization": f"Bearer {api_key}",
                },
                json=body,
            )
        if response.status_code != 200:
            return JSONResponse({"error": response.text}, status_code=500)
        return JSONResponse(response.json())
    except Exception as error:
        print("Layercode authorize session response error:", str(error))
        return JSONResponse({"error": str(error)}, status_code=500)
