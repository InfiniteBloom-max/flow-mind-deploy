import { NextRequest, NextResponse } from 'next/server';
import { generateFlashcards } from '@/lib/mistral';

export async function POST(request: NextRequest) {
  try {
    const { content, concepts } = await request.json();

    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    const flashcards = await generateFlashcards(content, concepts || []);
    
    return NextResponse.json(flashcards);
  } catch (error) {
    console.error('Flashcard generation error:', error);
    return NextResponse.json({ error: 'Failed to generate flashcards' }, { status: 500 });
  }
}