import { Component } from 'react'
class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }


  }
  componentWillMount(){
    if(this.props.getPage) this.props.getPage(true, 'about');
  }
  render() {
    return (
      <div className="about content">
          <h2>About Me</h2>
          <p>this is shop web</p>
      </div>
    );
  }

}


export default About;
