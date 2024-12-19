import mongoose from "mongoose"

export const connectDB=async():Promise<any>=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI || '')
        console.log("MongoDB Connected...");
        
    } catch (error:any) {
        console.error(error.message);
        process.exit(1)
        
    }
}