const jwt= require('jwt-simple');
const momt= require('moment');

const checkToken= (req, res, next) =>{
    if(!req.headers['user_token'])
        return res.json({
            error: 'You must include the header'
        });
        const token = req.headers['user_token'];
        let playload= null;
        try {
           playload=  jwt.decode(playload, process.env.TOKEN_KEY);
        } catch (err){
            return res.json({
                error: 'Token error'
            });
        }
    if(moment().unit()>playload.expiresAt){
        return res.json({error:'Expires token'});
    };
    req.userId = playload.userId;
    next(); 
};

module.exports={
    checkToken : checkToken
}