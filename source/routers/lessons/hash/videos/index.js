import dg from 'debug';

const debug = dg('router:lessons:videos');

export const addVideo = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const data = { hash: 'hello' };

        res.status(201).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
