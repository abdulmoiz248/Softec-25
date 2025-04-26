import mongoose from "mongoose";

type Connection = {
    isConnected: boolean;
}

const connection: Connection = {
    isConnected: false
};


export default async function connect(){
    if(connection.isConnected){
        console.log("DB already connected");
        return;
    }
    try {
        await mongoose.connect('mongodb+srv://wellcare:wellcare@cluster0.2xezv.mongodb.net/');
        connection.isConnected = true;
        console.log("Connected to DB");
    } catch (error:unknown) {
        console.log(error);
        return;
    }
    
}