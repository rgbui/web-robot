
import { Block } from "./block";
import { AgeExpress } from "./express";


export class Task {
    load(file: Record<string, any>) {

    }
    /**
     * 申明的全局变量
     */
    dic: Record<string, any> = {}
    /***
     * 临时的变量，用于调试，临时的替换
     */
    temporaryDic: Record<string, any> = {};
    getDic(key: string) {
        if (this.temporaryDic[key]) return this.temporaryDic[key]
        else return this.dic[key];
    }
    args: AgeExpress[];
    blocks: Block[] = [];
    run() {
        for (let block of this.blocks) {
            block.excute();
        }
    }
    monitorWillExcute(block: Block) {
        // w
    }
    monitorBlockCompleted(block: Block) {

    }
    log(error: string) {

    }
    blockIds: string[] = [];
    blocked(flow: Block) {
        while (true) {
            if (this.blockIds.includes(flow.id)) {
                continue
            }
            break;
        }
    }
}



