import { NextRequest, NextResponse } from 'next/server';
import { generateNodeDetails } from '@/lib/mistral';

export async function POST(request: NextRequest) {
  try {
    const { nodeTitle, content } = await request.json();

    if (!nodeTitle || !content) {
      return NextResponse.json({ error: 'Node title and content are required' }, { status: 400 });
    }

    const details = await generateNodeDetails(nodeTitle, content);
    
    return NextResponse.json(details);
  } catch (error) {
    console.error('Node details generation error:', error);
    return NextResponse.json({ error: 'Failed to generate node details' }, { status: 500 });
  }
}