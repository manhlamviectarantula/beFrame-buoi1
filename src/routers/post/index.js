const express = require('express')
const router = express.Router()
const userModel = require('../../models/user')
const postModel = require('../../models/post')
const { default: mongoose } = require('mongoose')

router.post('/create-post', async (req, res) => {
    const body = req.body
    const { userId } = body

    const userDetail = await userModel.findById(userId)
    if (!userDetail) {
        return res.status(404).send({ message: 'User not found' })
    }

    const post = {
        title: body.title,
        content: body.content,
        imageUrl: body.imageUrl,
        userId: new mongoose.Types.ObjectId(userId)
    }

    const postDetail = new postModel(post)
    const result = await postDetail.save()

    const updatePostUser = await userModel.findByIdAndUpdate(
        userId,
        { $push: { post: result._id } },
        { new: true }
    )

    return res.status(201).send(result)
})

router.get('/get-post-by-id/:id', async (req, res) => {
    const postId = req.params.id;

    const postDetail = await postModel.findById(postId).populate('userId')
    if (!postDetail) {
        return res.status(404).send({ message: 'Post not found' })
    }

    return res.status(200).send(postDetail)
})

module.exports = router