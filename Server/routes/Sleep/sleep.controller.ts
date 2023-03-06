import { Request, Response } from 'express';

import { addSleepFunc } from '../../utils/sleepFunctions';

export const addSleep = async (req: Request, res: Response) => {
    const { userID, timestamp, hoursSlept } = req.body;

    if (!userID) return res.status(400).json({ mssg: 'UUID must be provided' });
    const sleepData = { userID, hoursSlept, timestamp };

    // @ts-ignore
    const { data, error }: any = await addSleepFunc(sleepData);

    if (error) return res.status(400).json({ mssg: error.message });
    else if (data.length === 0)
        return res.status(400).json({ mssg: 'User (UUID) not found!' });
    else
        return res.status(200).json({
            sleep: `Sleep added ${userID},  ${timestamp},  ${hoursSlept}`
        });
};

export const getSleep = async (req: Request, res: Response) => {
    return res.status(200);
};
