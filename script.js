import MiniReact from './minireact.js';

export default class MyTodoApp extends MiniReact {
    mount() {
        this.setState({
            displayAdd: false,
            adding: false,
            items: [],
        });
        this.setBind({
            task: '',
            priority: 'low',
            urgent: false,
            category: 'work'
        });
    }
    showHideAddForm(e) {
        e.preventDefault();
        this.setState({
            displayAdd: !this.state.displayAdd
        });
        if(this.state.displayAdd) {
            this.setBind({
                task: '', priority: 'low', urgent: false, category: 'work'
            });
        }
    }
    async handleAdd(e) {
        e.preventDefault();
        this.setState({
            adding: true
        });
        let sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        await sleep(500);

        if(this.state.editing > -1) {
            let items = this.state.items;
            items[this.state.editing] = {
                task: this.binds.task,
                priority: this.binds.priority,
                urgent: this.binds.urgent,
                category: this.binds.category
            };
            this.setState({
                items,
                editing: -1,
                adding: false
            });
        } else {
            this.setState({
                items: [...this.state.items, {
                    task: this.binds.task,
                    priority: this.binds.priority,
                    urgent: this.binds.urgent,
                    category: this.binds.category
                }],
                adding: false,
                editing: -1
            });
        }

        this.setBind({
            task: '', priority: 'low', urgent: false, category: 'work'
        });
        // focus
        this.element.querySelector('input').focus();
    }
    handleDelete(index) {
        this.setState({
            items: this.state.items.filter((item, si) => si !== index)
        });
    }

    handleEdit(index) {
        let item = this.state.items[index];
        this.setBind({
            task: item.task,
            priority: item.priority,
            urgent: item.urgent,
            category: item.category
        });
        // this.handleDelete(index);
        this.setState({
            displayAdd: true,
            editing: index
        });
    }

    render({ displayAdd, items, adding }) {
        return `
        <h1>Simple Todo Application</h1>
        <button @click="{showHideAddForm}">add</button>
        <button @click="{this.setState({items: []})}">clear</button>
        <ul>
            ${items.map((item, i) => `<li>[${item.priority}] ${item.urgent?`<span style="color:red">[Urgent]</span>`:''} ${item.task} [${item.category}] &emsp; 
                    <button @click="{this.handleDelete(${i})}">delete</button>
                    <button @click="{this.handleEdit(${i})}">edit</button></li>`).join('')}
            ${items.length === 0 ? '<li>No items</li>' : ''}
        </ul>
        ${displayAdd ? `
            <form @submit="{handleAdd}">
                <input type="text" placeholder="Enter your todo" @bind={task}> <br>
                <input type="radio" name="priority" value="low" @bind={priority} checked>Low
                <input type="radio" name="priority" value="medium" @bind={priority}>Medium
                <input type="radio" name="priority" value="high" @bind={priority}>High
                <br>
                <input type="checkbox" @bind={urgent}>Urgent
                <br>
                <select @bind={category}>
                    <option value="work">Work</option>
                    <option value="personal">Personal</option>
                    <option value="others">Others</option>
                </select>
                <br>
                <br>
                <button>add</button>
                <button @click="{showHideAddForm}">cancel</button>
                ${adding ? '<span>Adding...</span>' : ''}
            </form>
        ` : ''}
        `;
    }
}