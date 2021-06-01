import { Component } from 'react'
import { Button} from 'react-bootstrap';
import {request,getCookie} from '../../lib/fun'
class SetPayPassword extends Component {
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
      alert('login password not null');
      return;
    }
    if(!this.state.pay_pwd){
      alert('pay password not null');
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
    request('/user/update/pay_pwd','post', {
      email: this.state.user.email,
      pwd: this.state.pwd,
      pay_pwd: this.state.pay_pwd
    },()=>{
      //success
      alert('Set Pay Password success');
      // this.$ro
      // this.props.history.push({ pathpwd: '/login'})
      window.location.href="/"
    },()=>{
      //fail
      alert('Set Pay Password fail')
    })
  }
  componentWillMount(){
    if(this.props.getPage) this.props.getPage(true, 'setpaypwd');
  }
  render() {
    return (
      <div className="content">
          <h2>SetPayPassword</h2>
          <form >
            <div>
              <label >login password</label>
              <input type="password" name="pwd" value={this.state.pwd} onChange={e=>{this.onChange(e,'pwd')}} />
            </div>
            <div>
              <label >pay password:</label>
              <input type="password" name="password"  value={this.state.pay_pwd} onChange={e=>{this.onChange(e,'pay_pwd')}} />
            </div>
            <div>
              <label >confim password:</label>
              <input type="password" name="password" value={this.state.pay_pwd2} onChange={e=>{this.onChange(e,'pay_pwd2')}}  />
            </div>
            <div>
             <Button variant="warning" onClick={this.submitForm.bind(this)}>SetPayPassword</Button>
            </div>
          </form>
     
      </div>
    );
  }

}


export default SetPayPassword;
