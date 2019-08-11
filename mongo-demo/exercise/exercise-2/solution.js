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
    // return Course.find({tags: {$in: ['backend', 'frontend']}, isPublished: true})
    //              .sort({price: -1})
    //              .select({name: 1, author: 1, price: -1})
    return Course.find({isPublished: true})
                .or([{tags: 'backend'}, {tags:'frontend'}])
                .sort('-price')
                .select('name author price')
}

async function run() {
    const courses = await getCourses();
    console.log(courses);
}

run();
