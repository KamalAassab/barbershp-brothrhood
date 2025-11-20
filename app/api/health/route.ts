import { NextResponse } from 'next/server';

// Health check endpoint for monitoring and deployment verification

export async function GET() {
  return NextResponse.json({ 
    status: 'ok',
    timestamp: new Date().toISOString()
  });
} 