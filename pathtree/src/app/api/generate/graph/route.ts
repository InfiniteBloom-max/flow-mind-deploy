import { NextRequest, NextResponse } from 'next/server';
import { generateKnowledgeGraph } from '@/lib/mistral';

export async function POST(request: NextRequest) {
  try {
    const { content, topics } = await request.json();

    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    const graph = await generateKnowledgeGraph(content, topics || []);
    
    return NextResponse.json(graph);
  } catch (error) {
    console.error('Graph generation error:', error);
    return NextResponse.json({ error: 'Failed to generate graph' }, { status: 500 });
  }
}