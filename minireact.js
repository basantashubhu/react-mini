import ReactEvents from './reactevents.js';

export default class MiniReact extends ReactEvents
{
    constructor(element, children = []) {
        super();
        this.state = {};
        this.binds = {};
        this.element = element;
        this.children = children;
        this.mount();
        this.element.innerHTML = this.render(this.state);
        this.register();
    }

    register() {
        this.componentDidMount();
        this.registerEvents();
    }

    mount() {
        // Do nothing
    }

    componentDidMount() {
        this.didmount = true;
    }

    setState(newState) {
        this.state = {
            ...this.state,
            ...newState
        };
        if(this.didmount) {
            this.element.innerHTML = this.render(this.state);
            this.registerEvents();
        }
    }

    setBind(newBind) {
        this.binds = {
            ...this.binds,
            ...newBind
        };
        if(this.didmount) {
            this.registerBinds();
        }
    }

    render() {
        throw new Error('You must implement render method');
    }
}