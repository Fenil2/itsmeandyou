import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';

const SLOTS_FILE = path.join(process.cwd(), 'data', 'booked-slots.json');

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get('date');
  if (!date) return NextResponse.json({ booked: [] });

  try {
    if (!fs.existsSync(SLOTS_FILE)) return NextResponse.json({ booked: [] });
    const data = JSON.parse(fs.readFileSync(SLOTS_FILE, 'utf8')) as Record<string, string[]>;
    return NextResponse.json({ booked: data[date] ?? [] });
  } catch {
    return NextResponse.json({ booked: [] });
  }
}
