const express = require('express');
const ExpressError = require("./expressError")
const { calculateAverage, calculateMedian, calculateMode } = require('./operations');

const app = express();

app.use(express.json());

function convertStringToNumbers(str) {
    if(!str)
        throw new ExpressError("No nums parameter provided", 400);    

    const strArray = str.split(',');

    const numArray = strArray.map((str) => {
      const num = Number(str.trim());
      if (isNaN(num)) {

        throw new ExpressError(`"${str}" is not a number.`, 404);

      } else {
        return num;
      }
    });

    return numArray;
  }

  app.get("/mean", (req, res, next) => {

    try {
        const numsArray = convertStringToNumbers(req.query.nums);
        result = calculateAverage(numsArray);
        return res.json({ operation: "mean", values: result });
    }
    catch (e) {
        next(e)
    }
  })

  app.get("/median", (req, res, next) => {

    try {
        const numsArray = convertStringToNumbers(req.query.nums);
        result = calculateMedian(numsArray);
        return res.json({ operation: "median", values: result });
    }
    catch (e) {
        next(e)
    }
  })

  app.get("/mode", (req, res, next) => {

    try {
        const numsArray = convertStringToNumbers(req.query.nums);
        result = calculateMode(numsArray);
        return res.json({ operation: "mode", value: result });
    }
    catch (e) {
        next(e)
    }
  })


// generic error handler
app.use(function(err, req, res, next) {
    // the default status is 500 Internal Server Error
    let status = err.status || 500;
    let message = err.message;
  
    // set the status and alert the user
    return res.status(status).json({
      error: {message, status}
    });
  });
  // end generic handler


app.listen(3000, function(){
    console.log('App on port 3000');
  }) 