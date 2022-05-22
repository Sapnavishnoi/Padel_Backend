const jwt = require('jsonwebtoken');
const SECRET = "secret";


const AuthMiddleware = (req, res, next) => {
 
//   try {
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]

    // if (token == null) return res.status(403).json({ "status":403, "message":"Access denied" });
   
    // jwt.verify(token, SECRET, (err, user) => {
    //     console.log(err)
    //     console.log(user)
    //     if (err) return res.sendStatus(403)
    //     const users =  Users.findOne({_id: decoded.id});
    //     console.log(users,"user from auth middleware!!!!!")
    //     req.user = user
    //     next()

    //  })

//         const decoded = jwt.verify(token, SECRET);
//         console.log(decoded)
//         req.user = decoded;

//     } catch( error){
//         console.log(error,"errrr")
//          res.status(400).json({ "status":403, "message":"Invalid token" });
//     }

// }


    try {
        const authHeader = req.headers['authorization']
            const token = authHeader && authHeader.split(' ')[1]
        // console.log(token,"tokennn")
        if (!token) return res.status(403).send("Access denied.");

        const decoded = jwt.verify(token, SECRET);
       
        req.user = decoded.sub;
        // console.log(req.user,"dddd")

        next();
    } catch (error) {
        res.status(400).send("Invalid token");
    }
};

module.exports = AuthMiddleware;