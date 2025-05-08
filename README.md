# Vanilla JavaScript Layercode Voice Agent Frontend Example

Example web voice agent using the Layercode [JavaScript SDK](https://github.com/layercodedev/layercode-js-sdk)

This example can be used with any of our [backend examples](https://docs.layercode.com/backend-guides/connect-backend). Note that the frontend client needs to generate a client_session_key to connect to Layercode. If using your own backend, the authentication endpoint will be in there. So that this demo can run standalone, including with the Layercode [Hosted Backend](https://docs.layercode.com/backend-guides/hosted-backend) we include an authentication endpoint in a small Python server. This server also serves up the static HTML files for the frontend example itself.

# Getting Started

1. Clone this repository.
2. Edit your .env environment variables. You'll need to add:
   - `LAYERCODE_API_KEY` - Your Layercode API key found in the [Layercode Dashboard settings](https://dash.layercode.com/settings)
3. Edit index.html and input your Layercode Pipeline ID. This is found in the [Layercode Dashboard](https://dash.layercode.com). To use this example without a backend, set the Pipeline to use the [Hosted Backend](https://docs.layercode.com/backend-guides/hosted-backend).
3. Run (you'll need uv installed): `uvicorn main:app --reload --env-file .env --port 3000`
7. Now open http://localhost:3000 in your browser and start speaking to your voice agent!
