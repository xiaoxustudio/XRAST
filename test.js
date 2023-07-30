"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: xuranXYS
 * @LastEditTime: 2023-07-30 04:08:11
 * @GitHub: www.github.com/xiaoxustudio
 * @WebSite: www.xiaoxustudio.top
 * @Description: By xuranXYS
 */
const fs_1 = require("fs");
const Lexer_1 = require("./Lexer");
const ast_1 = require("./ast");
let file_str = (0, fs_1.readFileSync)("./main.xr", { encoding: "utf-8" });
let a = new Lexer_1.Lexer(file_str);
let res = a.get();
let ast = new ast_1.AST_XR(res);
console.log(ast.get(true));
