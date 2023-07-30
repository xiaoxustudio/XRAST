/*
 * @Author: xuranXYS
 * @LastEditTime: 2023-07-30 04:08:11
 * @GitHub: www.github.com/xiaoxustudio
 * @WebSite: www.xiaoxustudio.top
 * @Description: By xuranXYS
 */
import { readFile, readFileSync } from "fs";
import { Lexer,Lexer_node } from "./Lexer";
import { AST_XR } from "./ast";


let file_str=readFileSync("./main.xr",{encoding:"utf-8"})
let a=new Lexer(file_str)
let res=a.get()

let ast=new AST_XR(res)

console.log(ast.get(true))

