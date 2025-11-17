import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import mammoth from 'mammoth';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'uploads');
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    // Generate unique filename
    const fileId = Date.now() + '-' + Math.random().toString(36).substring(2);
    const filename = `${fileId}-${file.name}`;
    const filepath = join(uploadsDir, filename);

    // Save file
    await writeFile(filepath, buffer);

    // Extract content based on file type
    let extractedContent = '';
    let topics: string[] = [];
    let sections: string[] = [];
    let conceptList: string[] = [];

    if (file.type === 'application/pdf') {
      // PDF parsing temporarily disabled due to compatibility issues
      extractedContent = 'PDF parsing is temporarily disabled. Please use text or Word files for now.';
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const result = await mammoth.extractRawText({ buffer });
      extractedContent = result.value;
    } else if (file.type.startsWith('text/')) {
      extractedContent = buffer.toString('utf-8');
    } else {
      return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 });
    }

    // Basic extraction of topics, sections, and concepts
    const lines = extractedContent.split('\n').filter(line => line.trim());
    
    // Extract potential topics (lines that look like headers)
    topics = lines
      .filter(line => line.length < 100 && (
        line.match(/^[A-Z][^.]*$/) || 
        line.match(/^\d+\.?\s+[A-Z]/) ||
        line.match(/^Chapter|^Section|^Part/i)
      ))
      .slice(0, 20);

    // Extract sections (numbered items or bullet points)
    sections = lines
      .filter(line => line.match(/^[\d\-\*•]\s+/) || line.includes(':'))
      .slice(0, 30);

    // Extract potential concepts (capitalized words/phrases)
    const conceptMatches = extractedContent.match(/\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b/g) || [];
    conceptList = [...new Set(conceptMatches)]
      .filter(concept => concept.length > 3 && concept.length < 50)
      .slice(0, 50);

    return NextResponse.json({
      file_id: fileId,
      filename: file.name,
      topics,
      sections,
      concept_list: conceptList,
      raw_text: extractedContent
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}