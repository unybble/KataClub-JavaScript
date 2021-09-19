export class StrategyManager{
    constructor(){
        this.strategy = null;
    }
    set strategy(strategy){
        this._strategy = strategy;
    }
    get strategy(){
        return this._strategy;
    }
    classify(){
        this._strategy.classify();
    }
}

export class Urgent{
    classify(){
        console.log("urgent");
    }
}

export class Normal{
    classify(){
        console.log("normal");
    }
}

export class Trivial{
    classify(){
        console.log("trival");
    }
}