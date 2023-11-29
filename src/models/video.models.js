import mongoose, {Schema} from "mongoose";
// to make advance db operations
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema({
    videoFile: {
        type: String,   // cloudinary url
        required: true,
    },
    thumbnail: {
        type: String,   // cloudinary url
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    duratiom: {
        type: String,
        required: true,
    },
    views: {
        type: Number, //
        required: 0,
    },
    isPublished: {
        type: Boolean, //
        required: true,
        default: false,
    },
    Owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

}, {timestamps: true});

videoSchema.plugins(mongooseAggregatePaginate)

export default Video = mongoose.model("Video", videoSchema);