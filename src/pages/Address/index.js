import { Component } from 'react'
import {Button, Modal} from 'react-bootstrap'
import {request, getCookie} from '../../lib/fun'
class Address extends Component {
  constructor(props) {
    super(props);
    var str = getCookie("user")
    this.state = {
      show: false,
      address: '',
      phone: '',
      name: '',
      user: str?JSON.parse(str): {},
      addresses: [],
      id: undefined
    }
    this.getData();


  }
  onClickAddress(item){
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
      name: '',
      address: '',
      phone: '',
      // edit: false,
      id: undefined
    })

  }
  handleShow(){
    this.setState({
      show: true
    })
  }
  getData(){
    request('/address/get?uid='+this.state.user.email,'get', undefined,(res)=>{
      this.setState({
        addresses: res
      })
    },()=>{
      //fail
    })
  }
  submitForm(e){
    e.preventDefault();
    if(!this.state.name){
      alert('name not null');
      return;
    }
    if(!this.state.phone){
      alert('phone not null');
      return;
    }
    if(!this.state.address){
      alert('address not null');
      return;
    }

    request('/address/'+(this.state.id?'edit':'add'),'post', {
      name: this.state.name,
      address: this.state.address,
      phone: this.state.phone,
      uid: this.state.user.email,
      id: this.state.id
    },(res)=>{
      //success
      alert('add address success');
      this.handleClose();
      this.getData();
    },()=>{
      //fail
      alert('add address  fail')
    })
  }
  deleteAddress(id){
    if(!window.confirm('Are you sure you want to delete it?')){
      return
    }
    request('/address/delete?id='+id,'get', undefined,(res)=>{
      alert("delte address success");
      this.getData();
    },()=>{
      // fail
      alert("delte address fail")
    })
  }
  editAddress(item){
    this.setState({
      show: true,
      id: item.id,
      name: item.name,
      address: item.address,
      phone: item.phone
    })
  }
  componentWillMount(){
    if(this.props.getPage) this.props.getPage(true, 'address');
  }
  render() {
    return (
      <div className="address content">
        <h4>address manager</h4>
        <Button variant="primary" onClick={this.handleShow.bind(this)}>
          add address
      </Button>

        <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.id?'edit':'add'} address</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
            <div>
              <label >name:</label>
              <input type="text" name="name" value={this.state.name} onChange={e=>{this.onChange(e,'name')}} />
            </div>
            <div>
              <label >phone:</label>
              <input type="text" name="phone" value={this.state.phone} onChange={e=>{this.onChange(e,'phone')}} />
            </div>
            <div>
              <label >address:</label>
              <input type="text" name="address" value={this.state.address} onChange={e=>{this.onChange(e,'address')}} />
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
          {
            this.state.addresses.map(item=>{
              return <div className="address-card" onClick={e=>this.onClickAddress(item)}>
                <div >
                  <b className="mr20">{item.name}</b> 
                  <small >{item.phone}</small>

                </div>
                <div>{item.address}</div>
                <div>
                  <Button variant="link" onClick={e=>{e.stopPropagation();this.deleteAddress(item.id)}}>
                    delete
                  </Button>
                  <Button variant="link" onClick={e=>{e.stopPropagation();this.editAddress(item)}}>
                    edit
                  </Button>
                </div>
              </div>
            })
          }
        </div>
      </div>
    );
  }

}


export default Address;
