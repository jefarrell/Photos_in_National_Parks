// var Card = require('./Card');
var Map = require('./Map');


var Buttons = React.createClass({
	getInitialState: function () {
		return {
			isSelected: false
		};
	},

	handleClick: function (event) {
		this.setState({
			isSelected: !this.state.isSelected
		});
	},

	render: function () {
	    var isSelected = this.state.isSelected;
		
		if (isSelected) {
			$.get('/info/'+this.props.name, function (data) {
				//ReactDOM.render(<Card url={data.url} parkname={data.name} date={data.established} area={data.area} states={data.states} visitors={data.visitors} />, document.getElementById('infoContainer'));
				ReactDOM.render(<Map parkLat={data.lat} parkLon={data.lon} parkZoom={data.zoom} 
					parkName={data.name} parkAbv={data.abbrev} est={data.established} vis={data.visitors}
					area={data.area} states={data.states}/>, 
					document.getElementById('mapContainer'));
			});
		}
		
		return (
		 <div>
			<button type="button"  onClick={this.handleClick} className={"btn btn-default"} name={this.props.id}>{this.props.display}</button>
		</div>
		)
	}
});


module.exports = Buttons;