import { Component } from 'react'
import {Button, Modal} from 'react-bootstrap'
import {request, getCookie,delCookie} from '../../lib/fun'
import Upload from '../../component/Upload'
class Admin extends Component {
  constructor(props) {
    super(props);
    // console.log(props.onResult,9990000)
    var str = getCookie("admin")
    this.state = {
      show: false,
      img: '',
      title: '',
      price: '',
      type: '',
      brand: '',
      detail: '',
      user: str?JSON.parse(str): {},
      products: [],
      id: undefined,
      files: [],
     
    }
    if(this.state.user && this.state.user.email){
      this.getData();
    }else{
      // alert('need login')
      // console.log(this.user,8888111)
      window.location.href="/admin/login"
    }
    


  }
  getFiles(files){
    this.setState({
      img: files[0]
    })
  }
  getFiles2(files){
    console.log(111111111111122)
    this.setState({
      files:files
    })

  }
  onClickAdmin(item){
    if(this.props.onResult){
      this.props.onResult(item)
    }
  }
  
  onChange(e, key){
    this.setState({
      [key]: e.target.value
    })
  }
  handleClose(){
    this.setState({
      show: false,
      img: '',
      title: '',
      price: '',
      type: '',
      brand: '',
      detail: '',
      id: undefined,
      files: []
    })

  }
  handleShow(){
    this.setState({
      show: true
    })
  }
  getData(){
    request('/product/get','get', undefined,(res)=>{
      this.setState({
        products: res
      })
    },()=>{
      //fail
    })
  }
  submitForm(e){
    e.preventDefault();


    if(!this.state.img){
      alert('img not null');
      return;
    }
    if(!this.state.title){
      alert('title not null');
      return;
    }
    if(!this.state.price){
      alert('price not null');
      return;
    }
    if(!this.state.type){
      alert('type not null');
      return;
    }
    if(!this.state.brand){
      alert('brand not null');
      return;
    }

    request('/product/'+(this.state.id?'edit':'add'),'post', {
     
      id: this.state.id,
      img: this.state.img,
      title: this.state.title,
      price: this.state.price,
      type: this.state.type,
      brand: this.state.brand,
      detail: this.state.files.join(';')
    },(res)=>{
      //success
      alert('add product success');
      this.handleClose();
      this.getData();
    },()=>{
      //fail
      alert('add product  fail')
    })
  }
  deleteProdect(id){
    if(!window.confirm('Are you sure you want to delete it?')){
      return
    }
    request('/product/delete?id='+id,'get', undefined,(res)=>{
      alert("delte product success");
      this.getData();
    },()=>{
      // fail
      alert("delte product fail")
    })
  }
  editProduct(item){
    this.setState({
      show: true,
      img: item.img,
      title: item.title,
      price: item.price,
      type: item.type,
      brand: item.brand,
      detail: item.detail,
      id: item.id,
      files: item.detail?item.detail.split(';'):['','','']
    })
  }
  logout(){
    delCookie("admin");
    window.location.href="/admin/login"
  }
  componentWillMount(){
    if(this.props.getPage) {
      this.props.getPage(false, 'admin');
    }
  }

  render() {
    return (
      <div className="Admin content">
        <h4><span>product manager</span> <Button  variant="link" onClick={this.logout.bind(this)}>Logout</Button></h4>
        <Button variant="primary" onClick={this.handleShow.bind(this)}>
          add product
      </Button>
      

        <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.id?'edit':'add'} product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
            <div><label >img src:</label>
            <Upload getFiles={this.getFiles.bind(this)} options={ {showBtn: false,files: [this.state.img]}} />
                </div> 
     

            <div>
              <label >title:</label>
              <input type="text" name="title" value={this.state.title} onChange={e=>{this.onChange(e,'title')}} />
            </div>
            <div>
              <label >price:</label>
              <input type="number" name="price" value={this.state.price} onChange={e=>{this.onChange(e,'price')}} />
            </div>
            <div>
              <label >type:</label>
              <select value={this.state.type} onChange={e=>{this.onChange(e,'type')}} >
                <option value="mobile">mobile</option>
                <option value="computer">computer</option>
                <option value="camera">camera</option>
                <option value="headset">headset</option>
                <option value="stereo">stereo</option>
                <option value="game console">game console</option>
                <option value="watch">watch</option>
              </select>
             
            </div>
            <div>
              <label >brand:</label>
              <input type="text" name="brand" value={this.state.brand} onChange={e=>{this.onChange(e,'brand')}} />
            </div>
            <div>
              <label >detail:</label>
              <Upload getFiles={(f)=>this.getFiles2(f)}  options={ {showBtn: true, files: [...this.state.files]}} />
              {/* <Upload options={ {showBtn: false,tip:1,getFiles: this.getFiles2.bind(this), files: [...this.state.files]}} /> */}
                
              {/* <input type="text" name="detail" value={this.state.detail} onChange={e=>{this.onChange(e,'detail')}} /> */}
            </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose.bind(this)}>
              Close
          </Button>
            <Button variant="primary" onClick={this.submitForm.bind(this)}>
              Save
          </Button>
          </Modal.Footer>
        </Modal>
        <div >
        <div class="grid">
           {
             this.state.products.map(item=>{
               return <div class="admin-product">
                    <div>
                   
                      <img
                          
                          height="80px"
                          src={item.img}
                        />
                        <br />
                        <p>{item.title}</p>
                        <p>${item.price}</p>
                   
                    </div>

                    <div>
                    <Button variant="link" onClick={()=>{this.editProduct(item)}}>edit</Button>
                    <Button variant="link" onClick={e=>{e.stopPropagation();this.deleteProdect(item.id)}}>
                    delete
                  </Button>
                    </div>
               </div>
             })
           }
         </div>
      
        </div>
      </div>
    );
  }

}


export default Admin;
