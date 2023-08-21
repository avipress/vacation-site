//imports
import bodyParser from "body-parser";
import cors from "cors"; //npm install cors
import express from "express";
import fileUpload from "express-fileupload";
import config from "./Utils/config";
import ErrorHandler from "./MiddleWare/route-not-found";
import { myBanner } from "./Utils/banner";
import loginRouter from "./Routes/LoginRoutes";
import VacRouter from "./Routes/VacRoutes";
import followersRouter from "./Routes/followersRoutes";
import path from "path";
import multer from 'multer';

//create server
const server = express();

// Handle CORS before any routes
server.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './photos'); // Photos will be saved in the 'photos' folder
  },
  filename: (req, file, cb) => {
      const fileName = file.originalname; // Use the original file name as the filename
      cb(null, fileName);
  },
});

const upload = multer({ storage });
// Route to handle file upload
server.post('/api/vac/addImg', upload.single('photo'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const photoPath = req.file.path; // The path where the uploaded file is saved

  // Do something with the photoPath, e.g., save it in the database

  res.status(200).send('File uploaded successfully.');
});

// how we send the data back (JSON,XML,RAW,String)
server.use(express.json());

// where I will save the video files
server.use(express.static("user_videos"));

// enable file uploading, and create a path for the files if it does not exist
server.use(fileUpload({ createParentPath: true }));

// parse the body as JSON, for easy work
server.use(bodyParser.json());

// how to use the routes
server.use("/api/user", loginRouter);
server.use("/api/vac", VacRouter);
server.use("/api", followersRouter);
server.use("/photos", express.static(path.join(__dirname, "photos")));

// handle errors (route not found)
server.use(ErrorHandler);

console.log(myBanner);

// start the server
server.listen(config.WebPort, () => {
    console.log(`listening on http://${config.mySQLhost}:${config.WebPort}`);
});
