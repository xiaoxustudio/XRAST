/*
 * @Author: xuranXYS
 * @LastEditTime: 2023-07-30 23:28:16
 * @GitHub: www.github.com/xiaoxustudio
 * @WebSite: www.xiaoxustudio.top
 * @Description: By xuranXYS
 */
import { AstNode, Tree } from "./node";
interface Function_node extends Tree{
    name:string,
    para:Array<any>
}
class FunctionE extends AstNode{
    ast: Function_node
    constructor(fun_n:string,val?:any){
        super()
        this.ast={
            type:"Function",
            name:fun_n,
            para:val
        }
        if(this.ast.para[0]["val"]!="("){
            throw new Error("Invalid token: Missing open bracket : "+`( , index : ${this.ast.para[0]["Index"]} , Line : ${this.ast.para[0]["LineNumber"]}`);
        }else if(this.ast.para[this.ast.para.length-1]["val"]!=")"){
            throw new Error("Invalid token: Missing closing bracket : "+`( , index : ${this.ast.para[this.ast.para.length-1]["Index"]} , Line : ${this.ast.para[this.ast.para.length-1]["LineNumber"]}`);
        }else{
            this.ast.para=this.ast.para.slice(1,this.ast.para.length-1)
            console.log("ads")
        }
    }
}

export {FunctionE}