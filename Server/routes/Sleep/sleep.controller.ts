import { Request, Response } from 'express';
import { addSleepFunc, getSleepFunc } from '../../utils/sleepFunctions';

export const addSleep = async (req: Request, res: Response) => {
    const { userID, timestamp, hoursSlept } = req.body;

    if (!userID) return res.status(400).json({ mssg: 'UUID must be provided' });

    // const { dataGet, errorGet }: any = await getSleepFunc(
    //     userID,
    //     timestamp,
    //     timestamp
    // );
    // console.log(`getSleep data is: ${errorGet}`);

    // if (dataGet === undefined) {
    //     return res
    //         .status(409)
    //         .json({ mssg: 'Sleep data for this date already exists.' });
    // }

    const { data, error }: any = await addSleepFunc(req.body);

    if (error) return res.status(400).json({ mssg: error.message });
    else if (data.length === 0)
        return res.status(404).json({ mssg: 'User (UUID) not found!' });
    else
        return res.status(200).json({
            sleep: `Sleep added ${userID},  ${timestamp},  ${hoursSlept}`
        });
};

export const getSleep = async (req: Request, res: Response) => {
    const { userID, startDate, endDate } = req.body;

    if (!userID)
        return res.status(400).json({ mssg: 'UserID must be provided' });
    if (!startDate || !endDate)
        return res
            .status(400)
            .json({ mssg: 'Start and end date must be provided' });

    const { data, error }: any = await getSleepFunc(userID, startDate, endDate);
    console.log(`getSleep data is: ${JSON.stringify(data)}`);
    if (error || data === null)
        return res.status(400).json({ mssg: error.message });
    else if (data.length === 0)
        return res.status(404).json({ mssg: 'Data not found!' });
    else return res.status(200).json({ sleep: data });
};
