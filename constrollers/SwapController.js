const { swap } = require('../models');
const SwapController = {
    swapAjax: async(req, res) => {
        const swapID = await swap.findOne({
            include: ['user', 'book'],
            where: {
                id: req.params.id
            }
        })
        return res.json({ "swap": swapID });
    },
}
module.exports = SwapController;