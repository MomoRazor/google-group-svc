import { admin_directory_v1 } from 'googleapis';
import { IGoogleGroupRepo, GoogleGroup } from '../data';

export interface IGoogleGroupSvc {
    create: (group: GoogleGroup) => Promise<GoogleGroup>;
    update: (group: Partial<GoogleGroup>) => Promise<GoogleGroup>;
}

export const GoogleGroupSvc = (
    googleGroupRepo: IGoogleGroupRepo,
    google: admin_directory_v1.Admin
): IGoogleGroupSvc => {
    const create = async (data: GoogleGroup) => {
        const result = await google.groups.insert({
            requestBody: {
                name: data.name,
                email: data.email
            }
        });

        let createMembers = data.users;

        for (let i = 0; i < createMembers.length; i++) {
            await google.members.insert({
                requestBody: {
                    email: data.users[i].email,
                    id: data.users[i].id,
                    type: 'USER'
                },
                groupKey: result.data.id
            });
        }

        const googleGroup = await googleGroupRepo.create({
            ...data,
            googleId: result.data.id
        });

        if (!googleGroup) throw new Error(`Could not create Google Group`);

        return googleGroup.toObject();
    };

    const update = async (data: Partial<GoogleGroup>) => {
        const googleGroup = await googleGroupRepo.create(data);

        if (!googleGroup) throw new Error(`Could not create Google Group`);

        return googleGroup.toObject();
    };

    return {
        create,
        update
    };
};
