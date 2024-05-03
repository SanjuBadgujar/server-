const http = require('http'); // module
const routes = require('./routes/route');
const jwt = require("jsonwebtoken");
const User = require("./model/user");
const app = require('./app'); // files
const { log } = require('console');
const cors = require("cors");
const  authenticateToken  = require('./utils/jwt');


app.use(cors());

app.use('/api',authenticateToken, routes)

app.post("/login",
    async (req, res, next) => {
         console.log("req", req.body)
        let { email, password } = req.body;
 
         console.log("kk", email, password)
        let existingUser;
        try {
            existingUser =
                await User.findOne({ email: email });
                 console.log("obj", existingUser);
        } catch {
            const error =
                new Error(
                    "kk Error! Something went wrong."
                );
            return next(error);
        }
        if (!existingUser
            || existingUser.password
            != password) {
            const error =
                Error(
                    "Wrong details please check at once"
                );
            return next(error);
        }
        let token;
        try {
            //Creating jwt token
            token = jwt.sign(
                {
                    userId: existingUser.id,
                    email: existingUser.email
                },
                "secretkeyappearshere",
                { expiresIn: "1hr" }
            );
        } catch (err) {
            console.log(err);
            const error =
                new Error("Error! Something went wrong.");
            return next(error);
        }
 
        res
            .status(200)
            .json({
                success: true,
                data: {
                    userId: existingUser.id,
                    email: existingUser.email,
                    token: token,
                },
            });
});
 
// Handling post request
app.post("/signup",
    async (req, res, next) => {
         console.log(" i am here",req.body);
        //  const  kk = req.body.username; // work
        const { username, email, password  } = req.body;

        const newUser =
            User({
                username,
                email,
                password,
            });
            console.log(" i am here 2" );
  
        try {
         console.log(" i am herekk");
             
            await newUser.save();
             console.log("here no error")
        } catch {
            const error =
                new Error("1 Error! Something went wrong.");
            return next(error);
        }
        let token;
        try {
            token = jwt.sign(
                {
                    userId: newUser.id,
                    email: newUser.email
                },
                "secretkeyappearshere",
                { expiresIn: "1hr" }
            );
        } catch (err) {
            const error =
                new Error("Error! Something went wrong.");
            return next(error);
        }
        res
            .status(201)
            .json({
                success: true,
                data: {
                    userId: newUser.id,
                    email: newUser.email,
                    token: token
                },
            });
    });

    // app.get('/accessResource',
	// (req, res) => {
    //      console.log(" kk")
	// 	const token =
	// 		req.headers
	// 			.authorization.split(' ')[1];
	// 	//Authorization: 'Bearer TOKEN'
	// 	if (!token) {
	// 		res.status(200)
	// 			.json(
	// 				{
	// 					success: false,
	// 					message: "Error!Token was not provided."
	// 				}
	// 			);
	// 	}
	// 	//Decoding the token
	// 	const decodedToken =
	// 		jwt.verify(token, "secretkeyappearshere");
	// 	res.status(200).json(
	// 		{
	// 			success: true,
	// 			data: {
	// 				userId: decodedToken.userId,
	// 				email: decodedToken.email
	// 			}
	// 		}
	// 	);
	// })




app.set('port', 3001);

const server = http.createServer(app);
server.listen(3001);

console.log("server is start on", 3001);

 