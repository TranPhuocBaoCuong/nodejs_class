const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema

const Course = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        image: { type: String },
        videoId: { type: String, required: true },
        slug: { type: String, slug: 'title', unique: true },
    },
    {
        timestamps: true,
    },
)

Course.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
})
mongoose.plugin(slug)

module.exports = mongoose.model('Course', Course)
