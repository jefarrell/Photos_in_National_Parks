var Card = React.createClass({
  // getID: function() {
  //   return ReactDOM.findDOMNode(this).querySelectorAll('#map')[0];
  // },

  // init: function(id) {

  // },

	render: function () {
		// var info = document.getElementById('infoContainer');
		// info.style.backgroundColor = '#C77F49';
/*		I shouldn't need this ^ but having issue
		var cardStyle = {
    		backgroundColor: '#C77F49'  
    	};
		style={cardStyle} */
		// return (	
		// 	<div className={"card"}>
		// 		<img className={"card-img-top"} id="card-header-image" src={this.props.url} alt="card header image" />
		// 			<div className={"card-block"}>
		// 			<h4 className={"card-title"} id="cardTitle">At a Glance</h4>
		// 			<ul className={"list-group list-group-flush"} style={this.props.style} id="listContainer">
		// 				<li className={"list-group-item"}>
		// 					<span className={"cardAttrs"} >Park Name:  </span><span className={"cardVals"}>{this.props.parkname}</span>
		// 				</li>
		// 				<li className={"list-group-item"}>
		// 					<span className={"cardAttrs"} >Established:  </span><span className={"cardVals"}>{this.props.date}</span>
		// 				</li>
		// 				<li className={"list-group-item"}>
		// 					<span className={"cardAttrs"} >State(s):  </span><span className={"cardVals"}>{this.props.states}</span>
		// 				</li>
		// 				<li className={"list-group-item"}>
		// 					<span className={"cardAttrs"} >2015 Visitors (millions):  </span><span className={"cardVals"}>{this.props.visitors}</span>
		// 				</li>
		// 				<li className={"list-group-item"}>
		// 					<span className={"cardAttrs"} >Area (sq. miles):  </span><span className={"cardVals"}>{this.props.area}</span>
		// 				</li>

		// 			</ul>
		// 		</div>
  //       	</div>			
  //   	)
  		return (
  			<div id="mapCard">
  				<h4> {this.props.name} </h4>
  				<hr />
  				<span className={"cardAttrs"} >Established:  </span><span className={"cardVals"}>{this.props.est}</span>
  			</div>
  		)
  	}
});

module.exports = Card;