/*
 * @Author: xuranXYS
 * @LastEditTime: 2023-07-30 23:27:16
 * @GitHub: www.github.com/xiaoxustudio
 * @WebSite: www.xiaoxustudio.top
 * @Description: By xuranXYS
 */
import { FunctionE } from "./ast/Function";
import { AstNode, Tree } from "./ast/node"
import { Variable } from "./ast/variablesExpression";

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

interface AST_XR_Node extends Tree {
    body: Array<any>
}
class AST_XR extends AstNode {
    ast: AST_XR_Node;
    constructor(arr: Array<any>) {
        super()
        this.ast = {
            type: "root",
            body: []
        }


        let status = false
        let stack_arr = []

        let arr_arr = [] // 传参
        let index = 0
        for (let i in arr) {
            let data = arr[i]
            
            if (status) {
                //处理
                 if (stack_arr[stack_arr.length - 1] == "var" && Number(data["type"]) == TokenType.end) {
                    let node: Variable = new Variable(arr_arr)
                    this.ast.body.push(node.get())
                    arr_arr = []
                    stack_arr.pop()
                    status = false
                    continue
                }else if (stack_arr[stack_arr.length - 1] == "print" && Number(data["type"]) == TokenType.end) {
                    let node: FunctionE = new FunctionE(stack_arr[stack_arr.length - 1],arr_arr)
                    this.ast.body.push(node.get())
                    arr_arr = []
                    stack_arr.pop()
                    status = false
                    continue
                }else if (Number(data["type"]) != TokenType.identifier) {
                    arr_arr.push(data)
                    arr.slice(0, 1)
                    continue
                }

            }
            if (Number(data["type"]) == TokenType.identifier) {
                if (data["val"] == "local") {
                    arr.slice(0, 1)
                    stack_arr.push("var")
                    status = true // 需要处理
                }else if (data["val"] == "print") {
                    arr.slice(0, 1)
                    stack_arr.push("print")
                    status = true // 需要处理
                }
            }
            index++
        }
    }
}

export { AST_XR }