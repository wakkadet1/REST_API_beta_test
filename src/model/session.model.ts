import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface SchemaDocument extends mongoose.Document {
    user: UserDocument['_id'];
    valid: boolean;
    userAgent: string;
    createdAt: Date;
    updatefAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}
const sessionSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref:'user'},
        valid: { type: Boolean,default:true},
        userAgent: {type: String}
    },
    { timestamps: true}
);


const SessionModel = mongoose.model<SchemaDocument>("Session",sessionSchema);

export default SessionModel;