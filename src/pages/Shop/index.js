import { Component } from 'react'
import {Carousel, Button} from 'react-bootstrap';
import {request,getCookie} from '../../lib/fun'
import './shop.css'
class Shop extends Component {
  constructor(props) {
    super(props);
   let keyword = props.history.location.search.replace('?keyword=','')
   var str = getCookie("user")
    this.state = {
      products: [],
      keyword,
      type: undefined,
      price: undefined,
      user: str?JSON.parse(str): {}
    }
    props.history.listen(()=>{
      console.log(props.history.location,888)
      keyword=props.history.location.search.replace('?keyword=','')
      request("/product/get?keyword="+keyword,'get',undefined,(res)=>{
        // console.log(res)
        this.setState({
          products: res?res:[],
        })
      },()=>{
  
      });
      this.setState({
        keyword
      })
     })
    this.getData();

  }
  getData(type,price){
    let url = "/product/get?keyword="+this.state.keyword
    
    if(price){
      let arr = price.split('+');
      // console.log(arr,77)
      let str2 = arr[1]?(' and price<='+arr[1]) : ''
      price="price>="+arr[0] + str2
  }
    if(type) url+="&type="+type
    if(price) url+="&price="+price
    request(url,'get',undefined,(res)=>{
      console.log(res)
      this.setState({
        products: res?res:[],
      })
    },()=>{

    });
  }
  addCart(id){
    console.log(id);
    if(!(this.state.user&&this.state.user.email)){
      alert("need login");
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
        window.location.reload();
      }
    },()=>{
      alert('add cart fail');
    });
  }
  setType(type){
    this.setState({
      type
    })
    this.getData(type,this.state.price);
  }
  setPrice(price){
    this.setState({
      price
    })
    this.getData(this.state.type,price);
  }
  render() {
    return (
      <div className="shop content">
          <h2>Shop</h2>
          <div className="shop-type">
            type:  &#x3000;

            <span onClick={()=>{this.setType()}} className={this.state.type===undefined?'active':''}>all</span>
            <span onClick={()=>{this.setType('mobile')}} className={this.state.type==='mobile'?'active':''}>mobile</span>
            <span onClick={()=>{this.setType('computer')}} className={this.state.type==='computer'?'active':''}>computer</span>
            <span onClick={()=>{this.setType('camera')}} className={this.state.type==='camera'?'active':''}>camera</span>
            <span onClick={()=>{this.setType('headset')}} className={this.state.type==='headset'?'active':''}>headset</span>
            <span onClick={()=>{this.setType('stereo')}} className={this.state.type==='stereo'?'active':''}>stereo</span>
            <span onClick={()=>{this.setType('Game console')}} className={this.state.type==='Game console'?'Game console':''}>game console</span>
            <span onClick={()=>{this.setType('watch')}} className={this.state.type==='watch'?'watch':''}>watch</span>
          </div>
          <br />
          <div className="shop-type">
            price:  &#x3000;

            <span onClick={()=>{this.setPrice()}} className={this.state.price===undefined?'active':''}>all</span>
            <span onClick={()=>{this.setPrice('0+5000')}} className={this.state.price==='0+5000'?'active':''}>0-5000</span>
            <span onClick={()=>{this.setPrice('5000+10000')}} className={this.state.price==='5000+10000'?'active':''}>5000-10000</span>
            <span onClick={()=>{this.setPrice('10000+15000')}} className={this.state.price==='10000+15000'?'active':''}>10000-15000</span>
            <span onClick={()=>{this.setPrice('15000+20000')}} className={this.state.price==='15000+20000'?'active':''}>15000-20000</span>
            <span onClick={()=>{this.setPrice('20000+30000')}} className={this.state.price==='20000+30000'?'active':''}>20000-30000</span>
            <span onClick={()=>{this.setPrice('30000+50000')}} className={this.state.price==='30000+50000'?'active':''}>30000+50000</span>
            <span onClick={()=>{this.setPrice('50000+')}} className={this.state.price==='50000+'?'active':''}>50000+</span>
          </div>
          <br />
          <div class="grid">
            {
              !this.state.products || this.state.products.length==0?<div class="tip">no shopping</div>:''
            }
           {
             this.state.products.map(item=>{
               return <div>
                    <a href={'/detail/'+item.id}>
                      <img
                          className="w-50"
                          src={item.img}
                        />
                        <br />
                        <p>{item.title}</p>
                        <p>${item.price}</p>
                    </a>
                    <Button variant="warning" onClick={()=>{this.addCart(item.id)}}>add cart</Button>
               </div>
             })
           }
         </div>
      
      </div>
    );
  }

}


export default Shop;
