const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercise', { useNewUrlParser: true })
   .then(console.log('Connected'))
   .catch(err => console.log(err))

const courseSchema = mongoose.Schema({
    tags: [String],
    name: String,
    date: Date,
    author: String,
    isPublished: Boolean,
    price: Number
})

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
    return Course.find({tags: 'backend', isPublished: true})
                 .sort({name: 1})
                 .select({name: 1, author: 1})

}

async function run() {
    const courses = await getCourses();
    console.log(courses);
}

run();
