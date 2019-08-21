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
    authors: [authorSchema]
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

async function createCourse(name, authors){
   const course = new Course({
       name,
       authors
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

async function addAuthor(courseId, author){
    const course = await Course.findById(courseId);
    course.authors.push(author);
    course.save();
}

async function removeAuthor(courseId, authorId){
    const course = await Course.findById(courseId);
    const author = course.authors.id(authorId);
    author.remove();
    course.save();
}

// createCourse('Another Course', [
//     new Author({name: 'Azmul Hossain'}),
//     new Author({name: 'Hossain'}),
// ]);
// listCourses();
// authorUpdate('5d51acd7c94923449c26339d');

// addAuthor('5d51b0d794e7f72108428f7e', new Author({name: 'Any'}))
removeAuthor('5d51b0d794e7f72108428f7e', '5d51b2519f50362e6464107f');