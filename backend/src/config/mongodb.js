import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected', () => {
        console.log("connection established")
    });

    await mongoose.connect(`${process.env.MONGODB_URI}`)
    .then(()=>{
        console.log("Mongodb connected")
    }).catch((error)=>{
        console.log("Mongodb Connection Error : ", error);
        
    })

}

export default connectDB;