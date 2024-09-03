import { connect } from "@/app/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import ToDoList from "@/models/listModel";
import User from "@/models/userModel";

export async function POST(req: NextRequest) {
  await connect();

  try {
    const { task, userName } = await req.json();
    const user = await User.findOne({ name: userName });

    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }

    let todolist = await ToDoList.findOne({ user: user._id });

    if (!todolist) {
      todolist = new ToDoList({
        user: user._id,
        tasks: [{ task }],
      });
    } else {
      todolist.tasks.push({ task });
    }

    await todolist.save();

    return NextResponse.json(
      { message: "Task added successfully", todolist },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error",
        error,
      },
      { status: 500 }
    );
  }
}
