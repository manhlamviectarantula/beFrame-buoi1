const express = require('express')
const router = express.Router()
const userModel = require('../../models/user')
const postModel = require('../../models/post')
const { default: mongoose } = require('mongoose')

router.post('/create-user', async (req, res) => {
    const body = req.body

    const user = new userModel({
        name: body.name,
        email: body.email,
        password: body.password
    })

    const result = await user.save()
    return res.status(201).send(result)
})

router.get('/get-user-by-id/:id', async (req, res) => {
    const userId = req.params.id

    const userDetail = await userModel.findById(userId).populate('post')
    if (!userDetail) {
        return res.status(404).send({ message: 'User not found' })
    }

    return res.status(200).send(userDetail)
})

module.exports = router