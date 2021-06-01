import { Component } from 'react'
import {getCookie, delCookie, request} from '../../lib/fun'
import {Button,Modal} from 'react-bootstrap';
import Address from '../Address'
class Checkout extends Component {
  constructor(props) {
    super(props);
    var str = getCookie("user")
    this.state = {
      user: str?JSON.parse(str): {},
      carts: [],
      len: 0,
      total: 0,
      step: 1,
      addresses: [],
      address: {},
      show: false,
      id: props.location.search.replace('?id=','')
    }
    if(!(this.state.user&&this.state.user.email)){
      // alert("need login");
      window.location.href="/login"
      return;
    }
    // console.log(props.location.search.replace('?id=',''),5555)
    if(this.state.user.email){
     
      request("/carts/"+this.state.user.email+'?id='+this.state.id,'get',undefined,(res)=>{
        var total = 0;
        res.map(item=>{
          total+=item.price;
        })
        this.setState({
          carts: res,
          len: res.length,
          total
        })
        // console.log(this.state.Checkout.length,'len')
      },()=>{
  
      });

    }

    this.getData()
  }
  handleShow(){
    this.setState({
      show: true
    })
  }
  handleClose(){
    this.setState({
      show: false
    })
    this.getData();

  }
  pay(){
    if(!this.state.address || !this.state.address.id){
      alert('please input address')
      return;
    }
    console.log('this.state.id',this.state.id)
    request("/order/add",'post',{
      email: this.state.user.email,
      address: this.state.address,
      carts: this.state.carts,
      isCarts: this.state.id!=''?undefined : true
    },(res)=>{
      // alert('pay sucess')
      var pwd = prompt('please input pay password?');
      if(pwd===null) return;
      if(!pwd){
        alert('pay password not null')
        return;
      }
      request("/user/pay",'post',{
        pay_pwd: pwd,
        email: this.state.user.email,
        id: res.insertId
      },(res2)=>{
        alert('pay sucess')
        window.location.href="/orders"
      },()=>{
        alert('pay fail')
        window.location.href="/orders"
      });
    },()=>{
      alert('create order fail')
      
    });
    
  }
  getData(){
    request('/address/get?uid='+this.state.user.email,'get', undefined,(res)=>{
      // var addr = Object.assign(this.state.address, res[0])
      this.setState({
        addresses: res
      })
      // console.log(res[0],999000)
    },()=>{
      //fail
    })
  }
  onResult(r){
    // console.log(this.state,r,555);
    var addr = Object.assign(this.state.address, r)
    this.setState({
      address: addr
    })
    console.log({},this.state.address,r,777);
    this.handleClose()
  }
  componentWillMount(){
    if(this.props.getPage) this.props.getPage(true, 'checkout');
  }
  render() {
    return (
      <div className="cart content">
          <h2>My Checkout</h2>
          <div  onClick={this.handleShow.bind(this)} className="address-card choise-addr">
               {
                 this.state.address && this.state.address.address?
                 <div className="flex flex-between ">
                   <div>
                  <div >
                    <b className="mr20">{this.state.address.name}</b> 
                    <small >{this.state.address.phone}</small>

                  </div>
                  <div>{this.state.address.address}</div>

                </div>
                <span> &gt; </span>
                 </div>
                 : <span className="flex flex-between "><span>select address  </span><span> &gt; </span></span>
               }
                
              </div>
          <div>
          {
                this.state.carts.map(item=>{
                  return <div class="flex cart flex-between">
                    <div  class="flex "> <img
                      width={50}
                      heigh={50}
                      src={item.img}
                    />
                    <div>
                      <div>{item.title}</div>
                      <div>${item.price}</div>
                    
                    </div></div>
                   
                  </div>
                })
              }
              <br />
              <div class="flex flex-between">
                <span>total: ${this.state.total}</span>
                
                <Button onClick={this.pay.bind(this)}>pay</Button>
              </div>
          </div>
          <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>choise address</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Address onResult={r=>{this.onResult(r)}} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose.bind(this)}>
              Close
          </Button>
           
          </Modal.Footer>
        </Modal>
        
      </div>
    );
  }

}


export default Checkout;
