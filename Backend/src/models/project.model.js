import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    owner: {
      type: Schema.Types.ObjectId, //reference to the user schema
      ref: "User",
      required: true,
      index: true,
    },

    order: {
      type: Number,
      default:0
    },

    isInbox: {
      type: Boolean, //if no project is specified then the task will go in INBOX folder
      default: false,
    },

    status: {
      type: String,
      enum: ["active", "archived"], // this is how todoist behaves so adding this functionality here as well
      default: "active",
      index: true,
    },
  },
  { timestamps: true }
);

projectSchema.index(
  { owner: 1 },
  { unique: true, partialFilterExpression: { isInbox: true } } //* partial indexing - for making sure i have only one inbox for each user
);

export const Project = mongoose.model("Project", projectSchema);