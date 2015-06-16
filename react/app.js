
class VoteItem extends React.Component {
    increment(e) {
        e.preventDefault();
        let model = this.props.item;
        model.count = model.count + 1;
        this.props.onUpdate();
    }

    decrement(e) {
        e.preventDefault();
        let model = this.props.item;
        if (model.count > 0) {
            model.count = model.count - 1;
            this.props.onUpdate();
        }
    }

    render() {
        let model = this.props.item;
        return (<li>{model.description}
            <div>
                <button className="btn btn-success" onClick={this.increment.bind(this)}>+1</button>&nbsp;
                <button className="btn btn-danger" onClick={this.decrement.bind(this)}>-1</button>&nbsp;
                <span>{model.count}</span>
            </div>
        </li>);
    }
}

class VoteList extends React.Component {
    render() {
        let items = (vote, idx) => {
            return (<VoteItem key={idx} item={vote} onUpdate={this.props.onUpdate} />);
        };
        return (<ul id="itens">{this.props.votes.map(items)}</ul>);
    }
}

class App extends React.Component {
    constructor() {
        super();
        this.state = { data: data };
    }

    updateItem() {
        this.state.data.sort((voteA, voteB) => {
            if (voteA.count > voteB.count) return -1;
            if (voteA.count < voteB.count) return 1;
            return 0;
        });
        this.setState({ data: this.state.data });
    }

    render() {
        return (<VoteList votes={this.state.data} onUpdate={this.updateItem.bind(this)} />);
    }
}

React.render(<App/>, document.getElementById('app'));
