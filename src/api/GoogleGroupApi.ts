import { Application } from 'express';
import { IGoogleGroupSvc } from '../svc';

export const GoogleGroupApi = (
    app: Application,
    googleGroupService: IGoogleGroupSvc,
    prefix: string = ''
) => {
    app.post(`${prefix}/create/google-groups`, async (req, res) => {
        try {
            const { id } = req.body;

            if (!id) {
                return res.status(400).json({
                    data: null,
                    errors: ['Missing Id!']
                });
            }

            const mail = await googleGroupService.getById(id);

            return res.status(200).json({
                data: mail,
                errors: []
            });
        } catch (e: any) {
            console.error(e);
            return res.status(500).json({
                data: null,
                errors: [e.message]
            });
        }
    });

    app.post(`${prefix}/update/google-groups`, async (req, res) => {
        try {
            const { id } = req.body;

            if (!id) {
                return res.status(400).json({
                    data: null,
                    errors: ['Missing Id!']
                });
            }

            const mail = await mailService.getById(id);

            return res.status(200).json({
                data: mail,
                errors: []
            });
        } catch (e: any) {
            console.error(e);
            return res.status(500).json({
                data: null,
                errors: [e.message]
            });
        }
    });
};
