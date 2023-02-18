export default class EventEmitter{
    constructor(){
        this.events = [];
    }

    on(name, listener){
        if (!this.events[name]){
            this.events[name] = [];
        }

        this.events[name].push(listener);
    }

    checkListener(){
        if (!this.events[name]){
            throw new Error("Listener doesn't exists");
        }
    }

    removeListener(name, listener){
        this.checkListener()
        const filterListeners = (listener2) => listener2 !== listner;
        this.events[name] = this.events[name].filter(filterListeners);
    }

    emit(name, data){
        this.checkListener();

        const fireCallBack = (callback) => {
            callback(data);
        }

        this.events[name].forEach(fireCallBack);
    }
}