import connectDB from "@/lib/db";
import { User } from "@/models/User";
import { Message } from "@/models/User";

export async function POST(request: Request) {
  await connectDB();

  const { username, content } = await request.json();

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "No user found",
        },
        { status: 404 }
      );
    }

    if (!user.isAcceptingMessage) {
      return Response.json(
        {
          success: false,
          message: "User is not accepting messages",
        },
        { status: 403 }
      );
    }

    const newMessage = { content, createdAt: new Date() };

    user.messages.push(newMessage as Message);
    await user.save();
    return Response.json(
      {
        success: true,
        message: "Message sent successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error sending message.", error);
    return Response.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
