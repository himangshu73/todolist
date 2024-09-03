import { connect } from "@/app/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import ToDoList from "@/models/listModel";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { taskId: string } }
) {
  await connect();

  const { taskId } = params;

  try {
    const result = await ToDoList.updateOne(
      { "tasks._id": taskId },
      { $pull: { tasks: { _id: taskId } } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ message: "Task not found" }, { status: 200 });
    }

    return NextResponse.json(
      { message: "Task deleted successfully" },
      { status: 500 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error Deleting task", error });
  }
}
