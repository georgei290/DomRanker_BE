import mongoose from "mongoose"
import dot from "dotenv"
dot.config()


let dbString = process.env.DB_STRING_ONLINE_WORK;
// let dbString = process.env.DB_STRING ;

export const connectDB = async(): Promise<void> => {
    try{
        mongoose.connect(dbString!, () => {
          console.log("db connected");
        });
    }catch(err){
      console.log(err)
      process.exit(1)
    }
}