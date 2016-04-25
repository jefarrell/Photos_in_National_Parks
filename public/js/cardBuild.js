var Buttons = React.createClass({
	getInitialState: function() {
		return {
			isSelected: false
		};
	},

	handleClick: function(e) {
		var park = e.currentTarget.getAttribute('id');
		$.get('/info/'+park, function(data) {
			console.log("res: " + data);
		});
	},

	render: function() {

		return (
		<div>
			<div className={"btn-group btn-group-justified"} role="group">
				<div className={"btn-group"} role="group">
			    	<button type="button" onClick={this.handleClick} className={"btn btn-default"} id="smokyMountains">Great Smoky Mountains</button>
				</div>
				<div className={"btn-group"} role="group">
			    	<button type="button" onClick={this.handleClick} className={"btn btn-default"} id="grandCanyon">Grand Canyon</button>
				</div>
				<div className={"btn-group"} role="group">
			    	<button type="button" onClick={this.handleClick} className={"btn btn-default"} id="rockyMountain">Rocky Mountain</button>
				</div>
				<div className={"btn-group"} role="group">
			    	<button type="button" onClick={this.handleClick} className={"btn btn-default"} id="yosemite">Yosemite</button>
				</div>
				<div className={"btn-group"} role="group">
			    	<button type="button" onClick={this.handleClick} className={"btn btn-default"} id="yellowstone">Yellowstone</button>
				</div>
			</div>
			<div className={"btn-group btn-group-justified"} role="group">
				<div className={"btn-group"} role="group">
			    	<button type="button" onClick={this.handleClick} className={"btn btn-default"} id="zion">Zion</button>
				</div>
				<div className={"btn-group"} role="group">
			    	<button type="button" onClick={this.handleClick} className={"btn btn-default"} id="olympic">Olympic</button>
				</div>
				<div className={"btn-group"} role="group">
			    	<button type="button" onClick={this.handleClick} className={"btn btn-default"} id="grandTeton">Grand Teton</button>
				</div>
				<div className={"btn-group"} role="group">
			    	<button type="button" onClick={this.handleClick} className={"btn btn-default"} id="acadia">Acadia</button>
				</div>
				<div className={"btn-group"} role="group">
			    	<button type="button" onClick={this.handleClick} className={"btn btn-default"} id="glacier">Glacier</button>
				</div>
			</div>
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
						<span className={"cardAttrs"} id="parkName">Name:</span>
						</li>
					</ul>
        		</div>
      		</div>
    	)
  	}
});
 
ReactDOM.render(<Card />, document.getElementById('infoContainer'));
ReactDOM.render(<Buttons />, document.getElementById('buttonContainer'));