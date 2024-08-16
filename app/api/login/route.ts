import { connect } from "@/app/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";

const bcrypt = require("bcrypt");

export async function POST(req: NextRequest) {
  await connect();

  try {
    const { email, password } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "User does not exists." },
        { status: 400 }
      );
    } else {
      console.log("User Found");
    }

    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) {
      return NextResponse.json(
        { message: "Incorrect Password" },
        { status: 400 }
      );
    }

    const tokendata = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    const token = await jwt.sign(tokendata, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login Successfull",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Error while login", error },
      { status: 500 }
    );
  }
}
