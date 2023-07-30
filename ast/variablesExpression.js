"use strict";
/*
 * @Author: xuranXYS
 * @LastEditTime: 2023-07-30 14:54:52
 * @GitHub: www.github.com/xiaoxustudio
 * @WebSite: www.xiaoxustudio.top
 * @Description: By xuranXYS
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Variable = void 0;
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
const Literal_1 = require("./Literal");
const node_1 = require("./node");
class Variable extends node_1.AstNode {
    constructor(arr) {
        super();
        this.ast = {
            type: "VariablesExpression",
            id: new Literal_1.Literal(arr[0]["val"]).get(),
            init: arr[2]
        };
        //  解析表达式
        for (let i in arr[2]) {
            let data = arr[2][i];
            if (i == "type" && data == TokenType.string) {
                this.ast.init = new Literal_1.Literal(arr[2]["val"]);
            }
        }
    }
}
exports.Variable = Variable;
