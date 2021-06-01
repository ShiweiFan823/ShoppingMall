import { Component } from 'react'
import { Button} from 'react-bootstrap';
import {request,setCookie} from '../../lib/fun'
import {Link} from "react-router-dom"
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      pwd: ''
    }


  }
  onChange(e, key){
    this.setState({
      [key]: e.target.value
    })
  }
  submitForm(e){
    e.preventDefault();
    if(!this.state.email){
      alert('email not null');
      return;
    }
    if(!this.state.pwd){
      alert('password not null');
      return;
    }

    request('/user/login','post', this.state,(res)=>{
      //success
      alert('login success');
      setCookie('user', JSON.stringify(res))
      // this.$ro
      // this.props.history.push({ pathemail: '/login'})
      window.location.href="/"
    },()=>{
      //fail
      alert('login fail, email or password error')
    })
  }
  componentWillMount(){
    if(this.props.getPage) this.props.getPage(false, 'login');
  }
  
  render() {
    return (
      <div className="login">
          <h2>Login</h2>
          <form>
            <div>
              {/* <label >email:</label> */}
              <input placeholder="email" type="text" name="email" value={this.state.email} onChange={e=>{this.onChange(e,'email')}} />
            </div>
            <div>
              {/* <label >password:</label> */}
              <input  placeholder="password" type="password" name="password"  value={this.state.pwd} onChange={e=>{this.onChange(e,'pwd')}} />
            </div>
            <div>
             <Button variant="warning" onClick={this.submitForm.bind(this)}>login</Button>
            </div>
            <Link to="/register">register</Link>
            &#x3000;
            <Link to="/admin/login">adminLogin</Link>
            &#x3000;
            <Link to="/">home</Link>
            <br />
          </form>
      </div>
    );
  }

}


export default Login;
