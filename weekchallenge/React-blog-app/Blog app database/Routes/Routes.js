const router = require('express').Router();
const { check, body } = require('express-validator');
const { AddUser, login, getUsers } = require('../Controllers/UserController');
const { getPosts, AddPost, RemovePost, EditPost, Search, pagination } = require('../Controllers/PostController');
const verifyToken = require('../Middlewares/VerifyToken')



// POST ROUTES

router.get('/getPosts', getPosts);
router.post('/addPost', verifyToken, AddPost);
router.delete('/removePost/:id', verifyToken, RemovePost);
router.put('/editPost/:id', verifyToken, EditPost);
router.get('/search/:id', verifyToken, Search)
router.get('/pagination/:pageNumber/:pageSize', verifyToken, pagination);


// USER ROUTES

router.post('/signup', [
    body('name').exists().isString().isLength({ min: 1 }).withMessage('name is required'),
    body('email').exists().isString().isLength({ min: 1 }).withMessage('email is required'),
    body('password').exists().isString().isLength({ min: 1 }).withMessage('password is required'),
], AddUser);

router.post('/login', [
    body('email').exists().isString().isLength({ min: 1 }).withMessage('Email required !!!'),
    body('password').exists().isString().isLength({ min: 1 }).withMessage('password required !!!')
], login);

router.get('/getUsers', verifyToken, getUsers)

module.exports = router;