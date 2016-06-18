var Card = React.createClass({
  
  getInitialState: function () {
    return {
      est: null,
      states: null,
      vis: null,
      area: null
    };
  },

  componentWillReceiveProps: function(newProps) {
    this.setState({
      est: newProps.est,
      states: newProps.states,
      vis: newProps.vis,
      area: newProps.area 
    });
  },

	render: function () {
		// Small card with park information
		// Will sit on top of the map
    // if (this.state.est = null) {
    //    console.log("empty");
    //    return ();
    //  } else {
      console.log(this.state.est);
  		return (
  			<div id="mapCard">
  				<h4> {this.props.name} </h4>
  				<hr />
  				<ul id="cardList">
  					<li className={"cardItem"}><span className={"cardAttrs"} >Established:  </span><span className={"cardVals"}>{this.state.est}</span></li>
  					<li className={"cardItem"}><span className={"cardAttrs"} >State(s):  </span><span className={"cardVals"}>{this.state.states}</span></li>
  					<li className={"cardItem"}><span className={"cardAttrs"} >2015 Visitors:  </span><span className={"cardVals"}>{this.state.vis} million</span></li>
  					<li className={"cardItem"}><span className={"cardAttrs"} >Area:  </span><span className={"cardVals"}>{this.state.area} sq mi</span></li>
  				</ul>
  			</div>
  		)
      //} ///
  	}
});

module.exports = Card;