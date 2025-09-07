
// export default chatRouter

import express from "express";
import { createChat, deleteChat, getChats } from "../controllers/chatController.js";
import { protect } from "../middlewares/auth.js";

const chatRouter = express.Router();

// Create a chat
chatRouter.post('/create', protect, createChat);

// Get all chats
chatRouter.get('/get', protect, getChats);

// Delete a chat by ID
chatRouter.delete('/:chatId', protect, deleteChat);

export default chatRouter;
