class CalloutsHelper {
  constructor() { }
  diversityAtParityOrGreater(conf) {
    return conf.diversityPercentage >= .50;
  }

  confFromCurrentYear(conf) {
    return conf.year == (new Date()).getFullYear();
  }
  
  diversityAccumulator(accumulator, conf) { 
    return accumulator + conf.diversityPercentage; 
  }
  
  calculateAverageDiversity(confs) {
    return confs.reduce(this.diversityAccumulator, 0) / confs.length;
  }

  findConfsForCurrentYear(confs) {
    return confs.filter(this.confFromCurrentYear);
  }

  findBestPerformingConf(confs) {
    return confs.sort(this.diversitySorter)[0];
  }

  diversitySorter(confA, confB) {
    if (confA.diversityPercentage < confB.diversityPercentage) {
      return 1;
    }
    if (confA.diversityPercentage > confB.diversityPercentage) {
      return -1;
    }
  
    return 0;
  }
  
  dateAddedSorter(confA, confB) {
    if (confA.dateAdded < confB.dateAdded) {
      return 1;
    }
    if (confA.dateAdded > confB.dateAdded) {
      return -1;
    }
  
    return 0;
  }
}

module.exports = CalloutsHelper;
