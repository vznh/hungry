# TikTok Recipe Extractor

A simple web application that extracts recipes from TikTok videos using OpenAI's GPT-4 model.

## Features

- Extract recipes from TikTok videos
- Process video descriptions and titles
- Generate structured recipe output
- Simple and intuitive interface

## Prerequisites

- Node.js and Bun installed
- OpenAI API key

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```
3. Create a `.env` file in the root directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

## Usage

1. Start the development server:
   ```bash
   bun run dev
   ```
2. Open your browser and navigate to `http://localhost:3000`
3. Paste a TikTok video URL and click "Extract Recipe"
4. View the extracted recipe in a structured format

## How It Works

1. The application takes a TikTok video URL as input
2. It fetches the video information using TikTok's oEmbed API
3. The video title and description are processed using OpenAI's GPT-4 model
4. The model extracts and structures the recipe information
5. The structured recipe is displayed to the user

## Error Handling

- Invalid URLs will return a 400 error
- Failed video processing will return a 500 error
- Missing API keys will prevent the application from functioning

## License

MIT
