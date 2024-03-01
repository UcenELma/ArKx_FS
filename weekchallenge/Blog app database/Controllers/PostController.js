const Post = require('../Models/Post');


const getPosts = async (req, res) => {
    let posts = await Post.find();
    posts.length == 0 ? res.json({ message: "no posts found !!!" }) : res.json(posts);
}
const AddPost = async (req, res) => {
    let newPost = new Post;
    newPost.title = req.body.title;
    newPost.description = req.body.description;
    newPost.author = req.body.author;
    await newPost.save()
    res.json({ message: "you create new post successfully !!!" })
}

const RemovePost = async (req, res) => {
    let id = req.params.id;
    let delPost = (await Post.deleteOne({ _id: id })).deletedCount;
    delPost != 0 ? res.json({ message: 'post was deleted' }) : res.json({ message: "no post found !!!" })
}

const EditPost = async (req, res) => {
    let id = req.params.id;
    let edit = await Post.findOneAndUpdate({ _id: id }, { $set: { title: req.body.title } });
    console.log(edit);
}

const Search = async (req, res) => {
    let id = req.body.id;
    let post = await Post.findOne({ id: id })
    res.json({ data: post });
}

const pagination = async (req, res) => {
    let pageNumber = req.params.pageNumber;
    let pageSize = req.params.pageSize;

    let posts = await Post.find().skip((pageNumber - 1) * pageSize).limit(pageSize)
    res.send(posts)

}


module.exports = { getPosts, AddPost, RemovePost, EditPost, Search, pagination };