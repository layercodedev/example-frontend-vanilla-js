# Vanilla JavaScript Layercode Voice Agent Frontend Example

Example web voice agent using the Layercode [JavaScript SDK](https://github.com/layercodedev/layercode-js-sdk)

This example can be used with any of our [backend examples](https://docs.layercode.com/backend-guides/connect-backend). Note that the frontend client needs to generate a client_session_key to connect to Layercode. If using your own backend, the authentication endpoint will be in there. So that this demo can run standalone, including with the Layercode [Hosted Backend](https://docs.layercode.com/backend-guides/hosted-backend) we include an authentication endpoint in a small Python server. This server also serves up the static HTML files for the frontend example itself.

## Getting Started

Clone this repository.

```bash
git clone https://github.com/layercodedev/example-frontend-vanilla-js.git && cd example-frontend-vanilla-js
```

Edit your .env environment variables. You'll need to add:

- `LAYERCODE_API_KEY` - Your Layercode API key found in the [Layercode Dashboard settings](https://dash.layercode.com/settings)

Edit index.html and input your Layercode Agent ID. This is found in the [Layercode Dashboard](https://dash.layercode.com). To use this example without a backend, set the Agent to use the [Hosted Backend](https://docs.layercode.com/backend-guides/hosted-backend).

Install uv (if not already installed):

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

Create venv & install deps:

```bash
 uv venv &&  uv pip install -r pyproject.toml
 ```

Run your app:

```bash
uv run uvicorn main:app --reload --env-file .env --port 3000
 ```

Now open http://localhost:3000 in your browser and start speaking to your voice agent!

## Extra features

### Push-to-talk mode

Layercode supports multiple turn-taking modes which are configured in the Transcriber settings of your voice agent in the Layercode dashboard. By default this example uses automated turn taking (which is the default for voice agents).

Push-to-talk is an alternative mode, where the user must hold the button down to speak. To enable this, go to the Transcriber settings of your voice agent in the Layercode dashboard and set the Turn Taking Mode to "Push-to-talk".

Then edit static/main.js and change the line `let agentUI = createVoiceAgent({ amplitude, status });` to `let agentUI = createVoiceAgentPushToTalk({ amplitude, status });`. Now the user's speech will only be transcribed when the button is held down (or spacebar is pressed).

## License

MIT
