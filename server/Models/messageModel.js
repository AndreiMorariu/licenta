import mongoose from 'mongoose';

const MessageSchema = mongoose.Schema(
  {
    chatId: {
      type: String,
    },
    senderId: String,
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

const MessageModel = mongoose.model('Message', MessageSchema);
export default MessageModel;
