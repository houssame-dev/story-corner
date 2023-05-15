import mongoose from "mongoose";

const storySchema = mongoose.Schema({
    caption: { type: String, required: true },
    username: { type: String, required: true },
    userId: { type: String, required: true },
    image: { type: String, required: true },
    tags: { type: String, required: true },
    likes: { type: [String], default: [] },
    postDate: { type: Date, default: Date.now },
});

export default mongoose.model("Story", storySchema);
