import mongoose from "mongoose";

const clubRoleSchema = new mongoose.Schema(
  {
    clubId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      required: true,
    },
    roleName: {
      type: String,
      required: true,
      enum: ["President", "Vice President", "Secretary", "Treasurer", "Member", "Custom"], 
    },
    description: {
      type: String,
      default: "",
    },
    permissions: {
      type: [String], // e.g. ["approveMembers", "manageEvents"]
      default: [],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, // assigned user
    },
    assignedAt: {
      type: Date,
      default: null,
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // who assigned the role
      default: null,
    },
  },
  { timestamps: true }
);

const ClubRole = mongoose.model("ClubRole", clubRoleSchema);

export default ClubRole;

// {
//   "_id": "role101",
//   "clubId": "c101",
//   "roleName": "President",
//   "description": "Leads the club and manages overall operations",
//   "permissions": ["approveMembers", "manageEvents", "assignRoles"],
//   "userId": "u123",
//   "assignedAt": "2025-10-03T08:00:00Z",
//   "assignedBy": "u001",
//   "createdAt": "2025-10-01T07:00:00Z",
//   "updatedAt": "2025-10-03T08:00:00Z"
// }
