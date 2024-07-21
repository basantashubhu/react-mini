export default class ReactEvents
{
    registerEvents() {
        this.registerEventsWithNative();
        this.registerBinds();
    }

    getEvent(element) {
        let handles = [];
        const unwrap = str => str.substring(1, str.length - 1);
        if(element.hasAttribute('@click')) {
            let jsHandler = unwrap(element.getAttribute('@click'));
            if(jsHandler.includes('(') && jsHandler.includes(')')) {
                const handler = new Function('e', jsHandler);
                handles.push({
                    event: 'click',
                    handler: handler.bind(this)
                });
            } else {
                handles.push({
                    event: 'click',
                    handler: this[unwrap(element.getAttribute('@click'))]
                });
            }
        }
        if(element.hasAttribute('@change')) {
            handles.push({
                event: 'change',
                handler: this[unwrap(element.getAttribute('@change'))]
            });
        }
        if(element.hasAttribute('@submit')) {
            handles.push({
                event: 'submit',
                handler: this[unwrap(element.getAttribute('@submit'))]
            });
        }
        return handles;
    }

    registerEventsWithNative() {
        const unwrap = str => str.substring(1, str.length - 1);
        // handle events
        this.element.querySelectorAll('[\\@click],[\\@change],[\\@submit]').forEach((element) => {
            const events = this.getEvent(element);
            events.forEach(({event, handler}) => {
                // console.log(handler);
                handler && element.addEventListener(event, handler.bind(this));
            });
        });
        // handle bind
        this.element.querySelectorAll('[\\@bind]').forEach((element) => {
            const prop = unwrap(element.getAttribute('@bind'));
            element.addEventListener('input', (e) => {
                this.setBind({
                    [prop]: this.getBindAttributeValue(e.target)
                });
            });
        });
    }

    getBindAttributeValue(element) {
        if(element.type === 'checkbox') {
            return element.checked;
        }
        if(element.type === 'radio') {
            if(element.checked) {
                return element.value;
            }
            return '';
        }
        return element.value;
    }

    registerBinds() {
        // sync binds
        Object.keys(this.binds).forEach((key) => {
            const elements = this.element.querySelectorAll(`[\\@bind="{${key}}"]`);
            elements.forEach((element) => {
                if(element.type === 'radio') {
                    element.checked = this.binds[key] === element.value;
                    return;
                }
                if(element.type === 'checkbox') {
                    element.checked = this.binds[key];
                    return;
                }
                element.value = this.binds[key];
            });
        });
    }
}
