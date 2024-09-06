import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get('refresh-token');
  try {
    const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/account/refreshaccess`, {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (refreshRes.ok) {
      const { accessToken } = await refreshRes.json();
      const res = NextResponse.json({ success: true }, { status: 200 });
      res.cookies.set('access-token', accessToken);
      return res;
    } else {
      return NextResponse.json({ success: false, message: 'Unable to refresh token' }, { status: 401 });
    }
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
