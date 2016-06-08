var Card = React.createClass({

	render: function () {
		// Small card with park information
		// Will sit on top of the map
  		return (
  			<div id="mapCard">
  				<h4> {this.props.name} </h4>
  				<hr />
  				<ul id="cardList">
  					<li className={"cardItem"}><span className={"cardAttrs"} >Established:  </span><span className={"cardVals"}>{this.props.est}</span></li>
  					<li className={"cardItem"}><span className={"cardAttrs"} >State(s):  </span><span className={"cardVals"}>{this.props.states}</span></li>
  					<li className={"cardItem"}><span className={"cardAttrs"} >2015 Visitors:  </span><span className={"cardVals"}>{this.props.vis} million</span></li>
  					<li className={"cardItem"}><span className={"cardAttrs"} >Area:  </span><span className={"cardVals"}>{this.props.area} sq mi</span></li>
  				</ul>
  			</div>
  		)
  	}
});

module.exports = Card;