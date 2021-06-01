import { Component } from 'react'
import { Navbar, Nav, NavDropdown,Dropdown, Form, FormControl, Button } from 'react-bootstrap';
// import {Router, Route, Link}from 'react-router';
import {BrowserRouter as Router,Route,Switch, Link} from "react-router-dom"
import About from './pages/About'
import Orders from './pages/Orders'
import Register from './pages/Register'
import SetPayPwd from './pages/SetPayPwd'
import Shop from './pages/Shop'
import Address from './pages/Address'
import Admin from './pages/Admin'
import Carts from './pages/Carts'
import ChangePwd from './pages/ChangePwd'
import Checkout from './pages/Checkout'
import Detail from './pages/Detail'
import Home from './pages/Home'
import Login from './pages/Login'
import {getCookie, delCookie, request} from './lib/fun'
// AdminLogin
import AdminLogin from './pages/AdminLogin'
import './App.css';
// import Home from './pages/Home';
class App extends Component {
  constructor(props) { 
    super(props);
    var str = getCookie("user")
    let keyword = window.location.search.replace('?keyword=','')
 
    this.state = {
      user: str?JSON.parse(str): {},
      carts: [],
      len: 0,
      total: 0,
      keyword: keyword || '',
      showNav: true,
      page: 'index'
    }
  
    // /carts/
    
    this.getCarts()
  }
  onChangeKey(e){
    this.setState({
      keyword: e.target.value
    })
  }
  getPage(show=true,page='index'){
    if(this.state.page!=page && this.state.showNav!=show){
      console.log(show, page)
      this.setState({
        showNav: show,
        page: page
      })
    }
    
  }
  getCarts(){
    if(this.state.user.email){
      this.setState({
        carts: [],
        len: 0,
        total: 0
      })
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
      },()=>{
  
      });

    }
  }
  logout(){
    delCookie("user");
    window.location.href="/"
  }

  render() {
    return (
      <div className="App">
        <Router >
          
        
        {
          this.state.showNav?<div>
            <div>
         
         
         <ul role="nav" className="flex flex-right page-top">
         {
           this.state.user && this.state.user.email?
           <div class="flex">
              <li>
         <Dropdown>
         <Dropdown.Toggle variant="link" id="dropdown-basic">
           <svg className="icon" t="1619770301636" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3783" width="200" height="200"><path d="M517.632 552.149333c-108.714667 0-197.162667-85.546667-197.162667-190.72 0-38.314667 11.690667-75.306667 33.877334-106.922666C391.04 202.026667 452.138667 170.666667 517.632 170.666667c65.408 0 126.464 31.274667 163.2 83.712 7.765333 11.093333 14.250667 22.869333 19.413333 35.072a21.333333 21.333333 0 1 1-39.338666 16.64 147.285333 147.285333 0 0 0-15.018667-27.221334C617.130667 237.824 569.173333 213.333333 517.632 213.333333c-51.626667 0-99.584 24.533333-128.426667 65.621334a143.445333 143.445333 0 0 0-26.069333 82.432c0 81.664 69.290667 148.096 154.453333 148.096 63.402667 0 119.722667-36.437333 143.36-92.8a21.333333 21.333333 0 0 1 39.338667 16.512c-30.378667 72.277333-102.016 118.954667-182.656 118.954666" p-id="3784"></path><path d="M303.829333 627.456c-49.92 0-90.453333 41.088-90.453333 91.605333C213.333333 769.578667 253.866667 810.666667 303.786667 810.666667h416.341333C770.133333 810.666667 810.666667 769.578667 810.666667 719.061333c0-50.517333-40.533333-91.605333-90.453334-91.605333H303.786667zM720.213333 853.333333H303.829333C230.442667 853.333333 170.709333 793.088 170.709333 719.061333 170.666667 645.034667 230.4 584.789333 303.786667 584.789333h416.341333C793.6 584.789333 853.333333 645.034667 853.333333 719.061333 853.333333 793.088 793.6 853.333333 720.213333 853.333333z" p-id="3785"></path></svg>
         
         </Dropdown.Toggle>

         <Dropdown.Menu>
           <Dropdown.Item href="orders">My Orders</Dropdown.Item>
           <Dropdown.Item href="address">My Address</Dropdown.Item>
           <Dropdown.Item href="setPayPwd">Set Pay Password</Dropdown.Item>
           <Dropdown.Item href="changePassword">Change Password</Dropdown.Item>
           <Dropdown.Item as="button" onClick={this.logout.bind(this)}>Logout</Dropdown.Item>
         </Dropdown.Menu>
       </Dropdown>
       </li>
       <li>
        <Dropdown>
         <Dropdown.Toggle variant="link" id="dropdown-basic2">
         <svg className="icon" t="1619770154288" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1396" width="200" height="200"><path d="M330.666667 768a53.333333 53.333333 0 1 1 0 106.666667 53.333333 53.333333 0 0 1 0-106.666667z m384 0a53.333333 53.333333 0 1 1 0 106.666667 53.333333 53.333333 0 0 1 0-106.666667zM94.762667 160h54.741333a96 96 0 0 1 92.906667 71.786667l1.024 4.394666L256.64 298.666667h0.213333l42.88 205.333333L332.224 661.333333h402.218667l61.653333-298.666666H313.813333l-13.376-64h495.68a64 64 0 0 1 62.677334 76.949333l-61.653334 298.666667A64 64 0 0 1 734.442667 725.333333H332.224a64 64 0 0 1-62.677333-51.050666l-60.586667-293.418667-0.405333 0.085333-27.733334-131.562666a32 32 0 0 0-28.309333-25.237334l-2.986667-0.149333H94.741333v-64h54.741334z" p-id="1397"></path></svg>
         {this.state.len}
         </Dropdown.Toggle>

         <Dropdown.Menu>
           
          <Dropdown.Header>Dropdown header</Dropdown.Header>
           <Dropdown.Divider />
           <Dropdown.ItemText>
             {
               this.state.carts.map(item=>{
                 return <div class="flex cart">
                   <img
                     width={50}
                     heigh={50}
                     src={item.img}
                   />
                   <div>
                   <div>{item.title}</div>
                   <div>${item.price}</div>
                   </div>
                 </div>
               })
             }
             <div className="flex flex-between"><span>total:</span>  <span>${this.state.total}</span></div>
             <br />
             <div className="flex flex-between">
               
               <Link to="/carts" class="btn btn-light">View Cart</Link>
               
               <Link to="/checkout" class="btn btn-success">Checkout</Link>
             </div>
           </Dropdown.ItemText>
         </Dropdown.Menu>
       </Dropdown>
       </li>
           </div> :
           <div class='flex'>
             <li class="mr20"><Link to="/register">Register</Link></li>
             <li class="mr20"><Link to="/login">Login</Link></li>
           </div>
         }
         
        
       
       </ul>

    </div>
     <Navbar bg="light" expand="lg">
       <Navbar.Brand href="#home"><svg className="icon" t="1619770232520" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1713" width="200" height="200"><path d="M556.586667 159.36l288.490666 183.914667A64 64 0 0 1 874.666667 397.248v392.746667a64 64 0 0 1-64 64H555.456l0.021333-196.992H490.666667v196.992H234.666667a64 64 0 0 1-64-64v-398.293334a64 64 0 0 1 30.272-54.4l287.530666-178.346666a64 64 0 0 1 68.138667 0.426666zM810.666667 790.016V397.226667L522.197333 213.333333 234.666667 391.68v398.336h192v-197.013333h192.810666v196.992H810.666667z" p-id="1714"></path></svg>shopping</Navbar.Brand>
       <Navbar.Toggle aria-controls="basic-navbar-nav" />
       <Navbar.Collapse id="basic-navbar-nav">
         <Nav className="mr-auto">
           <Nav.Link href="/">Home</Nav.Link>
           <Nav.Link href="/shop">Shop</Nav.Link>
           <Nav.Link href="/about">about</Nav.Link>

           {/* <NavDropdown title="Dropdown" >
         <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
         <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
         <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
         <NavDropdown.Divider />
         <NavDropdown.Item href="#action/3.4">Separated Link</NavDropdown.Item>
       </NavDropdown> */}
         </Nav>

         <Form inline>
           <FormControl type="text" onChange={this.onChangeKey.bind(this)} value={this.state.keyword} placeholder="Search" className="mr-sm-2" />
           {/* <Button variant="outline-success" onClick={this.search.bind(this)}>Search</Button> */}
           <Link to={'/shop?keyword='+this.state.keyword} className="btn btn-outline-success" >Search</Link>

         </Form>
       </Navbar.Collapse>
     </Navbar>
     
          </div>:''
        }
        <Route path="/register"  component={props=>{
          let obj = Object.assign({},{getPage: (show,page)=>{this.getPage(show,page)}},props)
          return <Register {...obj} />
        }}/>
        <Route path="/login" component={Login} component={props=>{
          let obj = Object.assign({},{getPage: (show,page)=>{this.getPage(show,page)}},props)
          return <Login {...obj} />
        }}/>
        <Route path="/about"  component={props=>{
          let obj = Object.assign({},{getPage: (show,page)=>{this.getPage(show,page)}},props)
          return <About {...obj} />
        }}/>
        <Route path="/address" component={props=>{
          let obj = Object.assign({},{getPage: (show,page)=>{this.getPage(show,page)}},props)
          return <Address {...obj} />
        }}/>
        <Route path="/orders" component={props=>{
          let obj = Object.assign({},{getPage: (show,page)=>{this.getPage(show,page)}},props)
          return <Orders {...obj} />
        }}/>
        <Route path="/setPayPwd"   component={props=>{
          let obj = Object.assign({},{getPage: (show,page)=>{this.getPage(show,page)}},props)
          return <SetPayPwd {...obj} />
        }}/>
        <Route path="/changePassword"  component={props=>{
          let obj = Object.assign({},{getPage: (show,page)=>{this.getPage(show,page)}},props)
          return <ChangePwd {...obj} />
        }}/>
        <Route path="/detail/:id"  component={props=>{
          let obj = Object.assign({},{getCarts: ()=>{this.getCarts()}, getPage: (show,page)=>{this.getPage(show,page)}},props)
          return <Detail {...obj} />
        }}/>
        <Route path="/carts"  component={props=>{
          let obj = Object.assign({},{getCarts: ()=>{this.getCarts()}, getPage: (show,page)=>{this.getPage(show,page)}},props)
          return <Carts {...obj} />
        }}/>
        <Route path="/checkout" component={Checkout}/>
        <Route path="/shop" component={props=>{
          let obj = Object.assign({},{getCarts: ()=>{this.getCarts()} , getPage: (show,page)=>{this.getPage(show,page)}},props)
          return <Shop {...obj} />
        }}/>
        <Route path="/shop/keyword" component={props=>{
          let obj = Object.assign({},{getCarts: ()=>{this.getCarts()} , getPage: (show,page)=>{this.getPage(show,page)}},props)
          return <Shop {...obj} />
        }}/>
        <Route path="/" component={props=>{
          let obj = Object.assign({},{getCarts: ()=>{this.getCarts()}, getPage: (show,page)=>{this.getPage(show,page)}},props)
          return <Home {...obj} />
        }} exact/>
        <Route path="/admin/login"  component={props=>{
          let obj = Object.assign({},{getPage: (show,page)=>{this.getPage(show,page)}},props)
          return <AdminLogin {...obj} />
        }}/>
        <Route path="/admin" exact  component={props=>{
          let obj = Object.assign({},{getPage: (show,page)=>{this.getPage(show,page)}},props)
          return <Admin {...obj} />
        }}/>
        
        </Router>
        
        {/* AdminLogin */}
        
      </div>
    );
  }

}


export default App;
