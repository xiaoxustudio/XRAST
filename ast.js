"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AST_XR = void 0;
/*
 * @Author: xuranXYS
 * @LastEditTime: 2023-07-30 23:27:16
 * @GitHub: www.github.com/xiaoxustudio
 * @WebSite: www.xiaoxustudio.top
 * @Description: By xuranXYS
 */
const Function_1 = require("./ast/Function");
const node_1 = require("./ast/node");
const variablesExpression_1 = require("./ast/variablesExpression");
var TokenType;
(function (TokenType) {
    TokenType[TokenType["any"] = 0] = "any";
    TokenType[TokenType["int"] = 1] = "int";
    TokenType[TokenType["identifier"] = 2] = "identifier";
    TokenType[TokenType["float"] = 3] = "float";
    TokenType[TokenType["operator"] = 4] = "operator";
    TokenType[TokenType["string"] = 5] = "string";
    TokenType[TokenType["delimiter"] = 6] = "delimiter";
    TokenType[TokenType["end"] = 7] = "end";
})(TokenType || (TokenType = {}));
class AST_XR extends node_1.AstNode {
    constructor(arr) {
        super();
        this.ast = {
            type: "root",
            body: []
        };
        let status = false;
        let stack_arr = [];
        let arr_arr = []; // 传参
        let index = 0;
        for (let i in arr) {
            let data = arr[i];
            if (status) {
                //处理
                if (stack_arr[stack_arr.length - 1] == "var" && Number(data["type"]) == TokenType.end) {
                    let node = new variablesExpression_1.Variable(arr_arr);
                    this.ast.body.push(node.get());
                    arr_arr = [];
                    stack_arr.pop();
                    status = false;
                    continue;
                }
                else if (stack_arr[stack_arr.length - 1] == "print" && Number(data["type"]) == TokenType.end) {
                    let node = new Function_1.FunctionE(stack_arr[stack_arr.length - 1], arr_arr);
                    this.ast.body.push(node.get());
                    arr_arr = [];
                    stack_arr.pop();
                    status = false;
                    continue;
                }
                else if (Number(data["type"]) != TokenType.identifier) {
                    arr_arr.push(data);
                    arr.slice(0, 1);
                    continue;
                }
            }
            if (Number(data["type"]) == TokenType.identifier) {
                if (data["val"] == "local") {
                    arr.slice(0, 1);
                    stack_arr.push("var");
                    status = true; // 需要处理
                }
                else if (data["val"] == "print") {
                    arr.slice(0, 1);
                    stack_arr.push("print");
                    status = true; // 需要处理
                }
            }
            index++;
        }
    }
}
exports.AST_XR = AST_XR;
