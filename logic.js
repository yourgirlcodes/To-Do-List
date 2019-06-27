class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.markDone = this.markDone.bind(this)
        this.state = {
            taskList: [],
            completedTasks: []
        };
    }

    //on submit new task is added to previously entered tasks
    handleSubmit(e) {
        e.preventDefault();
        var taskList_Array = this.state.taskList
        taskList_Array.push(this.nextTask.value);
        this.setState({
            taskList: taskList_Array,
        })
        this.nextTask.value = ""
        console.log("taskList_array: " + this.state.taskList)
    }

    markDone(clickedIndex) {
        completedTasks_array = taskList.splice(clickedIndex, 1);
        this.setState({
            completedTasks: completedTasks_array
        })
        console.log("completedTasks_array:" + completedTasks_array)
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
                <DoneList completedTasks={this.state.completedTasks} />

            </div>
        )
    }

}


class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        // this.handleClick.bind(this)
    }


    // handleClick(e) {
    //     this.handleMarked(e.target)
    // }

    render() {
        return (
            <div>
                <ul>
                    {this.props.taskList.map((x, i) =>
                        <li className="list" id="i" key={x} onClick={this.props.handleMarked}>{x}</li>
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
                    {this.props.completedTasks.map((x) =>
                        <li key={x} >{x}</li>
                        // onClick={this.markDone.bind(this, i)} - was gonna put this in the line above
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