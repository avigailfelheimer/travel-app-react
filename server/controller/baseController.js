import { FETCH_FAILED, FETCH_ITEM_FAILED, ITEM_NOT_FOUND, DELETE_FAILED } from '../const/errorConst.js';

export const getAllItems = (getAllFn) => async (req, res) => {
    try {
        const items = await getAllFn();
        res.json(items);
    } catch (err) {
        res.status(FETCH_FAILED.status).json({ error: FETCH_FAILED.message });
    }
};

export const getItem = (getByIdFn) => async (req, res) => {
    try {
        const item = await getByIdFn(req.params.id);
        if (!item) return res.status(ITEM_NOT_FOUND.status).json({ error: ITEM_NOT_FOUND.message });
        res.json(item);
    } catch (err) {
        res.status(FETCH_ITEM_FAILED.status).json({ error: FETCH_ITEM_FAILED.message });
    }
};

export const deleteItem = (deleteFn) => async (req, res) => {
    try {
        const deleted = await deleteFn(req.params.id);
        if (!deleted) return res.status(ITEM_NOT_FOUND.status).json({ error: ITEM_NOT_FOUND.message });
        res.status(200).json({ id: deleted });
    } catch (err) {
        res.status(DELETE_FAILED.status).json({ error: DELETE_FAILED.message });
    }
};