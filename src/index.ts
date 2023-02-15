import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { AuthApi } from './api';
import mongoose from 'mongoose';
import { MONGO_URL, PORT, SERVICE_ACCOUNT_PATH } from './env';
import { GoogleGroupRepo } from './data';
import { GoogleGroupSvc } from './svc';
import { google } from 'googleapis';

const main = async () => {
    // Init database
    const databaseConnection = mongoose.createConnection(MONGO_URL);

    const googleGroupRepo = await GoogleGroupRepo(databaseConnection);

    const app = express();
    app.use(express.json({ limit: '1mb' }));
    app.use(cors());
    app.use(morgan('dev'));

    const authentication = new google.auth.GoogleAuth({
        keyFile: SERVICE_ACCOUNT_PATH,
        scopes: ['https://www.googleapis.com/auth/admin.directory.group']
    });

    google.options({
        auth: authentication
    });

    const directoryInstance = google.admin('directory_v1');

    const googleGroupSvc = GoogleGroupSvc(googleGroupRepo, directoryInstance);

    AuthApi(app);

    // GoogleGroupApi(app, googleGroupSvc);

    // Start application
    app.listen(PORT, () => {
        console.log(`Google Group Service Initialised! - ${PORT}`);
        console.log(`========================`);
    });
};

main();
