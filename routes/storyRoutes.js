const express = require('express');
const router = express.Router();
const storyController = require('../controllers/storyController');
const storyValidation = require('../validations/storyValidation')
const { validate } = require('../utils/validate');

router.post('/', storyValidation.createStory(), validate, storyController.createStory);
router.get('/:id', storyValidation.getStory(), validate, storyController.getStory);
router.get('/', storyController.getStories);
router.put('/:id', storyValidation.updateStory(), validate, storyController.updateStory);
router.delete('/:id', storyValidation.deleteStory(), validate, storyController.deleteStory);

module.exports = router