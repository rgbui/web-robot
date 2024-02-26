
import { Block } from "./block";
import { AgeExpress } from "./express";


export class Task {
    load(data: Record<string, any>) {

    }
    /**
     * 申明的全局变量
     */
    dic: Map<string, any> = new Map()
    /***
     * 临时的变量，用于调试，临时的替换
     */
    temporaryDic: Map<string, any> = new Map()
    getDic(key: string) {
        if (this.temporaryDic.has(key)) return this.temporaryDic.get(key)
        else return this.dic.get(key)
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
  async  blocked(flow: Block) {
        while (true) {
            if (this.blockIds.includes(flow.id)) {
                continue
            }
            
            break;
        }
    }
}



