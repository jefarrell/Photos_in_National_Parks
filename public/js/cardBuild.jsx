

var Buttons = React.createClass({
	getInitialState: function () {
		return {
			isSelected: false
		};
	},

	handleClick: function () {
		this.setState({
			isSelected: true
		});
	},

	render: function () {
	    var isSelected = this.state.isSelected;
		
		if (isSelected) {
			$.get('/info/'+this.props.name, function (data) {
				ReactDOM.render(<Card url={data.url} parkname={data.name} date={data.established} />, document.getElementById('infoContainer'));
				ReactDOM.render(<Map parkLat={data.lat} parkLon={data.lon} parkZoom={10} />, document.getElementById('mapContainer'));			
			});
		}
		
		return (
		 <div>
			<button type="button"  onClick={this.handleClick} className={"btn btn-default"} name={this.props.id}>{this.props.display}</button>
		</div>
		)
	}
});



var Card = React.createClass({

	render: function () {
		$('#infoContainer').css('background-color','#C77F49');
/*		I shouldn't need this ^ but having issue
		var cardStyle = {
    		backgroundColor: '#C77F49'  
    	};
		style={cardStyle} */
		return (	
			<div className={"card"}>
				<img className={"card-img-top"} id="card-header-image" src={this.props.url} alt="card header image" />
					<div className={"card-block"}>
					<h4 className={"card-title"} id="cardTitle">At a Glance</h4>
					<ul className={"list-group list-group-flush"} style={this.props.style} id="listContainer">
						<li className={"list-group-item"}>
							<span className={"cardAttrs"} >Park Name: {this.props.parkname}</span>
						</li>
						<li className={"list-group-item"}>
							<span className={"cardAttrs"} >Established: {this.props.date}</span>
						</li>
					</ul>
				</div>
        	</div>			
    	)
  	}
});


var Map = React.createClass({displayName: "Map",
	
	getInitialState: function() {
		return {
			lat: this.props.parkLat,
			lon: this.props.parkLon,
			zoom: this.props.parkZoom
		};
	},

	componentWillReceiveProps: function(nextProps) {

		this.map.setView([nextProps.parkLat, nextProps.parkLon], nextProps.parkZoom);

	},

    createMap: function (element) {
    	var southWest = L.latLng(25.0855988971, -132.01171875);
	    var northEast = L.latLng(49.8096315636, -65.91796875);
        var bounds = L.latLngBounds(southWest, northEast);

        this.map = L.map(element, {
        	maxBounds: bounds,
        	minZoom: 4
        }).setView([this.state.lat, this.state.lon], this.state.zoom);
        L.tileLayer('https://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
        this.map.scrollWheelZoom.disable();
        return this.map;
    },

    componentDidMount: function () {	
    	if (this.mapDiv !== null) {
    		this.createMap(this.mapDiv);
    	};
    	this.state.zoom=10;
    },

    render: function () {

    	var divStyle = {
    		height: 480,
    		width: "auto"
    	};
    	return (
    		<div className={"map"} style={divStyle} ref={(ref) => this.mapDiv = ref}></div>
    	)
    }
});




//ReactDOM.render(<Map startLat={38.8945571} startLon={-97.3677515} startZoom={4} />, document.getElementById('mapContainer'));



ReactDOM.render(<Buttons name="smokyMountains" display="Great Smoky Mountains"/>,  document.getElementById('btn-one'));
ReactDOM.render(<Buttons name="grandCanyon" display="Grand Canyon"/>,  document.getElementById('btn-two'));
ReactDOM.render(<Buttons name="rockyMountain" display="Rocky Mountain"/>,  document.getElementById('btn-three'));
ReactDOM.render(<Buttons name="yosemite" display="Yosemite"/>,  document.getElementById('btn-four'));
ReactDOM.render(<Buttons name="yellowstone" display="Yellowstone"/>,  document.getElementById('btn-five'));
ReactDOM.render(<Buttons name="zion" display="Zion"/>,  document.getElementById('btn-six'));
ReactDOM.render(<Buttons name="olympic" display="Olympic"/>,  document.getElementById('btn-seven'));
ReactDOM.render(<Buttons name="grandTeton" display="Grand Teton"/>,  document.getElementById('btn-eight'));
ReactDOM.render(<Buttons name="acadia" display="Acadia"/>,  document.getElementById('btn-nine'));
ReactDOM.render(<Buttons name="glacier" display="Glacier"/>,  document.getElementById('btn-ten'));
