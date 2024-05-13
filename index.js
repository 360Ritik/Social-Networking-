const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controller/userController');
const postController = require('./controller/postController');
const followController = require('./controller/followController');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');
const userSwaggerDocument = require('./documentation/user.json');
const postSwaggerDocument = require('./documentation/post.json');
const followSwaggerDocument = require('./documentation/follow.json');

const app = express();
const PORT = process.env.PORT || 9001;




// Serve Swagger UI at /api-docs route
app.use('/user-docs', swaggerUi.serve, swaggerUi.setup(userSwaggerDocument ));
app.use('/post-docs', swaggerUi.serve, swaggerUi.setup(postSwaggerDocument));
app.use('/follow-docs', swaggerUi.serve, swaggerUi.setup(followSwaggerDocument));



// Apply rate limiting middleware to all routes in index.js
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: 'Too many requests from this IP, please try again later'
});

app.use(limiter);

app.use(express.json());


app.use('/users', userController);
app.use('/posts', postController);
app.use('/follow', followController);

app.get('/',(req,res)=>{
  res.send("application started");
});

app.get('/check',(req,res)=>{
  res.send("application started");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
