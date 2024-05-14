import mongoose, { Schema } from "mongoose";


const wishlistSchema = new mongoose.Schema(
    {
        userId: {
            type: [Schema.Types.ObjectId],
            ref: 'patient',
            required: true,
        },
        itemId: {
            type: String,
            ref: 'medicineItems'
        },
        markedFav: {
            type: Boolean,
            required: true
        },
        isDeleted: {
            type: Boolean,
            required: true,
            default: false
        }
    }, {
    timestamps: true
}
);


export default mongoose.model("wishlist-patient", wishlistSchema);
