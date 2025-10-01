import mongoose from "mongoose";

const clubMembershipSchema = new mongoose.Schema(
  {
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
      default: "active",
    },
    role: {
      type: String,
      enum: ["member", "admin", "moderator"],
      default: "member",
    },
  },
  {
    timestamps: true, 
  }
);

const ClubMembership = mongoose.model("ClubMembership", clubMembershipSchema);

export default ClubMembership;
