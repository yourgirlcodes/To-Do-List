class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.markDone = this.markDone.bind(this)
        this.markNotDone = this.markNotDone.bind(this)
        this.delete = this.delete.bind(this)
        this.focus = this.focus.bind(this)
        this.prioritize = this.prioritize.bind(this)
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

        var taskList_Array = this.state.taskList
        taskList_Array.push(this.nextTask.value);
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
            var index = this.state.completedTasks.findIndex(i => i == id)
            this.state.completedTasks.splice(index, 1);
            this.setState({
                completedTasks: this.state.completedTasks,
            })

        } else if (list === "toDo") {
            var index = this.state.taskList.findIndex(i => i == id)
            this.state.taskList.splice(index, 1);
            this.setState({
                taskList: this.state.taskList,
            })
        }
    }

    prioritize(priorityTask){
        var index = this.state.taskList.findIndex(i => i == priorityTask)
        var updatedTaskList = this.state.taskList
        updatedTaskList.unshift(this.state.taskList.splice(index, 1));
        this.setState({
            taskList: this.state.taskList
        })
}

    render() {
        return (
            <div className="application">
                <div>
                    <Header appName="Sh*t To Get Done" logo="crown" />
                    <form id="form" onSubmit={this.handleSubmit} > 
                        <textarea ref={x => this.nextTask = x} placeholder="add new sh*t" onChange={this.focus} />
                        <button className="btn-a" type="submit" value="+" disabled={this.state.isEmpty}>+</button>
                    </form>
                    <h3 className="color" id="do">TO DO:</h3>
                    <ToDoList taskList={this.state.taskList} handleMarked={this.markDone} remove={this.delete} favourite={this.prioritize}/>
                    <h3 className="color" id="done">DONE:</h3>
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
                <span className="color" id="header">{this.props.appName}
                    <img src={`./img/${this.props.logo}.png`} id="image"/>
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
        this.toFavourite = this.toFavourite.bind(this)

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

    toFavourite(e){
        var priorityTask = e.target.id
        this.props.favourite(priorityTask)
    }


    render() {
        
        return (
            <div>
                <ul>
                    {this.props.taskList.map((x, i) =>
                        <li className="toDo list color" key={x} id={x} value={i} onDoubleClick={this.moveToDone}>{x}<button id={x} className="trash" value="toDo" onClick={this.toRemove} /><button id={x} className="star" value="favourite" onClick={this.toFavourite}/></li>
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
                        <li className="completed list color" id={x} key={x} value={i} onDoubleClick={this.putBack_ToDo}>{x}<button id={x} className="trash" value="done" onClick={this.toRemove} /></li>
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