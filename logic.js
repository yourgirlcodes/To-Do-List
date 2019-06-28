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


    markDone(item_done) {

        // var index = this.state.taskList.indexOf(item_done)
        // var newCompletedTaskList = this.state.completedTasks
        // newCompletedTaskList.push(this.state.taskList.splice(index, 1));


        for (var i = 0; i < this.state.taskList.length; i++) {
            if (this.state.taskList[i] === item_done) {
                var newCompletedTaskList = this.state.completedTasks
                newCompletedTaskList.push(this.state.taskList.splice(i, 1));
                i--;
            }
        }

        this.setState({
            completedTasks: newCompletedTaskList
        })

    }


    markNotDone(item_notDone) {
        var index = this.state.completedTasks.findIndex(i => i == item_notDone)

        var newtaskList = this.state.taskList

        newtaskList.push(this.state.completedTasks.splice(index, 1));    

        // var index = this.state.completedTasks[item_notDone]

        // for (var i = 0; i < this.state.completedTasks.length; i++) {
        //     if (this.state.completedTasks[i] === item_notDone) {
        //         // var newtaskList = this.state.taskList
        //         newtaskList.push(this.state.completedTasks.splice(i, 1));
        //         i--;
        //     }
        // }

        this.setState({
            taskList: newtaskList
        })
    }

    render() {
        return (
            <div class="application">
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
        this.moveToDone = this.moveToDone.bind(this)
    }

    moveToDone(e) {
        var item_done = e.target.id
        this.props.handleMarked(item_done)
    }




    render() {
        debugger;
        return (
            <div>
                <ul>
                    {this.props.taskList.map((x) =>
                        <li className="list" id={x} key={x} onClick={this.moveToDone}>{x}</li>
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
    }

    putBack_ToDo(e) {
        debugger

        var item_notDone = e.target.id
        this.props.handleUnmarked(item_notDone)
    }

    render() {
        return (
            <div>
                <ul>
                    {this.props.completedTasks.map((x) =>
                        <li className="list" id={x} key={x} onClick={this.putBack_ToDo}>{x}</li>
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