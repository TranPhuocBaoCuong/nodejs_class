const Course = require('../models/Course')
const { mongoosesToObject } = require('../../util/mongoose')

class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        let coursesQuery = Course.find({})

        if (req.query.hasOwnProperty('_sort')) {
            coursesQuery = coursesQuery.sort({
                [req.query.column]: req.query.type,
            })
        }

        Promise.all([coursesQuery, Course.countDocumentsDeleted()])
            .then(([courses, deletedCourses]) => {
                res.render('me/stored-courses', {
                    deletedCourses,
                    courses: mongoosesToObject(courses),
                })
            })
            .catch(next)
    }

    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then((courses) =>
                res.render('me/trash-courses', {
                    courses: mongoosesToObject(courses),
                }),
            )
            .catch(next)
    }
}

module.exports = new MeController()
