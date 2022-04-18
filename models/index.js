const router = require('express').Router()

const Post = require('./Post')
const Comment = require('./Comment')
const User = require('./User')


module.exports = {Post, Comment, User}