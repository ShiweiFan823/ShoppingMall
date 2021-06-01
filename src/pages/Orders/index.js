import { Component } from 'react'
import {request, getCookie} from '../../lib/fun'
import { Button} from 'react-bootstrap';
class Orders extends Component {
  constructor(props) {
    super(props);
    var str = getCookie("user")
    this.state = {
      orders:[],
      user: str?JSON.parse(str): {}

    }
    this.getData();

  }
  getData(){
    request('/order/get?email='+this.state.user.email,'get', undefined,(res)=>{
      this.setState({
        orders: res.reverse()
      })
    },()=>{
      //fail
    })
  }
  pay(id){
 
    

      var pwd = prompt('please input pay password?');
      if(pwd===null) return;
      if(!pwd){
        alert('pay password not null')
        return;
      }
      request("/user/pay",'post',{
        pay_pwd: pwd,
        email: this.state.user.email,
        id:id 
      },(res2)=>{
        alert('pay sucess')
        this.getData()
      },()=>{
        alert('pay fail')
      });
    
    
  }
  componentWillMount(){
    if(this.props.getPage) this.props.getPage(true, 'orders');
  }
  render() {
    return (
      <div className="orders content">
          <h2>Orders</h2>
          <ul>
            {
              this.state.orders.map(item=>{
                return <li>
                  <div className="flex flex-between">
                    <span>{item.createtime}</span>
                    <span>status: {item.status?'pay success':'no pay'}</span>
                   
                  </div>
                  {
                    item.products.map(item2=>{
                      return <div  class="flex cart"> 
                      <img
                          width={50}
                          heigh={50}
                          src={item2.img}
                        />
                        <div>
                          <div>{item2.title}</div>
                          <div>${item2.price}</div>
                        
                        </div>
                      </div>
                    })
                  }
                  <br />
                  <div class="flex flex-between">
                    
                    <span>total:${item.total}</span>
                     {
                      item.status?'':<Button variant="warning" onClick={e=>{this.pay(item.id)}}>pay</Button>
                    }</div>
                    <br />
                </li>
              })
            }
          </ul>

      </div>
    );
  }

}


export default Orders;
