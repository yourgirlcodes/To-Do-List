class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.markDone = this.markDone.bind(this)
        this.markNotDone = this.markNotDone.bind(this)
        this.state = {
            taskList: [],
            completedTasks: []
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        var taskList_Array = this.state.taskList
        taskList_Array.push(this.nextTask.value);
        this.setState({
            taskList: taskList_Array,
        })
        this.nextTask.value = ""
    }

    markDone(task) {
        console.log(task)
        debugger
        var index = this.state.taskList.indexOf(task)
        var moveDone = this.state.taskList.splice(index, 1)
        debugger
        console.log(moveDone)
        var completedTasks_array = this.state.completedTasks
        completedTasks_array.push(moveDone)
        this.setState({
            completedTasks: completedTasks_array
        })
        console.log("completedTasks_array:" + this.state.completedTasks_array)
    }

    markNotDone(task_addBack) {

        var index = this.state.completedTasks.indexOf(task_addBack)
        var moveUndone = this.state.completedTasks.splice(index, 1)
        var taskList_updated = this.state.taskList
        taskList_updated.push(moveUndone)
        this.setState({
            taskList: taskList_updated
        })
        console.log("added this back to done:" + this.state.taskList_updated)
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} >
                    <input ref={x => this.nextTask = x} placeholder="THINGS TO DO" />
                    <input type="submit" value="+" />
                </form>
                <div><h2>TO DO:</h2></div>
                <ToDoList taskList={this.state.taskList} handleMarked={this.markDone} />
                <div><h2>DONE:</h2></div>
                <DoneList completedTasks={this.state.completedTasks} handleUnmarked={this.markNotDone} />

            </div>
        )
    }

}


class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.marked = this.marked.bind(this)
    }

    marked(e){
        this.props.handleMarked(e.target.id)
    }


    render() {
        return (
            <div>
                <ul>
                    {this.props.taskList.map((x, i) =>
                        <li className="list" id={i} key={x} onClick={this.marked}>{x}</li>
                    )}
                </ul>
            </div>
        )
    }
}

class DoneList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ul>
                    {this.props.completedTasks.map((y, i) =>
                        <li className="list" id={i} key={y} onClick={this.props.handleUnmarked}>{y}</li>
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