const app = require('./app');
const connectDB = require('./config/db');

connectDB().then(()=>{
    app.listen(5000,()=>console.log("running at 5000"))
}).catch((err)=>{
    console.log(err);
})
