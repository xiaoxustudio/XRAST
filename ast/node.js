"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AstNode = void 0;
class AstNode {
    constructor() {
        this.ast = {
            type: "root"
        };
    }
    eval() {
        return 0;
    }
    /**
     * @description: 输出ast列表
     * @param {*} b 格式化
     * @return {*}
     */
    get(b = false) {
        if (b) {
            return JSON.stringify(this.ast, null, 2);
        }
        else {
            return this.ast;
        }
    }
}
exports.AstNode = AstNode;
