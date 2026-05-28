import mongoose from "mongoose";

export interface IUser {
  _id?: mongoose.Types.ObjectId;

  name: string;

  email: string;

  password: string;

  schoolName: string;

  selectedClass: number;

  createdAt?: Date;

  updatedAt?: Date;
}

const userSchema =
  new mongoose.Schema<IUser>(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },

      password: {
        type: String,
        required: true,
        minlength: 6,
      },

      schoolName: {
        type: String,
        required: true,
        trim: true,
      },

      selectedClass: {
        type: Number,
        required: true,
        min: 1,
        max: 12,
      },
    },

    {
      timestamps: true,
    },
  );

export const UserModel =
  mongoose.model<IUser>(
    "User",
    userSchema,
  );