import { connect } from "@/app/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import ToDoList from "@/models/listModel";

export async function GET(req: NextRequest) {
  await connect();

  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("userName");

    const user = await User.findOne({ name: username });

    if (!user) {
      return NextResponse.json({ message: "user not found" });
    }

    const todolist = await ToDoList.findOne({ user: user._id });

    if (!todolist) {
      return NextResponse.json({ tasks: [] }, { status: 200 });
    }

    return NextResponse.json({ tasks: todolist.tasks }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error while reading db data", error },
      { status: 500 }
    );
  }
}
