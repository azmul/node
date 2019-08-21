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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
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
    const courses = await Course
                           .find()
                           .populate('author','name -_id')
                           .sort('name');
    console.log(courses);
}

//createAuthor('Azmul', 'My Bio', 'My Site');
// createCourse('Another Course', '5d51af113ab52d42a02514d6');
listCourses();