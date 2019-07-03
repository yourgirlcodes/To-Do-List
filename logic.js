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

    //Focus adjustment for the textbox
    focus() {
        this.setState({ isEmpty: false })
    }

    //User enters a task, button is disabled unless user enters input. 
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

    //To-Do item is marked done and task is sent down to the 'completed' list
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

    //Completed item is moved back up to To-Do list when user wants to re-classify the task
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

    //User finishes/cancels a planned task, task is deleted
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

    //User favourites a task, task is sent to the top of the To-Do List
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
                        <button className="btn-a" type="submit" value="+" disabled={this.state.isEmpty}>ADD</button>
                    </form>
                    <h3 className="color" id="do">TO DO:</h3>
                    <ToDoList name="toDo list color" value="toDo" task={this.state.taskList} handleMarked={this.markDone} remove={this.delete} favourite={this.prioritize}/>
                    <h3 className="color" id="done">DONE:</h3>
                    <ToDoList name="completed list color" value="done" task={this.state.completedTasks} handleMarked={this.markNotDone} remove={this.delete} />
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
        this.move = this.move.bind(this)
        this.toRemove = this.toRemove.bind(this)
        this.toFavourite = this.toFavourite.bind(this)

    }

    //item to be re-classified 
    move(e) {
        var item = e.target.id
        var item_val = e.target.value
        this.props.handleMarked(item, item_val)
    }

    //item to be cancelled/removed
    toRemove(e) {
        var id = e.target.id
        var list = e.target.value
        this.props.remove(id, list)
    }

    //item to be favourited
    toFavourite(e){
        var priorityTask = e.target.id
        this.props.favourite(priorityTask)
    }


    render() {
        
        return (
            <div>
                <ul>
                    {this.props.task.map((x, i) =>
                        <li className={this.props.name} key={x} id={x} value={i} onDoubleClick={this.move}>{x}<button id={x} className="trash" value={this.props.value} onClick={this.toRemove} /><button id={x} className="star" value="favourite" onClick={this.toFavourite}/></li>
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