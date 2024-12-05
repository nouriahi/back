const express = require('express');
const router = express.Router();
const rendezvousController = require('../controllers/rendezvousController');

router.post('/', rendezvousController.createRendezvous);
router.get('/', rendezvousController.getAllRendezvous);
router.get('/:id', rendezvousController.getRendezvousById);
router.put('/:id', rendezvousController.updateRendezvous);
router.delete('/:id', rendezvousController.deleteRendezvous);

module.exports = router;
