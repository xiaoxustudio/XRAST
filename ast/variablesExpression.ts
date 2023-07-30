
/*
 * @Author: xuranXYS
 * @LastEditTime: 2023-07-30 14:54:52
 * @GitHub: www.github.com/xiaoxustudio
 * @WebSite: www.xiaoxustudio.top
 * @Description: By xuranXYS
 * 
 */

enum TokenType {
    any,
    int,
    identifier,
    float,
    operator,
    string,
    delimiter,
    end
}

import { Identifier } from "./Identifier";
import { Literal } from "./Literal";
import { AstNode, Tree } from "./node";
interface Variables_node extends Tree{
    id:any
    para?:Array<any>
    init:any
}
class Variable extends AstNode{
    ast:Variables_node
    constructor(arr?:any){
        super()
        this.ast={
            type:"VariablesExpression",
            id:new Literal(arr[0]["val"]).get(),
            init:arr[2]
        }
        //  解析表达式
        for(let i in arr[2]){
            let data=arr[2][i]
            if(i=="type" && data==TokenType.string){
                this.ast.init=new Literal(arr[2]["val"])
            }
        }
    }
}



export {Variable}