var date_utils = {
    months: ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"],
    days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
        18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
    years: [2018, 2019, 2020, 2021, 2022]
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.markDone = this.markDone.bind(this)
        this.markNotDone = this.markNotDone.bind(this)
        this.delete = this.delete.bind(this)
        this.focus = this.focus.bind(this)
        this.state = {
            taskList: [],
            completedTasks: [],
            isEmpty: " "
        };
    }

    focus() {
        this.setState({ isEmpty: false })
    }

    handleSubmit(e) {
        e.preventDefault();
        debugger
        var new_Task = {
            nextTask: this.nextTask.value,
            day: this.day.value,
            month: this.month.value,
            year: this.year.value
        };
        var taskList_Array = this.state.taskList
        taskList_Array.push(new_Task);
        this.setState({
            taskList: this.state.taskList,
            isEmpty: " "
        })
        this.nextTask.value = ""
    }

    markDone(item_done) {

        var index = this.state.taskList.findIndex(i => i == item_done)
        var newCompletedTaskList = this.state.completedTasks
        if (index >= 0) {
            newCompletedTaskList.push(this.state.taskList.splice(index, 1));
            this.setState({
                taskList: this.state.taskList,
                completedTasks: this.state.completedTasks,
            })
        }
    }

    markNotDone(item_notDone) {

        var index = this.state.completedTasks.findIndex(i => i == item_notDone)
        var newtaskList = this.state.taskList
        if (index >= 0) {
            newtaskList.push(this.state.completedTasks.splice(index, 1));
            this.setState({
                taskList: this.state.taskList,
                completedTasks: this.state.completedTasks
            })
        }
    }

    delete(id, list) {
        if (list === "done") {
            var x = this.state.completedTasks.findIndex(i => i == id)
            this.state.completedTasks.splice(x, 1);
            this.setState({
                completedTasks: this.state.completedTasks,
                taskList: this.state.taskList,
            })

        } else if (list === "toDo") {
            var x = this.state.taskList.findIndex(i => i == id)
            this.state.taskList.splice(x, 1);
            this.setState({
                taskList: this.state.taskList,
                taskList: this.state.taskList,
            })
        }
    }

    renderOptions(arr) {
        return arr.map(x => <option key={x} value={x}>{x}</option>);
    }

    render() {
        return (
            <div class="application">
                <div>
                    <Header appName="Sh*t To Get Done" logo="crown" />
                    <form id="form" onSubmit={this.handleSubmit} >
                        <textarea ref={x => this.nextTask = x} placeholder="add new sh*t" onChange={this.focus} />
                        <select ref={x => this.day = x}>
                            {this.renderOptions(date_utils.days)}
                        </select>
                        <select ref={x => this.month = x}>
                            {this.renderOptions(date_utils.months)}
                        </select>
                        <select ref={x => this.year = x}>
                            {this.renderOptions(date_utils.years)}
                        </select>
                        <button class="btn-a" type="submit" value="+" disabled={this.state.isEmpty}>+</button>
                    </form>
                    <h3 id="do">TO DO:</h3>
                    <ToDoList taskList={this.state.taskList} handleMarked={this.markDone} remove={this.delete} />
                    <h3 id="done">DONE:</h3>
                    <DoneList completedTasks={this.state.completedTasks} handleUnmarked={this.markNotDone} remove={this.delete} />
                </div>
            </div>
        )
    }

}

class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <span id="header">{this.props.appName}
                    <img src={`./img/${this.props.logo}.png`} id="image" />
                </span>
            </div>
        );
    }
}


class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.moveToDone = this.moveToDone.bind(this)
        this.toRemove = this.toRemove.bind(this)
    }

    moveToDone(e) {
        var item_done = e.target.id
        var item_done_val = e.target.value
        this.props.handleMarked(item_done, item_done_val)
    }

    toRemove(e) {
        var id = e.target.id
        var list = e.target.value
        this.props.remove(id, list)
    }

    render() {

        return (
            <div>
                <ul>
                    {this.props.taskList.map((x, i) =>
                        <li className="toDo list" key={x} id={x} value={i} onDoubleClick={this.moveToDone}>{x}<button id={x} class="trash" value="toDo" onClick={this.toRemove} /></li>
                    )}
                </ul>
            </div>
        )
    }
}


class DoneList extends React.Component {
    constructor(props) {
        super(props);
        this.putBack_ToDo = this.putBack_ToDo.bind(this)
        this.toRemove = this.toRemove.bind(this)
    }

    putBack_ToDo(e) {
        var item_notDone = e.target.id
        this.props.handleUnmarked(item_notDone)
    }

    toRemove(e) {
        var id = e.target.id
        var list = e.target.value
        this.props.remove(id, list)
    }

    render() {
        return (
            <div>
                <ul>
                    {this.props.completedTasks.map((x, i) =>
                        <li className="completed list" id={x} key={x} value={i} onDoubleClick={this.putBack_ToDo}>{x}<button id={x} class="trash" value="done" onClick={this.toRemove} /></li>
                    )}
                </ul>

            </div>
        )
    }
}


function render() {
    ReactDOM.render(
        <App />,
        document.getElementById('root'));
}

render();