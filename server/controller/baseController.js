export const getAllItems = (getAllFn) => async (req, res) => {
    try {
        const items = await getAllFn();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch items' });
    }
};

export const getItem = (getByIdFn) => async (req, res) => {
    try {
        const item = await getByIdFn(req.params.id);
        if (!item) return res.status(404).json({ error: 'Item not found' });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch item' });
    }
};

export const deleteItem = (deleteFn) => async (req, res) => {
    try {
        const deleted = await deleteFn(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Item not found' });
        res.status(200).json({ id: deleted });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete item' });
    }
};