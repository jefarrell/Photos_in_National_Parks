var Buttons = require('./Buttons');
var Map = require('./Map');

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


ReactDOM.render(<Map />, document.getElementById('mapContainer'));
