import mongoose from "mongoose";


const connect = async () => {
    const url = process.env.MONGO_URI;
    mongoose.connect(url).then(() => console.log("Database connected successfully!")).catch((err) =>
        console.log(`Getting Error from DB connection ${err.message}`)
    )
}

export default connect;