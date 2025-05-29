// import videofile from "../Models/videofile.js";
// import mongoose from "mongoose";
// export const viewscontroller = async (req, res) => {
//     const { id: _id } = req.params;
//     if (!mongoose.Types.ObjectId.isValid(_id)) {
//         return res.status(404).send("video unavailable..")
//     }
//     try {
//         const files = await videofile.findById(_id);
//         const Views = files.views;
//         const updateview = await videofile.findByIdAndUpdate(_id, {
//             $set: { views: Views + 1 }
//         })
//         res.status(200).json(updateview)
//     } catch (error) {
//         res.status(400).json("error", error)
//     }
// }

// controllers/views.js
import videofile from "../Models/videofile.js";
import User from "../Models/Auth.js";
import mongoose from "mongoose";

export const viewscontroller = async (req, res) => {
    const { id: _id } = req.params;
    const userId = req.userid;

    console.log("👁 Video ID:", _id);
    console.log("👤 User ID:", userId);

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ message: "Video ID invalid" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).json({ message: "User ID invalid" });
    }

    try {
        const updatedFile = await videofile.findByIdAndUpdate(
            _id,
            { $inc: { views: 1/2 } },
            { new: true }
        );

        if (!updatedFile) {
            return res.status(404).json({ message: "Video not found" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $inc: { points: 2.5 } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log("✅ Updated Views:", updatedFile.views);
        console.log("✅ Updated Points:", updatedUser.points);

        res.status(200).json({
            updatedFile,
            finalViews: updatedFile.views,
            userPoints: updatedUser.points
        });
    } catch (error) {
        console.error("❌ Error in viewscontroller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
