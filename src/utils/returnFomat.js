/*
api 接口返回处理函数
*/ 
export  const ajaxReturn = (res,message = "success",data=[],code=200)=>{
    res.send({
        result: code==200,
        message: message,
        model: data
    });
}

export const ajaxReturnGrid =(res,message = "success",data=[],numRows=0,code=200)=>{
    return res.send({
        result: code==200,
        model: {
            numRows: 0,
            message: message,
            items:[]
        }
    })
}