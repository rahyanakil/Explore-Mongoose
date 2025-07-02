import mongoose from 'mongoose';
import  app  from './app';
import {Server} from 'http';


let server:Server;
const PORT =5000;
async function main(){
    try{
        // await mongoose.connect('mongodb+srv://rahyanakil89:4zPNcGHtim7JBIvF@cluster0.hvppqd2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        await mongoose.connect('mongodb+srv://rahyanakil89:4zPNcGHtim7JBIvF@cluster0.hvppqd2.mongodb.net/advance-Note-App?retryWrites=true&w=majority&appName=Cluster0')
       // mongodb+srv://rahyanakil89:<db_password>@cluster0.hvppqd2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
        console.log('connected to mongodb')
        server =app.listen(PORT, ()=>{
            console.log(`App is listening on port ${PORT}`)
            
        })
    }catch(error){
        console.log(error)
    }
}
main()