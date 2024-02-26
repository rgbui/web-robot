

import { AgeExpress, CacExpress } from "./express";
import { Task } from "./task";

export class Block {
    id: string;
    task: Task;
    url: string;
    args: AgeExpress[];
    flow: Block[] = [];
    flow1: Block[] = [];
    async excute() {
        this.task.monitorWillExcute(this);
        try {

            this.args.forEach(arg => {
                if (!arg.isOutput)
                    CacExpress(this, arg)
            })
           await this.task.blocked(this);
            switch (this.url) {
                case '/age/common/print':
                    console.log(this.args[0].cacValue)
                    break;
                case '/age/common/wait':
                    await new Promise((resolve, reject) => {
                        setTimeout(() => {
                            resolve(true);
                        }, this.args[0].cacValue * 1000)
                    })
                    break;
                case '/age/browse/ele/click':
                    //模拟点击网页元素
                    //第一个参数是元素选择器 类似如 div>div
                    var selector = CacExpress(this, this.args[0])
                    var ele = document.body.querySelector(selector);
                    ele.click();
                    break;
                case '/age/browse/ele/input':
                    //模拟输入内容,判断是否回车
                    var selector = CacExpress(this, this.args[0])
                    var content = CacExpress(this, this.args[1])
                    var isEnter = CacExpress(this, this.args[2])
                    var ele = document.body.querySelector(selector);
                    ele.value = content;
                    if (isEnter) {
                        var event = new KeyboardEvent('keydown', {
                            key: 'Enter'
                        });
                        ele.dispatchEvent(event);
                    }
                    break;
                case '/age/common/net':
                    /**
                     * 发起网络请求，
                     * 返回值存到变量  this.task.dic.set(this.args[4].value, await result.text());
                     */
                    var url = CacExpress(this, this.args[0]);
                    var method = CacExpress(this, this.args[1]);
                    var data = CacExpress(this, this.args[2]);
                    var headers = CacExpress(this, this.args[3]);
                    var result = await fetch(url, {
                        method: method,
                        body: data,
                        headers: headers
                    })
                    this.task.dic.set(this.args[4].value, await result.text());
                    break;
                case '/age/common/script':
                    // n 个block
                    // script code== blocks[]
                    for (let action of this.flow) {
                        action.excute();
                    }
                    break;
            }
            //fun(args1,args)
            this.task.monitorBlockCompleted(this);
        }
        catch (ex) {
            this.task.log(ex.toString());
        }
    }
}


export class BlockWhile extends Block {
    async excute() {
        this.task.monitorWillExcute(this);
        while (true) {
            var r = CacExpress(this, this.args[0])
            if (r == true) {
                for (let act of this.flow) {
                    act.excute();
                }
            }
            else {
                break;
            }
        }
        this.task.monitorBlockCompleted(this);
    }
}

export class BlockIf extends Block {
    async excute() {
        this.task.monitorWillExcute(this);
        var r = CacExpress(this, this.args[0])
        if (r) {
            for (let act of this.flow) {
                act.excute();
            }
        }
        else {
            for (let act of this.flow1) {
                act.excute();
            }
        }
        this.task.monitorBlockCompleted(this);
    }
}

export class BlockVar extends Block {
    async excute() {

        var varName = CacExpress(this, this.args[0])
        var result = CacExpress(this, this.args[1])
        this.task.monitorWillExcute(this);
        this.task.dic.set(varName, result)
        this.task.monitorBlockCompleted(this);
    }
}