import { Component } from 'react'
import {getCookie, delCookie, request} from '../../lib/fun'
import {Button} from 'react-bootstrap';
import {Link} from "react-router-dom"
class Carts extends Component {
  constructor(props) {
    super(props);
    var str = getCookie("user")
    this.state = {
      user: str?JSON.parse(str): {},
      carts: [],
      len: 0,
      total: 0
    }
    this.getData();


  }
  getData(){
    this.setState({
      carts: [],
      len: 0,
      total: 0
    })
    if(this.state.user.email){
      request("/carts/"+this.state.user.email,'get',undefined,(res)=>{
        var total = 0;
        res.map(item=>{
          total+=item.price;
        })
        this.setState({
          carts: res,
          len: res.length,
          total
        })
        // console.log(this.state.carts.length,'len')
      },()=>{
  
      });

    }
  }
  delete(id){
    if(!window.confirm('Are you sure you want to delete it?')){
      return
    }
    request("/cart/delete?id="+id+'&email='+this.state.user.email,'get',undefined,(res)=>{
      this.props.getCarts();
      alert('delete from cart sucess')
      // window.location.reload()
      
      this.getData();
      
    },()=>{
      alert('delete from cart fail')
    });
  }
  componentWillMount(){
    if(this.props.getPage) this.props.getPage(true, 'carts');
  }
  render() {
    return (
      <div className="carts content">
          <h2>My Carts</h2>
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
                    <Button onClick={()=>{this.delete(item.id)}}>delete</Button>
                  </div>
                })
              }
              <br />
              <div class="flex flex-between">
                <span>total: ${this.state.total}</span>
                {
                  this.state.total>0?<Link to="/checkout" class="btn btn-success">Checkout</Link>:''
                }
                
               
              </div>
          </div>
      </div>
    );
  }

}


export default Carts;
