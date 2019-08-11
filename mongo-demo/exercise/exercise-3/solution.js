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
    try {
        return Course.find({isPublished: true})
                .or([
                    {price: {$gte: 15}}, 
                    { name: /.*by.*/i } 
                    // Start with  { name: /.*by.*/i } 
                    // End with { name: /.*by.*/i } 
                ])
                .sort('-price')
                .select('name author price')
    } catch(err){
        console.log(err)
    }
    
}

async function run() {
    const courses = await getCourses();
    console.log(courses);
}

run();
