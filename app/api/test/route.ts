import { connect } from "@/app/dbConfig/dbConfig";
import { NextResponse } from "next/server";

export async function GET() {
  await connect();

  return NextResponse.json({ message: "connected to mongodb" });
}
