import { auth } from "@/auth";
import connectDB from "@/lib/db";
import { User } from "@/models/User";

export async function DELETE(
  request: Request,
  { params }: { params: { messageid: string } }
) {
  const messageId = params.messageid;
  await connectDB();
  const session = await auth();

  const _user = session?.user;
  if (!session || !_user) {
    return Response.json(
      {
        success: false,
        message: "Message not authenticated",
      },
      {
        status: 401,
      }
    );
  }
  try {
    const updateResult = await User.updateOne(
      { _id: _user._id },
      { $pull: { messages: { _id: messageId } } }
    );
    console.log(updateResult);
    if (updateResult.modifiedCount === 0) {
      return Response.json(
        {
          success: false,
          message: "Message not found or already deleted",
        },
        {
          status: 404,
        }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Message Deleted",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error deleting message:", error);
    return Response.json(
      { message: "Error deleting message", success: false },
      { status: 500 }
    );
  }
}
