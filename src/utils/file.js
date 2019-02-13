/**
 * 文件操作函数
 */
import fs from "fs";
class qwFile {
    /**
     * 构造函数
     */
    constructor(){
        this.fs = fs;
    }
    /**
     * 写入文件
     * @param {文件路径} filePath 
     * @param {需要写入的内容} data 
     */
    write(filePath, data) {
        return new Promise((resolve,reject) => {
            this.fs.writeFile(filePath, data, function (err) {
                if (err) {
                    reject(err);
                }else{
                    resolve()
                    console.log('file save successfully '); //文件被保存
                }                
            });
        })
       
    }
    /**
     * 读取文件
     * @param {文件路径} filePath 
     * @param {编码规则} encoding 
     */
    read(filePath, encoding){
        let length = arguments.length;
        if (length < 2) {
            encoding = 'utf-8'
        }
        return new Promise((resolve,reject)=>{
            fs.readFile(filePath, encoding, function (err, data) {
                if (err) {
                    return reject(err)
                }else{
                    return resolve(data)
                }
            });
        })
    }
    /**
     * 复制文件内容
     * @param {原路径} srcFile 
     * @param {目标路径} newFile 
     */
    copy(srcFile, newFile) {
        let readOption = {
            flags: 'r',
            encoding: null,
            mode: 0o666
        };
        let writeOption = {
            flags: 'a',
            encoding: null,
            mode: 0o666
        };
        return new Promise((resolve,reject)=>{
            let fileReadStream = this.fs.createReadStream(srcFile, readOption);
            let fileWriteStream = this.fs.createWriteStream(newFile, writeOption);
            /* 1:
                fileReadStream.on('data',function(data){
                    fileWriteStream.write(data);
        
                });
                fileReadStream.on('end',function(){
                    console.log('readStream end');
                    fileWriteStream.end();
                });
            */
            /**
             * 2:
             */
            fileReadStream.pipe(fileWriteStream);
            fileWriteStream.on('close', function () {
                resolve()
                fileReadStream.close();
                fileWriteStream.close();
                //copy over
            });
        })
       
    }
    /**
     * 
     * @param {文件是否存在} path 
     */
    isHas(path){
        return new Promise((resolve,reject)=>{
            fs.exists(path, function (has) {
                if(has){
                    resolve();
                }else{
                    reject();
                }
            })
        })
        
    }
    mkdir(dirname){
        return new Promise((resolve,reject)=>{
            fs.mkdir(dirname,777,(e)=>{
                if(e){
                    reject(e)
                }else{
                    resolve(e)
                }
            })
        })
    }
}

export default qwFile;