import { Component } from 'react'
import { Button} from 'react-bootstrap';
import {request,setCookie} from '../../lib/fun'
class AdminLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      pwd: ''
    }


  }
  onChange(e, key){
    // console.log(e.target.value,key)
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

    request('/admin/login','post', this.state,(res)=>{
      //success
      alert('login success');
      setCookie('admin', JSON.stringify(res))
      // this.$ro
      // this.props.history.push({ pathemail: '/login'})
      window.location.href="/admin"
    },()=>{
      //fail
      alert('login fail, email or password error')
    })
  }
  componentWillMount(){
    if(this.props.getPage) this.props.getPage(false, 'adminLogin');
  }
 
  render() {
    return (
      <div className="login">
          <h2>Admin Login</h2>
          <form>
            <div>
              {/* <label >email:</label> */}
              <input placeholder="email" type="text" name="email" value={this.state.email} onChange={e=>{this.onChange(e,'email')}} />
            </div>
            <div>
              {/* <label >password:</label> */}
              <input placeholder="password" type="password" name="password"  value={this.state.pwd} onChange={e=>{this.onChange(e,'pwd')}} />
            </div>
            <div>
             <Button variant="warning" onClick={this.submitForm.bind(this)}>login</Button>
            </div>
          </form>
      </div>
    );
  }

}


export default AdminLogin;
