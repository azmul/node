const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
   .then(() => console.log('Mongobd Connected...'))
   .catch(err => console.log(err));

const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
});

const Author = mongoose.model('Author', authorSchema);

const courseSchema = mongoose.Schema({
    name: String,
    author: {
        type: authorSchema,
        required: true
    }
});

const Course = mongoose.model('Course', courseSchema);

async function createAuthor(name, bio, website){
    const author = new Author({
        name,
        bio,
        website
    })
    const result = await author.save();
    console.log(result);
 }

async function createCourse(name, author){
   const course = new Course({
       name,
       author
   })
   const result = await course.save();
   console.log(result);
}

async function listCourses(){
    const courses = await Course.find();
    console.log(courses);
}

async function authorUpdate(courseId){
    const course = await Course.updateOne({ _id: courseId }, {
        $set: {
            'author.name': 'jon smith'
        }
    })
    console.log(course);
}

// createAuthor('Azmul', 'My Bio', 'My Site');
// createCourse('Another Course', new Author({name: 'Azmul Hossain'}));
// listCourses();
authorUpdate('5d51acd7c94923449c26339d');