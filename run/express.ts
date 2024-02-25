import { Block } from "./block";

/**
 * 表达式
 * 特指 常量、变量、运算表达式、函数计算
 * 
 * 
 */
export class AgeExpress {
    text: string;
    name: string;
    id: string;
    /**
     * 计算表达式
     */
    express: AgeExpress;
    /**
     * 经过运行计算得到的值
     */
    cacValue: any;
    /***
     * 表达式的值
     */
    value: any;
    args: AgeExpress[]
    /**
     * 是否是返回的变量
     */
    isOutput: boolean
}




export function CacExpress(block: Block, arg: AgeExpress) {
    if (typeof arg.express == 'undefined' && typeof arg.value !== 'undefined') {
        arg.cacValue = arg.value;
        return arg.cacValue;
    }
    switch (arg.name) {
        case 'const':
            //这是一个常量表达式
            arg.cacValue = arg.value;
            return arg.cacValue;
        case 'var':
            //这是一个全局变量表达式
            arg.cacValue = block.task.getDic(arg.value);
            return arg.cacValue;
        case '+':
            arg.cacValue = undefined;
            arg.args.forEach(ag => {
                CacExpress(block, ag);
                if (typeof arg.cacValue == 'undefined') arg.cacValue = ag.cacValue;
                else arg.cacValue += ag.cacValue;
            })
            return arg.cacValue;
        case '>':
            CacExpress(block, arg.args[0]);
            CacExpress(block, arg.args[1]);
            arg.cacValue = arg.args[0].cacValue > arg.args[1].cacValue;
            return arg.cacValue;
        case 'string.length':
            CacExpress(block, arg.args[0]);
            arg.cacValue = arg.args[0].cacValue.length;
            return arg.cacValue;
        case 'object.get':
            CacExpress(block, arg.args[0]);
            CacExpress(block, arg.args[1]);
            arg.cacValue = lodash.get(arg.args[0].cacValue, arg.args[1].cacValue);
            return arg.cacValue;
    }
}
