import mongoose from "mongoose";

const configOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    };

const connect = async () => {
    // const url = process.env.MONGO_URI;
    const url = 'mongodb+srv://krishnas05:Krishnas05@cluster0.t5joyye.mongodb.net/';
    mongoose.connect(url,configOptions).then(() => console.log("Database connected successfully!")).catch((e)=>
    console.log(`Getting Error from DB connection ${err.message}`)
    )
}

export default connect;