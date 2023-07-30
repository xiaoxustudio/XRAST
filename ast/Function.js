"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionE = void 0;
/*
 * @Author: xuranXYS
 * @LastEditTime: 2023-07-30 23:28:16
 * @GitHub: www.github.com/xiaoxustudio
 * @WebSite: www.xiaoxustudio.top
 * @Description: By xuranXYS
 */
const node_1 = require("./node");
class FunctionE extends node_1.AstNode {
    constructor(fun_n, val) {
        super();
        this.ast = {
            type: "Function",
            name: fun_n,
            para: val
        };
        if (this.ast.para[0]["val"] != "(") {
            throw new Error("Invalid token: Missing open bracket : " + `( , index : ${this.ast.para[0]["Index"]} , Line : ${this.ast.para[0]["LineNumber"]}`);
        }
        else if (this.ast.para[this.ast.para.length - 1]["val"] != ")") {
            throw new Error("Invalid token: Missing closing bracket : " + `( , index : ${this.ast.para[this.ast.para.length - 1]["Index"]} , Line : ${this.ast.para[this.ast.para.length - 1]["LineNumber"]}`);
        }
        else {
            this.ast.para = this.ast.para.slice(1, this.ast.para.length - 1);
            console.log("ads");
        }
    }
}
exports.FunctionE = FunctionE;
