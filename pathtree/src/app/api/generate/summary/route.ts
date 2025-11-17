import { NextRequest, NextResponse } from 'next/server';
import { generateSummary } from '@/lib/mistral';

export async function POST(request: NextRequest) {
  try {
    const { content, type } = await request.json();

    if (!content || !type) {
      return NextResponse.json({ error: 'Content and type are required' }, { status: 400 });
    }

    if (!['one_page', 'five_page', 'chapters'].includes(type)) {
      return NextResponse.json({ error: 'Invalid summary type' }, { status: 400 });
    }

    const summary = await generateSummary(content, type);
    
    return NextResponse.json(summary);
  } catch (error) {
    console.error('Summary generation error:', error);
    return NextResponse.json({ error: 'Failed to generate summary' }, { status: 500 });
  }
}