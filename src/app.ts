import "reflect-metadata"; // this shim is required

import * as fs from "fs";
import * as path from "path";
import * as express from "express";
import * as cors from "cors";
import * as spdy from "spdy";
import * as stream from "stream";

import { createExpressServer, createKoaServer, useContainer } from "routing-controllers";
import { Container } from "typedi";
import { CategoryController } from "./controllers/CategoryController";

/**
 * Setup routing-controllers to use typedi container.
 */
useContainer(Container);

// creates express app, registers all controller routes and returns you express app instance
// createExpressServer or createKoaServer
const app = createExpressServer({
  controllers: [CategoryController] // we specify controllers we want to use
});

const options = {
  key: fs.readFileSync(path.join(__dirname, "/config/cert/server.key")),
  cert: fs.readFileSync(path.join(__dirname, "/config/cert/server.crt")),
  passphrase: "admin"
};

app.get("/test", (req, res) => {
  /*
  * case 1. use stream pipline
  const r = fs.createReadStream(path.join(__dirname, "../assets/img/momo.png"));
   const ps = new stream.PassThrough(); // <---- this makes a trick with stream error handling
   stream.pipeline(
     r,
     ps, // <---- this makes a trick with stream error handling
     err => {
       if (err) {
         console.log(err); // No such file or any other kind of error
         return res.sendStatus(400);
       }
     }
   );
   ps.pipe(res); // <---- this makes a trick with stream error handling
  */

  // case 2. use buffer
  res.set("Content-Type", "image/png");
  const r = fs.readFileSync(path.join(__dirname, "../assets/img/momo.png"));
  res.send(Buffer.from(r));
});
app.use(express.static("images"));
app.use(cors());

const port = 3000;
spdy.createServer(options, app).listen(port, () => {
  console.log(`App started listening on PORT ${port}`);
});

// run express application on port 3000
// app.listen(3000);

// console.log("Server is up and running at port 3000");
