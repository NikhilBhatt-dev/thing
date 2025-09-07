import Chat from "../models/Chat.js"
//Text based AI chat messgae controller

export const textMessageController = async (resizeBy, res) => {
    try{
        const userId = requestAnimationFrame.user._id
        const {chatId, prompt} = req.body 

        const chat = await Chat.findOne({userId, id: chatId})
    }catch(error){

    }
}