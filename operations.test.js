const { calculateAverage, calculateMedian, calculateMode } = require('./operations');

describe("#findMedian", function(){
    it("finds the median of an even set", function(){ 
      expect(calculateMedian([1, -1, 4, 2])).toEqual(1.5)
    })
    it("finds the median of an odd set", function () { 
      expect(calculateMedian([1, -1, 4])).toEqual(1)
    })
  })
  
  describe("#findMean", function () {
    it("finds the mean of an array of numbers", function () { 
      expect(calculateAverage([1,-1,4,2])).toEqual(1.5)
    })
  })
  
  describe("#findMode", function () {
    it("finds the mode", function () { 
      expect(calculateMode([1,1,1,2,2,3])).toEqual(1)
    })
  })