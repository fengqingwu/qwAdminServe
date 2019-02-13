
import server from "../../utils/server.js"
// import mysql from "mysql"
var mysql = require('mysql');
class qwMysql {
    constructor(){
        this.init();
    }
    init(){
        let serverObj =new server()
        let config = serverObj.getConfig();
        console.log(JSON.stringify(config));
        if(config && config.db){
            this.config = config.db;            
        }else{
            console.error("数据库配置不存在！",JSON.stringify(config));
        } 
    }
    buildPool(){
        this.pool = mysql.createPool(this.config);
    }
    query(sql){
        if(!this.pool){
            this.buildPool();
        }
        return new Promise((resolve,reject)=>{
            this.pool.getConnection((err,conn)=>{
                this.conn = conn;
                if(err){
                    reject({err:err,result:false,data:null})
                }else{
                    this.conn.query(sql,(qerr,vals,fields)=>{
                        //释放连接
                        this.close();
                        // conn.release();
                        resolve({err: qerr,vals:vals,fields:fields});
                    })
                }
            })
        })
        
    }
    close(){
        if(!this.pool){
            return;    
        } else {
            this.pool.releaseConnection(this.conn)
        }
    }
}

export default qwMysql;

/*
var mysql=require("mysql");
var pool = mysql.createPool({
    host: 'localhost',
    user: 'user',
    password: 'password',
    database: 'database',
    port: port
});

var query=function(sql,callback){
    pool.getConnection(function(err,conn){
        if(err){
            callback(err,null,null);
        }else{
            conn.query(sql,function(qerr,vals,fields){
                //释放连接
                conn.release();
                //事件驱动回调
                callback(qerr,vals,fields);
            });
        }
    });
};

module.exports=query;

var query=require("./lib/mysql.js");

query("select 1 from 1",function(err,vals,fields){
    //do something
});
*/