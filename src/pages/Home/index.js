import { Component } from 'react'
import {Carousel, Button} from 'react-bootstrap';
import {request,getCookie} from '../../lib/fun'
import { Link} from "react-router-dom"
class Home extends Component {
  constructor(props) {
    super(props);
    // console.log(props,99888)
    var str = getCookie("user")
    this.state = {
      // $
      slides: [  
      ],
      products: [],
      user: str?JSON.parse(str): {}
    }
    request("/product/get",'get',undefined,(res)=>{
      console.log(res)
      this.setState({
        slides: res?res.slice(0,3):[],
        products: res?res.slice(0,20):[],
      })
    },()=>{

    });


  }
  addCart(id){
    if(!(this.state.user&&this.state.user.email)){
      alert("need login");
      window.location.href="/login"
      return;
    }
    console.log(id);
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
        this.props.getCarts();
      }
    },()=>{
      alert('add cart fail');
    });
  }
  componentWillMount(){
    if(this.props.getPage) this.props.getPage(true, 'home');
  }
  render() {
    return (
      <div className="home content">
   
        <Carousel>
          {
           this.state.slides.map(item=>{
              return  <Carousel.Item>
                    <div className="flex flex-middle flex-between flex-md-col">
                   
                    <div>
                      <h3>
                        <div>{item.title}</div>
                        <br />
                        <div>${item.price}</div>
                        <br />
                        {/* <Button variant="warning">SHOP NOW</Button> */}
                        <Link to="/shop" class="btn btn-warning">SHOP NOW</Link>
                      </h3>
                      

                    </div>
                    <img
                      className="d-block w-50"
                      src={item.img}
                    />
                    </div>
                  </Carousel.Item>
              
            })
    
     
          }
         </Carousel>
         <h2>Hot Products</h2>
         <div class="grid">
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


export default Home;
