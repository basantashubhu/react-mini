# ReactMini

A mini version of react that handles reactive nature of form

```JS
import MiniReact from './minireact.js';

class Counter extends MiniReact {
    mount() {
        this.setState({count: 0});
    }

    increment() {
        this.setState({count: this.state.count + 1});
    }

    decrement() {
        this.setState({count: this.state.count - 1});
    }

    render({count}) {
        return `
            <div>
                <h1>Counter</h1>
                <p>Click count: ${count}</p>
                <button @click={increment}>Increment</button>
                <button @click={decrement}>Decrement</button>
            </div>
        `;
    }
}

const myCounterApp = new Counter(document.getElementById('root'));
```

Thank You!
