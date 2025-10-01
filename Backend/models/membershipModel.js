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
      default: "active",
    },
    role: {
      type: String,
      enum: ["member", "admin", "moderator"],
      default: "member",
    },
  },
  { timestamps: true }
);

// generate membershipId 
clubMembershipSchema.pre("save", async function (next) {
  if (!this.membershipId) {
    this.membershipId = "M" + Date.now().toString(36) + Math.floor(Math.random() * 1000);
  }
  next();
});

const ClubMembership = mongoose.model("ClubMembership", clubMembershipSchema);

export default ClubMembership;
