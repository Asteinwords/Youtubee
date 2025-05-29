// models/WatchLog.js
import mongoose from "mongoose";

const watchLogSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    video: { type: mongoose.Schema.Types.ObjectId, ref: "Video" },
    watchedSeconds: Number,
    watchedAt: { type: Date, default: Date.now }
});

export default mongoose.model("WatchLog", watchLogSchema);
