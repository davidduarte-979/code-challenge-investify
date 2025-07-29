import { NextResponse } from 'next/server';
import { CriptoCoin } from '~/app/models/CriptoCoin';
import { ResponseObject } from '~/app/models/Response';

export async function GET() {
  const apiKey = process.env.CMC_PRO_API_KEY;
  const url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=10';

  const res = await fetch(url, {
    headers: {
      'X-CMC_PRO_API_KEY': apiKey || '',
    },
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: res.status });
  }

  const data: ResponseObject<CriptoCoin[]> = await res.json();

  return NextResponse.json(data);
}
