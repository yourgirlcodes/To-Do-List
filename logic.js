class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.markDone = this.markDone.bind(this)
        this.markNotDone = this.markNotDone.bind(this)
        this.delete = this.delete.bind(this)
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
            taskList: this.state.taskList
        })
        this.nextTask.value = ""
    }


    markDone(item_done) {

        // var index = this.state.taskList.indexOf(item_done)
        // var newCompletedTaskList = this.state.completedTasks
        // newCompletedTaskList.push(this.state.taskList.splice(index, 1));

        var index = this.state.taskList.findIndex(i => i == item_done)
        var newCompletedTaskList = this.state.completedTasks
        if(index >= 0){
        newCompletedTaskList.push(this.state.taskList.splice(index, 1));
        this.setState({
            taskList: this.state.taskList,
            completedTasks: this.state.completedTasks
        })
    }
}

        // for (var i = 0; i < this.state.taskList.length; i++) {
        //     if (this.state.taskList[i] === item_done && i == item_done_val) {
        //         var newCompletedTaskList = this.state.completedTasks
        //         newCompletedTaskList.push(this.state.taskList.splice(i, 1));
        //         i--;
        //     }
        // }

        // this.setState({
        //     taskList: this.state.taskList,
        //     completedTasks: this.state.completedTasks
        // })



    markNotDone(item_notDone) {

        var index = this.state.completedTasks.findIndex(i => i == item_notDone)
        var newtaskList = this.state.taskList
        if(index >= 0){
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

    // var index = this.state.completedTasks[item_notDone]

    // for (var i = 0; i < this.state.completedTasks.length; i++) {
    //     if (this.state.completedTasks[i] === item_notDone) {
    //         // var newtaskList = this.state.taskList
    //         newtaskList.push(this.state.completedTasks.splice(i, 1));
    //         i--;
    //     }
    // }

    render() {
        return (
            <div class="application">
                <div>
                    <form onSubmit={this.handleSubmit} >
                        <input ref={x => this.nextTask = x} placeholder="THINGS TO DO" />
                        <input type="submit" value="+" />
                    </form>
                    <div><h2>TO DO:</h2></div>
                    <ToDoList taskList={this.state.taskList} handleMarked={this.markDone} remove={this.delete} />
                    <div><h2>DONE:</h2></div>
                    <DoneList completedTasks={this.state.completedTasks} handleUnmarked={this.markNotDone} remove={this.delete} />
                </div>
            </div>
        )
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
        // var item_notdone_val = e.target.value

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