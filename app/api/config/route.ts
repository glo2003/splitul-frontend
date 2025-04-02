import { NextResponse } from "next/server";
import { getServerConfig } from "@/app/config/server";

export async function GET() {
  const config = getServerConfig();
  return NextResponse.json(config);
}
