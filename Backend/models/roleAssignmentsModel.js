import mongoose from "mongoose";

const roleAssignmentSchema = new mongoose.Schema(
  {
    clubId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      required: true,
    },
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClubRole",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    membershipId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClubMembership",
      required: true,
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // admin or committee member
      required: true,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "revoked", "expired"],
      default: "active",
    },
    isCurrent: {
      type: Boolean,
      default: true,
    },
    reason: {
      type: String,
      default: null,
    },
  },
  { timestamps: true } // adds createdAt and updatedAt 
);

// auto-toggle isCurrent based on status/endDate
roleAssignmentSchema.pre("save", function (next) {
  if (this.endDate || this.status !== "active") {
    this.isCurrent = false;
  } else {
    this.isCurrent = true;
  }
  next();
});

const RoleAssignment = mongoose.model("RoleAssignment", roleAssignmentSchema);

export default RoleAssignment;


// {
//   "_id": "ra001",
//   "clubId": "c101",
//   "roleId": "r001",
//   "userId": "u123",
//   "membershipId": "m555",
//   "assignedBy": "u001",
//   "startDate": "2025-09-20T08:00:00Z",
//   "endDate": null,
//   "status": "active",
//   "isCurrent": true,
//   "reason": null,
//   "createdAt": "2025-09-20T08:00:00Z",
//   "updatedAt": "2025-09-20T08:00:00Z"
// }
