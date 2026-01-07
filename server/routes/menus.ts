import express from 'express';
import { z } from 'zod';
import MenuModel from '../models/MenuModel.ts';

const router = express.Router();

// Define the validation schema
// const MenuItemSchema = z.object({
//     title: z.string().min(1, 'Menu item title is required'),
//     link: z.string().min(1, 'Menu item link is required')
// });

// const CreateMenuSchema = z.object({
//     title: z.string().min(1, 'Menu title is required'),
//     code: z.string().min(1, 'Menu code is required'),
//     items: z.array(MenuItemSchema).min(1, 'At least one menu item is required')
// });

const MenuItemSchema = z.object({
    title: z.string().min(1, 'Menu item title is required'),
    link: z.string().min(1, 'Menu item link is required')
})

const MenuSchema = z.object({
    title: z.string().min(1, 'Menu title is required'),
    code: z.string().min(1, 'Menu code is required'),
    items: z.array(MenuItemSchema).min(1, 'At least one menu link is required')
})

type CreateMenuRequest = z.infer<typeof MenuSchema>;

export const createMenu = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        // Validate the request body against the schema
        const validatedData: CreateMenuRequest = MenuSchema.parse(req.body);
        
        const menu = new MenuModel();
        menu.setCode(validatedData.code);
        menu.setTitle(validatedData.title);
        menu.setItems(validatedData.items);
        menu.save();

        res.status(201).json({ message: 'Menu created', data: validatedData });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ 
                message: 'Validation error', 
                errors: error 
            });
        } else {
            console.log('>> error', error);

            next(error);
        }
    }
}

router.post('/create', createMenu);

router.get('/', (req: express.Request, res: express.Response) => {
    // TODO: fetch and return menus from DB
    res.json([]);
});

export default router;