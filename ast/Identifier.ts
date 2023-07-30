/*
 * @Author: xuranXYS
 * @LastEditTime: 2023-07-30 14:48:24
 * @GitHub: www.github.com/xiaoxustudio
 * @WebSite: www.xiaoxustudio.top
 * @Description: By xuranXYS
 */
import { AstNode, Tree } from "./node";
interface Identifier_node extends Tree{
    val:any
}
class Identifier extends AstNode{
    ast: Identifier_node
    constructor(val?:any){
        super()
        this.ast={
            type:"Identifier",
            val:val
        }
    }
}

export {Identifier}