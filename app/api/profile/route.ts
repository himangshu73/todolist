import { connect } from "@/app/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { getTokenData } from "@/app/utils/getTokenData";

export async function GET(req: NextRequest) {
  await connect();

  try {
    const userId = await getTokenData(req);
    const user = await User.findOne({ _id: userId });
    return NextResponse.json({ message: "user found", data: user });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
