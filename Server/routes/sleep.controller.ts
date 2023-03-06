import { Request, Response } from 'express';

import { getUserByEmail } from '../utils/userFunctions';

export const sleep = async (req: Request, res: Response) => {
    const { date, duration } = req.body;

    if (!email) return res.status(400).json({ mssg: 'Email must be provided' });

    // @ts-ignore
    const { data, error }: any = await getUserByEmail(
        email,
        'firstName, lastName, email, age'
    );

    if (error) return res.status(400).json({ mssg: error.message });
    else if (data.length === 0)
        return res.status(400).json({ mssg: 'User not found!' });
    else return res.status(200).json({ user: data[0] });
};
