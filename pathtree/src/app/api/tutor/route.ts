import { NextRequest, NextResponse } from 'next/server';
import { generateTutorResponse } from '@/lib/mistral';

export async function POST(request: NextRequest) {
  try {
    const { question, content } = await request.json();

    if (!question || !content) {
      return NextResponse.json({ error: 'Question and content are required' }, { status: 400 });
    }

    const response = await generateTutorResponse(question, content);
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Tutor response generation error:', error);
    return NextResponse.json({ error: 'Failed to generate tutor response' }, { status: 500 });
  }
}