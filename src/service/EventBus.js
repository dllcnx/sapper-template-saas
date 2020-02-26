/**
 * 事件总线
 *
 * 使用方法:
 *  1. 引入组件类
 *         import EventBus from '../service/EventBus'
 *  2. 事件输出与订阅
 *         输出：EventBus.emit('ww.myevent','nihao1')
 *
 *         订阅：EventBus.addEventListener('ww.myevent', (data) => {
 *              name = data;
 *	       })
 *
 */
export class BEvent {
    constructor (type, target, data) {
        this.type = type
        this.target = target
        this.data = data
    }
}

export class EventDispatcer {
    constructor () {
        // if (window && window.EventBus) {
        //     throw new Error('这是一个单例！')
        // }
        this.eventMap = new Map()
    }

    emit (evt,data) {
        const event = new Event(evt);

        let evtSet = this.eventMap.get(event.type)
        if (evtSet) {
            for (let item of evtSet.values()) {
                item(data)
            }
        }
    }
    addEventListener (eventType, func) {
        let evtSet = this.eventMap.get(eventType)
        if (!evtSet) {
            evtSet = new Set()
            this.eventMap.set(eventType, evtSet)
        }
        evtSet.add(func)
    }
    removeEventListener (eventType, func) {
        let evtSet = this.eventMap.get(eventType)
        if (evtSet) {
            evtSet.delete(func)
        }
    }
}
export default new EventDispatcer()
