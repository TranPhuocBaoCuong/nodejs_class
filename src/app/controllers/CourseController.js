
class CourseController {

	// [GET] /courses
	index(req, res) {
		res.render('courses')
	}

	// [GET] /courses/:slug
	show(req, res) {
		res.send('COURSE DETAIL')
	}

}

module.exports = new CourseController