import mongoose from "mongoose";

const clubMembershipSchema = new mongoose.Schema(
  {
    membershipId: {
      type: String,
      unique: true,
      required: true,
    },
    club_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    joinedAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "pending"],
      default: "pending", // until approval
    },
    role: {
      type: String,
      enum: ["member", "admin", "moderator"],
      default: "member",
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    isCommitteeApproved: {
      type: Boolean,
      default: false,
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // who approved
      default: null,
    },
    approvalDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Generate membershipId if not present
clubMembershipSchema.pre("save", async function (next) {
  if (!this.membershipId) {
    this.membershipId =
      "M" +
      Date.now().toString(36) +
      Math.floor(Math.random() * 1000);
  }
  next();
});

const ClubMembership = mongoose.model( "ClubMembership",clubMembershipSchema);

export default ClubMembership;
