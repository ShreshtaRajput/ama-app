import { auth } from "@/auth";
import connectDB from "@/lib/db";
import { User } from "@/models/User";
// import { User } from "next-auth";

export async function POST(request: Request) {
  await connectDB();

  const session = await auth();
  const user = session?.user;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not authenticated",
      },
      {
        status: 401,
      }
    );
  }

  const userId = user._id;
  const { acceptMessages } = await request.json();

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { isAcceptingMessages: acceptMessages },
      { new: true }
    );

    if (!updatedUser) {
      return Response.json(
        {
          success: false,
          message: "Failed to update the status",
        },
        {
          status: 401,
        }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Status updated successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error retrieving message acceptance status", error);
    return Response.json(
      {
        success: false,
        message: "Failed to update status",
      },
      {
        status: 401,
      }
    );
  }
}

export async function GET(request: Request) {
  await connectDB();

  const session = await auth();
  const user = session?.user;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not authenticated",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const foundUser = await User.findById(user._id);
    if (!foundUser) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    return Response.json(
      {
        success: true,
        isAcceptingMessages: foundUser.isAcceptingMessage,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error retrieving message acceptance status", error);
    return Response.json(
      {
        success: false,
        message: "Failed to update status",
      },
      {
        status: 401,
      }
    );
  }
}
