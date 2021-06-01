import { Component } from 'react'
import {request,getCookie} from '../../lib/fun'
import {Button} from 'react-bootstrap';
import './detail.css'
import {BrowserRouter as Router,Route,Switch, Link} from "react-router-dom"
class Detail extends Component {
  constructor(props) {
    super(props);
    var str = getCookie("user")
    this.state = {
      product: {},
      user: str?JSON.parse(str): {}
    }
    // console.log(this.state.user,88889)
    // console.log(props.match.params.id,8888)
    if(!props.match.params.id) window.location.href="/"
    request("/product/detail/"+props.match.params.id,'get',undefined,(res)=>{
      // console.log(res,7777,'product/'+props.match.params.id)
      this.setState({
        product: res?res[0]:{}
      })
    },()=>{

    });

  }
  cancel(){
    window.history.back();
  }
  checkoutFun(e){
    if(!(this.state.user&&this.state.user.email)){
      e.preventDefault();
      
      alert("need login first");
      window.location.href="/login"
      return false;
    }
  }
  addCart(id){
    console.log(id);
    if(!(this.state.user&&this.state.user.email)){
      alert("You need login first");
      window.location.href="/login"
      return;
    }
    request("/user/update",'post',{
      email: this.state.user.email,
      pwd: this.state.user.pwd,
      cart: id
    },(res)=>{
      // console.log(res,1234)
      if(res.msg){
        alert(res.msg);
      }else{
        alert('add cart success');
        // window.location.reload();
        this.props.getCarts();
      }
    },()=>{
      alert('add cart fail');
    });
  }
  componentWillMount(){
    if(this.props.getPage) this.props.getPage(true, 'detail');
  }
  render() {
    return (
      <div className="detail content">
        
        <header className="my-header"><span className="back"  onClick={this.cancel}> &lt;back</span> </header>
          <div className="grid">
          <div className="img-box">
          <img
              width="100%"
              src={this.state.product.img}
            />
          </div>
          
          <div className="des-box">
            <p className="title">{this.state.product.title}</p>
            <p className="price">price: ${this.state.product.price}</p>
            <Button className="mar10"  onClick={()=>{this.addCart(this.state.product.id)}} variant="warning">add cart</Button>
          
            <Link onClick={e=>{this.checkoutFun(e)}} className="mar10"  to={'/checkout?id='+this.state.product.id} class="btn btn-success">purchar</Link>
           

          </div>
                        
          </div>
          <br/><br/>
          <h3>detail</h3>
          <div>{
            this.state.product &&this.state.product.detail? this.state.product.detail.split(";").map(item=>{
              return <img
              width="100%"
              src={item}
            />
            }):''
            }</div>
      </div>

    );
  }

}


export default Detail;
