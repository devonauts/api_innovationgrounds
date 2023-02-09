const express = require("express");
const app = express();
const path = require('path');
const AppError = require("../UTILS/appError.js");
const nodemailer = require('nodemailer');
const { hashSync, genSaltSync } = require('bcrypt');
const { sqlcon } = require("./DB/database.js");
//configuración
app.set('port',process.env.PORT || 3000);
app.use(express.json());

//rutas 
app.use(require('./MODELS/user.js'));
app.use(require('/MODELS/services.js'));

app.post('./MODELS/forgotPassword.js', async(req, res, next)=>{
    try{
        const email = req.body.email;
        const origin = req.header('Origin');
        const user = await sqlcon.getEmail(email);
        if(!user){
            
           return res.json({status: 'ok'});
        }
       
        await sqlcon.expireOldTokens(email, 1);

        const resetToken = crypto.randomBytes(40).toString('hex');
        const resetTokenExpires = new Date(Date.now() + 60*60*1000);
        const createdAt = new Date(Date.now());
        const expiredAt = resetTokenExpires;
            
        await sqlcon.insertResetToken(email, resetToken,createdAt, expiredAt, 0);
        await sendPasswordResetEmail(email,resetToken, origin);
        res.json({ message: 'Please check your email for a new password' });
            
    } catch(e){
         console.log(e);
    }
});


/*app.use(require('./ROUTES/services'));
app.use(require('./ROUTES/purchase'));
app.use(require('./ROUTES/items'));*/

//inicio
app.listen(app.get('port'), () => console.log("Servidor en ejecución en el puerto 3000",app.get('port')));
async function sendEmail({ to, subject, html, from = process.env.EMAIL_FROM }) {
    const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
              user: process.env.USER,
              pass: process.env.PASS 
            }
    })
    await transporter.sendMail({ from, to, subject, html });
    console.log("email sent sucessfully");    
};
async function sendPasswordResetEmail(email, resetToken, origin) {
    let message;
     
    if (origin) {
        const resetUrl = `${origin}/apiRouter/resetPassword?token=${resetToken} email=${email}`;
        message = `<p>Please click the below link to reset your password, the following link will be valid for only 1 hour:</p>
                   <p><a href="${resetUrl}">${resetUrl}</a></p>`;
    } else {
        message = `<p>Please use the below token to reset your password with the <code>/apiRouter/reset-password</code> api route:</p>
                   <p><code>${resetToken}</code></p>`;
    }
 
    await sendEmail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: ' Reset your Password',
        html: `<h4>Reset Password</h4>
               ${message}`
    });
}

async function  validateResetToken  (req, res, next){
    const email = req.body.email;
    const resetToken = req.body.token;
    if (!resetToken || !email) {
        return res.sendStatus(400);
       }
    const currentTime =  new Date(Date.now());
    const token = await sqlcon.findValidToken(resetToken, email, currentTime);
    
    if (!token) { 
      res.json ( 'Invalid token, please try again.');
    }
    next();
};

app.post('./MODELS/resetPassword.js', validateResetToken, async(req, res, next)=>{
    try{  
        const newPassword = req.body.password;
        const email = req.body.email;
        if  (!newPassword) {
          return res.sendStatus(400);
         }
     
       const user = await user.getEmail(email);
       const salt = genSaltSync(10);
       const  password = hashSync(newPassword, salt);
       await sqlcon.updateUserPassword(password, user.id);
       res.json({ message: 'Password reset successful, you can now login with the new password' });
    } catch(e){
        console.log(e);
    }
});

module.exports= app;

