/*
 * @Author: xuranXYS
 * @LastEditTime: 2023-07-30 23:21:15
 * @GitHub: www.github.com/xiaoxustudio
 * @WebSite: www.xiaoxustudio.top
 * @Description: By xuranXYS
 */
/*

Lexer：词法分析器
实现将一条语句分割成词语

*/
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
interface Lexer_node {
    type: TokenType,
    line: number,
    index: number,
    val: string
}

let digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

let id = [
    "local", "global",
    "if", "for", "while", "break",
    "class", "init",
    "print",
]

class Lexer {
    private hasMore?: boolean
    private LineNumber: number //行
    private Index: number //索引
    private word: string //当前单词
    private coursor: number //光标
    private nexPos: number //下一个未知
    private List: string
    private tokens: Array<Lexer_node>
    private LastLineIndex: number //上一行的索引
    constructor(arr: string) {
        this.LineNumber = 1
        this.Index = 1
        this.word = ""
        this.nexPos = 1
        this.coursor = 0
        this.List = arr
        this.tokens = []
        this.LastLineIndex = 0
    }
    /**
     * @description: 光标位置下移
     * @return {*}
     */
    updatePos() {
        this.Index++
        this.coursor = this.nexPos//光标移动
        this.nexPos++
    }
    /**
     * @description: 获取一个词
     * @return {string}
     */
    get() {
        let is_running = true
        let is_skip = false //跳过
        let skip_str = ""
        let is_quot = false
        while (is_running) {
            if (this.nexPos > this.List.length) {
                is_running = false
                this.tokens.push({
                    type: TokenType.end,
                    val: "END",
                    line: this.LineNumber+1,
                    index: this.Index - ("END").length
                })
                return this.tokens;
            } else if ([" ", "\t"].includes(this.List[this.coursor])) {
                //跳过
                this.updatePos()
                continue
            } else {
                let current_char = this.List[this.coursor]

                // 注释跳过
                if (is_skip) {
                    if (skip_str == "//") {
                        is_skip = false
                        skip_str = ""
                        this.updatePos()
                        continue
                    } else if (skip_str == "/*" && (current_char + this.List[this.nexPos]) != "*/") {
                        this.updatePos()
                        continue
                    } else {
                        is_skip = false
                        skip_str = ""
                        this.updatePos()
                        this.updatePos()
                        continue
                    }
                }

                // 字符串截取状态
                if (is_quot) {
                    if (this.isQuot(current_char)) {
                        this.tokens.push({
                            type: TokenType.string,
                            val: this.word,
                            line: this.LineNumber,
                            index: this.Index - (this.word + current_char).length
                        })
                        is_quot = false
                        this.word = ""
                        this.updatePos()
                        continue
                    } else {
                        this.word += current_char
                        this.updatePos()
                        continue
                    }
                }

                if (this.isQuot(current_char)) {
                    //字符串
                    is_quot = true
                    this.updatePos()
                    continue
                }
                else if (current_char in digits) {
                    this.word += current_char
                    let res = this.make_number()
                    if (res) {
                        res.index -= res.val.length
                        this.tokens.push(res)
                        this.word = ""
                    }
                    this.updatePos()
                    continue
                } else if (id.includes(this.word + current_char)) {
                    this.tokens.push({
                        type: TokenType.identifier,
                        val: this.word + current_char,
                        line: this.LineNumber,
                        index: this.Index - (this.word + current_char).length
                    })
                    this.word = ""
                    this.updatePos()
                    continue
                }
                else if (this.isOperator(current_char)) {
                    // 判断是否是注释
                    if (current_char + this.List[this.nexPos] == "//") {
                        is_skip = true
                        skip_str = "//"
                        this.word = ""
                        this.updatePos()
                        this.updatePos()
                        continue
                    } else if (current_char + this.List[this.nexPos] == "++") {
                        this.tokens.push({
                            type: TokenType.operator,
                            val: current_char + this.List[this.nexPos],
                            line: this.LineNumber,
                            index: this.Index - (current_char + this.List[this.nexPos]).length
                        })
                        this.word = ""
                        this.updatePos()
                        this.updatePos()
                        continue
                    } else if (current_char + this.List[this.nexPos] == "--") {
                        this.tokens.push({
                            type: TokenType.operator,
                            val: current_char + this.List[this.nexPos],
                            line: this.LineNumber,
                            index: this.Index - (current_char + this.List[this.nexPos]).length
                        })
                        this.word = ""
                        this.updatePos()
                        this.updatePos()
                        continue
                    } else if (current_char + this.List[this.nexPos] == "/*") {
                        is_skip = true
                        skip_str = "/*"
                        this.updatePos()
                        continue
                    } else {
                        if (this.word.length != 0) {
                            this.tokens.push({
                                type: TokenType.any,
                                val: this.word,
                                line: this.LineNumber,
                                index: this.Index - (this.word + current_char).length
                            })
                            this.tokens.push({
                                type: TokenType.operator,
                                val: current_char,
                                line: this.LineNumber,
                                index: this.Index - this.word.length
                            })
                            this.word = ""
                            this.updatePos()
                            continue
                        }
                        else {
                            this.word += current_char
                            this.tokens.push({
                                type: TokenType.operator,
                                val: this.word,
                                line: this.LineNumber,
                                index: this.Index - this.word.length
                            })
                            this.word = ""
                            this.updatePos()
                            continue
                        }
                    }

                } else if (this.isdelimiter(current_char)) {
                    //如果word里面有东西
                    if (this.word.length != 0) {
                        this.tokens.push({
                            type: TokenType.any,
                            val: this.word,
                            line: this.LineNumber,
                            index: this.Index - (this.word + current_char).length
                        })
                    }
                    this.tokens.push({
                        type: TokenType.delimiter,
                        val: current_char,
                        line: this.LineNumber,
                        index: this.Index - (current_char).length
                    })
                    this.word = ""
                    this.updatePos()
                    continue
                } else if (["\n", ";"].includes(current_char)) {
                    // 如果 word 有内容 且 不是控制字符则报错
                    if(!is_skip && this.word.length>0 && !/^[\u0000-\u001F\u007F-\u009F]+$/.test(this.word)){
                        throw new Error("Invalid token: This is not a Token : "+`${this.word} , index : ${this.Index} , Line : ${this.LineNumber}`);
                    }
                    // console.log(this.word)  // 注释内容
                    this.tokens.push({
                        type: TokenType.end,
                        val: "END",
                        line: this.LineNumber+1,
                        index: this.Index - ("END").length
                    })
                    // 又一行
                    this.word = ""
                    this.Index = 1
                    this.LineNumber++
                    this.updatePos()
                    is_skip = false
                    continue
                }

                this.word += current_char
                this.updatePos()
            }
        }
        return this.tokens
    }

    make_number() {
        let current_char = this.List[this.coursor]
        let nex_char = this.List[this.nexPos]
        let dot_num = 0 //小数点
        // 下个不是数组，返回结果
        if (!(nex_char in digits)) {
            if (dot_num == 0) {
                return {
                    type: TokenType.int,
                    val: this.word,
                    line: this.LineNumber,
                    index: this.Index - this.word.length
                }
            } else {
                return {
                    type: TokenType.float,
                    val: this.word,
                    line: this.LineNumber,
                    index: this.Index - this.word.length
                }
            }
        }
    }
    isOperator(str: string) {
        return /^[+\-*/=><]$/.test(str);
    }

    isdelimiter(str: string) {
        return /^[\(\){}]$/.test(str);
    }

    isQuot(str: string) {
        return /^["]$/.test(str);
    }
}

export { Lexer, Lexer_node }


