import mongoose, {Schema} from "mongoose";

const todoSchema = new Schema(
  {
    // --- CONTENT ---
    content: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    // --- OWNERSHIP ---
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      index:true
    },

    section: {
      type: Schema.Types.ObjectId,
      ref: "Section",
      default: null,
    },

    // --- HIERARCHY ---
    parentId: {
      type: Schema.Types.ObjectId,  //* our webapp allows to have subtasks under a parent task, by default its null
      ref: "Todo",
      default: null,
      index: true,
    },

    // --- ORDERING ---
    order: {
      type: Number,  //* for drag and drop 
      default:0
    },

    // --- PRIORITY ---
    priority: {
      type: Number,
      enum: [1, 2, 3, 4], // 1 = high, 4 = low
      default: 4,
    },

    // --- DATES ---
    dueDate: {
      type: Date,
      default: null,
    },

    completedAt: {
    type: Date,
    default: null
    },

    // --- STATUS (soft delete + archive) ---
    status: {
      type: String,
      enum: ["active", "completed", "archived", "deleted"],  //* we implemented soft delete - not deleting from the db instantly but marking it as deleted 
      default: "active",                                    //* reason for soft delete is trust over data and user can recover the tasks which were deleted accidently
      index: true,
    },
  },
  { timestamps: true }
);

// CORE INDEX FOR LISTING TASKS
todoSchema.index({  //* boosts performance significantly, often considered a best practice when we have to sort afterwards
  project: 1, 
  section: 1,     //* 1 means asc order and -1 means dsc order
  parentId: 1,
  order: 1,
});    

export const Todo = mongoose.model("Todo", todoSchema);

// User
// └── Projects (one is Inbox)
//     └── Sections (optional grouping)
//         └── Todos
//             └── Subtasks (Todos with parentId, which are just tasks themselves)