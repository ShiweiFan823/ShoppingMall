import { Component } from 'react'
import { Button} from 'react-bootstrap';
import {request,getCookie,delCookie} from '../../lib/fun'
class ChangePwd extends Component {
  constructor(props) {
    super(props);
    var str = getCookie("user")
    this.state = {
      user: str?JSON.parse(str): {},
      pwd: '',
      pay_pwd: '',
      pay_pwd2: ''
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
    if(!this.state.pwd){
      alert('old password not null');
      return;
    }
    if(!this.state.pay_pwd){
      alert('new password not null');
      return;
    }
    if(!this.state.pay_pwd2){
      alert('confim password not null');
      return;
    }
    if(this.state.pay_pwd != this.state.pay_pwd2){
      alert('Two password entries are inconsistent ');
      return;
    }
    request('/user/update/pwd','post', {
      email: this.state.user.email,
      pwd: this.state.pwd,
      pwd2: this.state.pay_pwd
    },()=>{
      //success
      alert('Change Password success');
      // this.$ro
      // this.props.history.push({ pathpwd: '/login'})
      delCookie("user");
      window.location.href="/login"
    },()=>{
      //fail
      alert('Change Password fail')
    })
  }
  componentWillMount(){
    if(this.props.getPage) this.props.getPage(true, 'changepwd');
  }
  render() {
    return (
      <div className="content">
          <h2>ChangePwd</h2>
          <form >
            <div>
              <label >old password</label>
              <input type="password" name="pwd" value={this.state.pwd} onChange={e=>{this.onChange(e,'pwd')}} />
            </div>
            <div>
              <label >new password:</label>
              <input type="password" name="password"  value={this.state.pay_pwd} onChange={e=>{this.onChange(e,'pay_pwd')}} />
            </div>
            <div>
              <label >confim password:</label>
              <input type="password" name="password" value={this.state.pay_pwd2} onChange={e=>{this.onChange(e,'pay_pwd2')}}  />
            </div>
            <div>
             <Button variant="warning" onClick={this.submitForm.bind(this)}>ChangePwd</Button>
            </div>
          </form>
     
      </div>
    );
  }

}


export default ChangePwd;
