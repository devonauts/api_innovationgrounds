const { sqlcon } = require("../DB/database");

sqlcon.insertResetToken = (email,tokenValue, createdAt, expiredAt, used) =>{
    return new Promise((resolve, reject)=>{
        pool.query('INSERT INTO ResetPasswordToken ( email, Token_value,created_at, expired_at, used) VALUES (?, ?,?, ?, ?)', [email,tokenValue, createdAt, expiredAt, used], (error, result)=>{
            if(error){
                return reject(error);
            }
             
              return resolve(result.insertId);
        });
    });
};
  
sqlcon.expireOldTokens = (email, used) =>{
    return new Promise((resolve, reject)=>{
        pool.query('UPDATE ResetPasswordToken SET used = ?  WHERE email = ?', [ used, email], (error)=>{
            if(error){
                return reject(error);
            }
             
              return resolve();
        });
    });
};

sqlcon.findValidToken = (token, email, currentTime) =>{
    return new Promise((resolve, reject)=>{
        pool.query('SELECT * FROM ResetPasswordToken WHERE (email = ? AND Token_value = ? AND expired_at > ?)', [email,token,  currentTime  ], (error, tokens)=>{
            if(error){
                return reject(error);
            }
            return resolve(tokens[0]);
        });
    });
};
sqlcon.updateUserPassword = ( password, id) =>{
    return new Promise((resolve, reject)=>{
        pool.query('UPDATE User SET  password=? WHERE id = ?', [ password, id], (error)=>{
            if(error){
                return reject(error);
            }
             
              return resolve();
        });
    });
};


module.exports= sqlcon;