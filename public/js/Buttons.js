var Map = require('./Map');
var qwest = require('qwest');

var Buttons = React.createClass({
	getInitialState: function () {
		return {
			isSelected: false
		};
	},

	handleClick: function (event) {
		this.setState({
			isSelected: true
		});
	},

	render: function () {
	    
		// get data associated with button, then render the map & send props
		var isSelected = this.state.isSelected;
		if (isSelected) {
			qwest.get('/info/' + this.props.name, null, {responseType:'json'})
      			.then(function(xhr,res) {
       		 		ReactDOM.render(<Map parkLat={res.lat} parkLon={res.lon} parkZoom={res.zoom} 
					parkName={res.name} parkAbv={res.abbrev} est={res.established} vis={res.visitors}
					area={res.area} states={res.states}/>, 
					document.getElementById('mapContainer'));
      		}).catch(function(xhr, res, e) {
      			  console.log('qwest button catch: ', xhr, res, e);
     		 });  

		}
		
		this.state.isSelected = false;
		// make bootstrap buttons
		return (
		 <div>
			<button type="button"  onClick={this.handleClick} className={"btn btn-default"} name={this.props.id}>{this.props.display}</button>
		</div>
		)
	}
});


module.exports = Buttons;