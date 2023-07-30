"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Literal = void 0;
const node_1 = require("./node");
class Literal extends node_1.AstNode {
    constructor(val) {
        super();
        this.ast = {
            type: "Literal",
            val: val
        };
    }
}
exports.Literal = Literal;
