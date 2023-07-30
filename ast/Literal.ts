import { AstNode, Tree } from "./node";
interface Literal_node extends Tree{
    val:any
}
class Literal extends AstNode{
    ast: Literal_node
    constructor(val:any){
        super()
        this.ast={
            type:"Literal",
            val:val
        }
    }
}

export {Literal}