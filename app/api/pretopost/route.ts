import { NextResponse } from 'next/server';
import { pretopostService } from '@/app/(main)/pretopost/_service/pretopost.service';
import { ServerApiError } from '@/lib/server-api-client';

function extractToken(request: Request): string | undefined {
  const auth = request.headers.get('Authorization');
  return auth?.replace('Bearer ', '') ?? undefined;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const msisdn = searchParams.get('msisdn');
  const endpoint = searchParams.get('endpoint');
  const token = extractToken(request);

  if (!msisdn || !endpoint) {
    return NextResponse.json(
      { success: false, message: 'Missing required params: msisdn, endpoint' },
      { status: 400 },
    );
  }

  try {
    let data;

    switch (endpoint) {
      case 'profile':
        data = await pretopostService.getProfile(msisdn, token);
        break;
      case 'customer-status':
        data = await pretopostService.getCustomerStatus(msisdn, token);
        break;
      case 'package-details':
        data = await pretopostService.getPackageDetails(msisdn, token);
        break;
      case 'hlr-details':
        data = await pretopostService.getHlrDetails(msisdn, token);
        break;
      case 'device-specs':
        data = await pretopostService.getDeviceSpecs(msisdn, token);
        break;
      default:
        return NextResponse.json(
          { success: false, message: `Unknown endpoint: ${endpoint}` },
          { status: 400 },
        );
    }

    return NextResponse.json({ success: true, message: 'success', data });
  } catch (error) {
    if (error instanceof ServerApiError) {
      return NextResponse.json(
        { success: false, message: error.message, data: error.data },
        { status: error.status },
      );
    }

    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const token = extractToken(request);

  try {
    const body = await request.json();
    const { endpoint, ...payload } = body;

    if (!endpoint) {
      return NextResponse.json(
        { success: false, message: 'Missing required field: endpoint' },
        { status: 400 },
      );
    }

    let data;

    switch (endpoint) {
      case 'submit':
        data = await pretopostService.submitPreToPost(payload, token);
        break;
      default:
        return NextResponse.json(
          { success: false, message: `Unknown endpoint: ${endpoint}` },
          { status: 400 },
        );
    }

    return NextResponse.json({ success: true, message: 'success', data });
  } catch (error) {
    if (error instanceof ServerApiError) {
      return NextResponse.json(
        { success: false, message: error.message, data: error.data },
        { status: error.status },
      );
    }

    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 },
    );
  }
}
