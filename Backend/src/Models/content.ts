import mongoose,{Schema} from "mongoose";

const tagsType = ['twitterLink','twitterVideo','instagramLink','instagramVideo','youtubeLink']

const contentSchema = new mongoose.Schema({
  link: { type: String, required: true },
  title: { type: String, required: true },
  tags:{
    type: [String],
    enum: tagsType
  },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});
  

const Content =  mongoose.model('Content',contentSchema)

export {Content}