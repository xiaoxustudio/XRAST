"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Identifier = void 0;
/*
 * @Author: xuranXYS
 * @LastEditTime: 2023-07-30 14:48:24
 * @GitHub: www.github.com/xiaoxustudio
 * @WebSite: www.xiaoxustudio.top
 * @Description: By xuranXYS
 */
const node_1 = require("./node");
class Identifier extends node_1.AstNode {
    constructor(val) {
        super();
        this.ast = {
            type: "Identifier",
            val: val
        };
    }
}
exports.Identifier = Identifier;
