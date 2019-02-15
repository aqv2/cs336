

var PeopleBox = React.createClass({
  loadPeopleFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handlePersonAdd: function(person) {
    var people = this.state.data;
    // Optimistically set an id on the new comment. It will be replaced by an
    // id generated by the server. In a production application you would likely
    // not use Date.now() for this and would have a more robust system in place.
    person.id = Date.now();
    var newPeople = people.concat([person]);
    this.setState({data: newPeople});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: person,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: people});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadPeopleFromServer();
    setInterval(this.loadPeopleFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="PeopleBox">
        <h1>People</h1>
        <PeopleList data={this.state.data} />
        <PersonForm onPersonAdd={this.handlePersonAdd} />
      </div>
    );
  }
});

var PeopleList = React.createClass({
  render: function() {
    var peopleNodes = this.props.data.map(function(person) {
      return (
        <Person firstName={person.firstName} lastName = {person.lastName}>
        </Person>
      );
    });
    return (
      <div className="commentList">
        {peopleNodes}
      </div>
    );
  }
});

// tutorial19.js
var PersonForm = React.createClass({
  getInitialState: function() {
    return {firstName: '', lastName: ''};
  },
  handleFirstNameChange: function(e) {
    this.setState({firstName: e.target.value});
  },
  handleLastNameChange: function(e) {
    this.setState({lastName: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var firstName = this.state.firstName.trim();
    var text = this.state.lastName.trim();
    if (!lastName || !firstName) {
      return;
    }
    this.props.onPersonAdd({firstName: firstName, lastName: lastName});
    this.setState({firstName: '', lastName: ''});
  },
  render: function() {
    return (
      <form className="personForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={this.state.firstName}
          onChange={this.handleFirstNameChange}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={this.state.lastName}
          onChange={this.handleLastNameChange}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

// tutorial7.js
var Person = React.createClass({
  rawMarkup: function() {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
},

  render: function() {
    return (
        <div className="person">
          <h2 className="personName">
            {this.props.firstName + " " + this.props.lastName}
          </h2>
          <span dangerouslySetInnerHTML={this.rawMarkup()} />
        </div>
      );
    }
});

ReactDOM.render(
<PeopleBox url="/people" pollInterval={2000} />,
document.getElementById('content')
);