import { Connection, Model, Schema } from 'mongoose';

export interface GoogleGroup {
    googleId: string;
    name: string;
    email: string;
    users: {
        id: string;
        // googleId: string;
        email: string;
    }[];
}

const { String, ObjectId } = Schema.Types;

export type IGoogleGroupRepo = Model<GoogleGroup>;

const googleGroupSchema = new Schema(
    {
        googleId: { type: String, required: true, trim: true },
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true },
        users: [
            new Schema({
                // googleId: { type: String, required: true, trim: true },
                id: { type: ObjectId, required: true },
                email: { type: String, required: true, trim: true }
            })
        ]
    },
    { timestamps: true }
);

googleGroupSchema.index(
    { name: 1 },
    {
        unique: true
    }
);

export const GoogleGroupRepo = async (connection: Connection): Promise<IGoogleGroupRepo> => {
    const googleGroupRepo = connection.model<GoogleGroup>('google-group', googleGroupSchema);
    await googleGroupRepo.syncIndexes();
    return googleGroupRepo;
};
