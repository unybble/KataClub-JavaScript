class Logger {
    constructor(){
        this.log=[]
    }
    logItem(itm){
        this.log.push(itm)
        console.log("LOGGER: "+JSON.stringify(itm)+"/n");
    }
}

// this is the singleton
class LoggerSingleton {
    constructor() {
      if (!LoggerSingleton.instance) {
        LoggerSingleton.instance = new Logger()
      }
    }
    
    getLoggerInstance() {
      return LoggerSingleton.instance
    }
  }
  
  module.exports = LoggerSingleton