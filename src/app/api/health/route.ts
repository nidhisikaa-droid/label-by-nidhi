import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ status: "ok", service: "label-by-nidhi" }, { status: 200 });
}
