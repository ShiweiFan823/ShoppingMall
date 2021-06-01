import { Component } from 'react'
import { Button} from 'react-bootstrap';
import {request,setCookie} from '../../lib/fun'
import {Link} from "react-router-dom"
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      pwd: '',
      pwd2: ''
    }
    

  }
  componentWillMount(){
    if(this.props.getPage) this.props.getPage(false, 'register');
  }

  onChange(e, key){
    // console.log(e.target.value,key)
    this.setState({
      [key]: e.target.value
    })
  }
  submitForm(e){
    var str="@";
    e.preventDefault();
    if(!this.state.email){
      alert('email not null');
      return;
    }
    if(!this.state.email.match(str)){
      alert('email not right ');
      return;
    }
    if(!this.state.pwd){
      alert('password not null');
      return;
    }
    if(!this.state.pwd2){
      alert('confim password not null');
      return;
    }
    if(this.state.pwd != this.state.pwd2){
      alert('Two password entries are inconsistent ');
      return;
    }
    if(this.state.pwd.length<6){
      alert('Password length must > 6 ');
      return;
    }
    
    request('/user/register','post', this.state,()=>{
      //success
      alert('register success');
      // this.$ro
      // this.props.history.push({ pathemail: '/login'})
      window.location.href="/login"
    },()=>{
      //fail
      alert('register fail, user exist')
    })
  }
  render() {
    return (
      <div className="register">
          <h2>Register</h2>
          <form >
            <div>
              {/* <label >email:</label> */}
              <input placeholder="email" type="text" name="email" value={this.state.email} onChange={e=>{this.onChange(e,'email')}} />
            </div>
            <div>
              {/* <label >password:</label> */}
              <input placeholder="password" type="password" name="password"  value={this.state.pwd} onChange={e=>{this.onChange(e,'pwd')}} />
            </div>
            <div>
              {/* <label >confim password:</label> */}
              <input placeholder="confim password" type="password" name="password" value={this.state.pwd2} onChange={e=>{this.onChange(e,'pwd2')}}  />
            </div>
            <div>
             <Button variant="warning" onClick={this.submitForm.bind(this)}>register</Button>
            </div>
            <Link to="/login">Login</Link>
            &#x3000;
            <Link to="/">home</Link>
          </form>
     
      </div>
    );
  }

}


export default Register;
