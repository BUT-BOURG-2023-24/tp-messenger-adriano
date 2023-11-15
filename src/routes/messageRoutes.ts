const express = require('express');
const messageRoutesController = require('./Controller/messageRoutesController');

const router = express.Router();

router.put('/:id', messageRoutesController.editMessage);
router.post('/:id/react', messageRoutesController.reactToMessage);
router.delete('/:id', messageRoutesController.deleteMessage);

module.exports = router;
