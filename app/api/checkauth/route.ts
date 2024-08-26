import { connect } from "@/app/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/userModel";

export async function GET(req: NextRequest) {
  await connect();

  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ isLoggedIn: false });
    }

    const decoded_token: any = jwt.verify(token, process.env.TOKEN_SECRET!);

    const user = await User.findById(decoded_token.id);
    if (!user) {
      return NextResponse.json({ isLoggedIn: false });
    }

    return NextResponse.json({
      isLoggedIn: true,
      userName: user.name,
    });
  } catch (error) {
    return NextResponse.json({ isLoggedIn: false });
  }
}
