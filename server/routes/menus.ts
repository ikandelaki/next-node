import express from 'express';
import { z } from 'zod';
import MenuModel from '../models/MenuModel.ts';
import MenuRepository from '../repository/MenuRepository.ts';

const router = express.Router();

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

export const createMenu = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        // Validate the request body against the schema
        const validatedData: CreateMenuRequest = MenuSchema.parse(req.body);
        
        const menu = new MenuModel();
        menu.setCode(validatedData.code);
        menu.setTitle(validatedData.title);
        menu.setItems(validatedData.items);
        await menu.save();

        res.status(201).json({ message: 'Menu created', data: validatedData });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ 
                message: 'Validation error', 
                error
            });
        } else {
            res.status(400).json({ 
                message: 'Internal server error',
                error
            });
        }
    }
}

export const getAllMenus =  async (req: express.Request, res: express.Response) => {
    const menuRepository = new MenuRepository();
    
    const menus = await menuRepository.getAll();
    console.log('>> menus', menus);
    res.json([]);
}

router.post('/create', createMenu);

router.get('/', getAllMenus);

export default router;