const jwt = require('jsonwebtoken');

async function auth (req,res,next){
    var token;
    if ('authorization' in req.headers) {
        token = await req.headers['authorization'].split(' ')[1];
    }

    console.log(token);
    

    if (!token) {
        console.log({ auth: false, message: 'No token provided.' })
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    }
    else {
        jwt.verify(token, process.env.JWT_SECRET,
            (err, decoded) => {
                if (err) {
                    console.error(err)
                    return res.status(500).send({ auth: false, message: 'Token authentication failed.' });
                }
                else {
                    userId= decoded.user;
                    next();
                }
            })
    }
    // try {
    //    const token = req.cookies.token;
    //    if(!token)
    //    {
    //        return res.status(401).json({message:'Unauthorized Access'});
    //    }

    //    const verified = jwt.verify(token, process.env.JWT_SECRET);
    //    next();

    // } catch (err) {
    //     console.error(err);
    //     res.status(401).json({message:'Unauthorized Access'});
    // }
}

module.exports = auth;