import {Md5} from 'ts-md5/dist/md5'

export function pwdEncrypt(pwd:string){
    let md5 = new Md5()
    // let timestamp: string = Date.parse(new Date().toString()).toString();
    md5.appendStr(pwd).appendAsciiStr("werido")
    return md5.end()
}