  
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

  module.exports = {
    calculateAverage,
    calculateMedian,
    calculateMode
  };
  