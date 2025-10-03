import mongoose from "mongoose";

const clubSchema = new mongoose.Schema(
  {
    clubName: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      required: true,
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    logo: {
      type: String, 
      default: null,
    },
    rules: {
      type: [String],
      default: [],
    },
    // roles: [
    //   {
    //     roleName: {
    //       type: String, // e.g. "President", "Vice President"
    //       required: true,
    //     },
    //     userId: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "User",
    //       default: null, // user holding the role
    //     },
    //     privileges: {
    //       type: [String], // e.g. ["approveMembers", "manageEvents"]
    //       default: [],
    //     },
    //   },
    // ],
    status: {
      type: String,
      enum: ["active", "inactive", "pending"],
      default: "active",
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

const Club = mongoose.model("Club", clubSchema);

export default Club;
