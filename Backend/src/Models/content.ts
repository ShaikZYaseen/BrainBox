import mongoose,{Schema} from "mongoose";

const contentTypes = ['image', 'video', 'article', 'audio']; 

const contentSchema = new mongoose.Schema({
  link: { type: String, required: true },
  type: { type: String, enum: contentTypes, required: true },
  title: { type: String, required: true },
  tags:[{type: Schema.Types.ObjectId,ref:'Tag'}],
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const linkSchema = new mongoose.Schema({
    hash: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true,unique:true },
  });

const Link = mongoose.model('Link',linkSchema)  

const Content =  mongoose.model('Content',contentSchema)

export {Link,Content}