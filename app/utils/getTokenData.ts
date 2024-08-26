import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function getTokenData(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decoded_token: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    return decoded_token.id;
  } catch (error) {
    return NextResponse.json({ message: "error", error }, { status: 500 });
  }
}
