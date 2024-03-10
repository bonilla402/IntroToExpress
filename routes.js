const express = require('express');
const ExpressError = require("./expressError")

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
  
  
  function calculateAverage(numbers) {

    const sum = numbers.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    }, 0);

    const mean = sum / numbers.length;

    return mean;
  }

  function calculateMedian(numbers) {
    // First, sort the numbers in ascending order
    const sortedNumbers = numbers.slice().sort((a, b) => a - b);
  
    const length = sortedNumbers.length;
    const middleIndex = Math.floor(length / 2);
  
    if (length % 2 === 0) {
      // If the length is even, average the two middle values
      return (sortedNumbers[middleIndex - 1] + sortedNumbers[middleIndex]) / 2;
    } else {
      // If the length is odd, return the middle value
      return sortedNumbers[middleIndex];
    }
  }

  function calculateMode(numbers) {
    const frequencyMap = new Map();
  
    // Count the frequency of each number
    numbers.forEach(number => {
      if (frequencyMap.has(number)) {
        frequencyMap.set(number, frequencyMap.get(number) + 1);
      } else {
        frequencyMap.set(number, 1);
      }
    });
  
    let mode = null;
    let maxFrequency = 0;
  
    // Find the number with the highest frequency
    frequencyMap.forEach((frequency, number) => {
      if (frequency > maxFrequency) {
        mode = number;
        maxFrequency = frequency;
      }
    });
  
    return mode;
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