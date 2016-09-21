'use strict';

var express = require('express');
var controller = require('./question.controller');

var router = express.Router();

var auth = require('../../auth/auth.service');

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

router.post('/:id/answers', auth.isAuthenticated(), controller.createAnswer);
router.put('/:id/answers/:answerId', auth.isAuthenticated(), controller.updateAnswer);
router.delete('/:id/answers/:answerId', auth.isAuthenticated(), controller.destroyAnswer);

router.post('/:id/comments', auth.isAuthenticated(), controller.createComment);
router.put('/:id/comments/:commentId', auth.isAuthenticated(), controller.updateComment);
router.delete('/:id/comments/:commentId', auth.isAuthenticated(), controller.destroyComment);

router.post('/:id/answers/:answerId/comments', auth.isAuthenticated(), controller.createAnswerComment);
router.put('/:id/answers/:answerId/comments/:commentId', auth.isAuthenticated(), controller.updateAnswerComment);
router.delete('/:id/answers/:answerId/comments/:commentId', auth.isAuthenticated(), controller.destroyAnswerComment);


router.put('/:id/follows', auth.isAuthenticated(), controller.follow);
router.delete('/:id/follows', auth.isAuthenticated(), controller.unfollow);
router.put('/:id/answers/:answerId/follows', auth.isAuthenticated(), controller.followAnswer);
router.delete('/:id/answers/:answerId/follows', auth.isAuthenticated(), controller.unfollowAnswer);
router.put('/:id/comments/:commentId/follows', auth.isAuthenticated(), controller.followComment);
router.delete('/:id/comments/:commentId/follows', auth.isAuthenticated(), controller.unfollowComment);
router.put('/:id/answers/:answerId/comments/:commentId/follows', auth.isAuthenticated(), controller.followAnswerComment);
router.delete('/:id/answers/:answerId/comments/:commentId/follows', auth.isAuthenticated(), controller.unfollowAnswerComment);

module.exports = router;
