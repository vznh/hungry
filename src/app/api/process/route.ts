import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const { url, apiKey } = await request.json();

    if (!url || !apiKey) {
      return NextResponse.json(
        { error: 'URL and API key are required' },
        { status: 400 }
      );
    }

    const openai = new OpenAI({
      apiKey: apiKey,
    });

    // Extract video ID from URL
    const videoId = url.split('/').pop()?.split('?')[0];
    
    if (!videoId) {
      return NextResponse.json(
        { error: 'Invalid TikTok URL' },
        { status: 400 }
      );
    }

    // Get video information from TikTok API
    console.log('Fetching video info from TikTok API...');
    const response = await axios.get(`https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`);
    console.log('TikTok API response:', response.data);
    const videoInfo = response.data;

    if (!videoInfo || !videoInfo.title) {
      console.error('Invalid video info received:', videoInfo);
      return NextResponse.json(
        { error: 'Could not fetch video information' },
        { status: 404 }
      );
    }

    // Process content through GPT-4
    console.log('Processing with OpenAI...');
    const prompt = `
      Analyze the following content from a TikTok video and extract a recipe in a structured format.
      
      Video Title: ${videoInfo.title}
      Video Description: ${videoInfo.author_name}
      
      Please provide a structured recipe with:
      - Title
      - Ingredients (with amounts and units)
      - Step-by-step instructions
      - Prep time (if mentioned)
      - Cook time (if mentioned)
      - Servings (if mentioned)
      
      Format the response as a JSON object.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a recipe extraction assistant. Extract recipes from content and format them consistently."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" }
    });

    console.log('OpenAI response:', completion.choices[0].message.content);

    const recipe = JSON.parse(completion.choices[0].message.content || '{}');

    return NextResponse.json(recipe);
  } catch (error) {
    console.error('Detailed error:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      response: error instanceof axios.AxiosError ? error.response?.data : undefined
    });
    
    return NextResponse.json(
      { 
        error: 'Failed to process video',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 