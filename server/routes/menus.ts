import express from 'express';
const router = express.Router();

export const createMenu = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // TODO: implement create menu logic (validate and persist)
    console.log('>> createMenu', req.body);
    res.status(201).json({ message: 'Menu created', data: req.body });
}

router.post('/create', createMenu);

router.get('/', (req: express.Request, res: express.Response) => {
    // TODO: fetch and return menus from DB
    res.json([]);
});

export default router;