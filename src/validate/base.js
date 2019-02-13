export const valiate = (param,rulesObj)=>{
    for(let key in rulesObj){
        console.log("key==>",key)
        let rules = rulesObj[key];
        for(let rule of rules){
            if('function'== typeof(rule.validator)){
                console.log("validatordone==")
                let result = rule.validator(rule, param[key]);
                if(! result.result){
                    return result;
                }
            }
        }
    }
    return {result: true};
}