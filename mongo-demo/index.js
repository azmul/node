const mongoose = require("mongoose");
const chalk = require('chalk');

const uri = 'mongodb://localhost/courses';  // mongodb://localhost - will fail
mongoose.connect(uri,{ useNewUrlParser: true })
   .then(chalk.blue('Connected to MongoDB...'))
   .catch(err => console.log(chalk.red( err)));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
})
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  try {
    const course = Course({
        name: 'Angular Course',
        author: 'Azmul Hossain',
        tags: ['Frontend'],
        isPublished: true
    })
    const result = await course.save();
    console.log(result);

  } catch(err) {
    console.log(chalk.red( err))
  }

}
// createCourse();

async function getCourses(){

    //** Operator **
    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in
    // nin (not in)
    
    //** Logical Operator **
    // or 
    // and

    //** Pagination **
    const pageNumber = 2;
    const pageSize = 10;

    try{
        const courses = await Course
        //.find({price: {$gte: 10, $lte: 50}})
        //.find({price: {$in: [10,20,50]}})
          .find() // filter 
          .or([{author: 'Azmul Hossain'}, {isPublished: true}])
        //.and([{author: 'Azmul Hossain', isPublished: true}])
          .skip((pageNumber -1) * pageSize) // pagination setting
          .limit(pageSize) 
          .sort({ name: 1 })
          .select({name: 1, tags: 1}) // whats kinds of data have to fetch
        //.count()  count the document
        console.log(courses);
    } catch(err) {
        console.log(err);
    }
}
// getCourses();

async function updateCourse(id){
    // Approach: Query First
    // findById()
    // modifies its properties
    // save()

    // const course = await Course.findById(id);
    // if(!course) return;

    // course.isPublished = true;
    // course.name = 'Another Another';

    // const result = await course.save();
    // console.log(result);

    // Approach: Update First
    // Updated Directly
    // Optionally: Get the updated document

    const course = await Course.findOneAndUpdate({_id: id},{
        $set:{
            name: 'Azmul Hossain',
            isPublished: false
        }
    }, {new: true})
    console.log(course);
}
// updateCourse('5d4fd5fda696ac33e88a3b7f');

async function deleteCourse(id){
    const result = await Course.deleteOne({_id: id});
    console.log(result);
}

deleteCourse('5d4fd5fda696ac33e88a3b7f');

