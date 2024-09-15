
const nodemailer = require("nodemailer")

// set up the mailing service 
const transporter = nodemailer.createTransport({
    service : "gmail",
    auth :{
        user : process.env.MY_EMAIL,
        pass : process.env.MY_PASSWORD
    }
})

async function  sendMailToUser(to,subject, text) {
    try{
         await transporter.sendMail({
            from : process.env.MY_EMAIL,
            to : to,
            subject:subject,
            text:text
         })
         console.log('Reminder email sent successfully');
    }catch(error){
        console.error('Error sending reminder email:', error);
    }
}



// Adding task to Database
async function handleAddTask(req,res) {
    try{

    }catch(error){
         console.log(error);
         res.status(500).json({error: error , message : "Server error Not able to add task please try later!"})
    }
}
// send task data to user from DB
async function getAllTask(req,res) {
    try{

    }catch(error){
         console.log(error);
         res.status(500).json({error: error , message : "Server error Not able to add task please try later!"})
    }
}









module.exports = {
    sendMailToUser,
    getAllTask,
    handleAddTask
}