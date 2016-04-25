var Buttons = React.createClass({
	getInitialState: function() {
		return {
			isSelected: false
		};
	},

	handleClick: function() {
		$.get('/info/'+this.props.name, function(data) {
			console.log("res: " + data);
			ReactDOM.render(<Card parkname={data}/>, document.getElementById('infoContainer'));
		});
	},

	render: function() {
		return (
		<div>
			<button type="button" onClick={this.handleClick} className={"btn btn-default"} name={this.props.id}>{this.props.display}</button>			
		</div>

		)
	}
});


var Card = React.createClass({
	getInitialState: function() {
		return {}
	},

	handleChange: function(e) {
		console.log("it happened!");
	},

	render: function() {
		return (
			<div class="card">
				<img className={"card-img-top"} id="card-header-image" src="/imgs/glacier_card.jpg" alt="header image" />
      			<div className={"card-block"}>
        			<h4 className={"card-title"} id="cardTitle">Facts</h4>
        			<ul className={"list-group list-group-flush"}>
						<li className={"list-group-item"}>
						<span className={"cardAttrs"} id="parkName">Name: {this.props.parkname}</span>
						</li>
					</ul>
        		</div>
      		</div>
    	)
  	}
});
 

ReactDOM.render(<Buttons name="smokyMountains" display="Great Smoky Mountains"/>,  document.getElementById('btn-one'));
ReactDOM.render(<Buttons name="grandCanyon" display="Grand Canyon"/>,  document.getElementById('btn-two'));
ReactDOM.render(<Buttons name="rockyMountain" display="Rocky Mountain"/>,  document.getElementById('btn-three'));
ReactDOM.render(<Buttons name="yosemite" display="Yosemite"/>,  document.getElementById('btn-four'));
ReactDOM.render(<Buttons name="yellowstone" display="Zion"/>,  document.getElementById('btn-five'));
ReactDOM.render(<Buttons name="zion" display="Zion"/>,  document.getElementById('btn-six'));
ReactDOM.render(<Buttons name="olympic" display="Olympic"/>,  document.getElementById('btn-seven'));
ReactDOM.render(<Buttons name="grandTeton" display="Grand Teton"/>,  document.getElementById('btn-eight'));
ReactDOM.render(<Buttons name="acadia" display="Acadia"/>,  document.getElementById('btn-nine'));
ReactDOM.render(<Buttons name="glacier" display="Glacier"/>,  document.getElementById('btn-ten'));
