import {Component} from 'react'
import './index.css'
import {request} from '../../lib/fun'
class Upload extends Component {
  constructor(props){
    super(props)
    console.log(props.options,666)
    this.state = {
        // num: [''],
        files: props.options.files || [null]
    }
    
  }
  clickSel(i=0){
      console.log(5555,this.refs.uploadIpt,900)
      this.refs.uploadIpt.click()
  }
    clickAdd(){
        let files = this.state.files
        files.push(null)
       this.setState({
         files
       })
    }
    onChange(i=0,e){
        let files = this.state.files
        // files[i] = URL.createObjectURL( e.target.files[0])
        let fd = new FormData()
        fd.append('file', e.target.files[0] )
        request('/product/upload','POST', fd,(res)=>{
         
          files[i] = res.filename;
           this.setState({
              files
          })
          console.log(res.filename,this.props.options.getFiles,6666,files)
          console.log(this.props.options && this.props.getFiles,7777)
           if(this.props.getFiles) this.props.getFiles(files)
        },()=>{
          //fail
          alert('upload fail')
        }, false)
        // this.setState({
        //     files
        // })
        // if(this.props.options && this.props.options.getFiles) this.props.options.getFiles(files)
    }
  render(){
    return (
      <div className="upload-file-box">
          {
             this.state.files.map((item,i)=>{
                  return <div className="upload-file">
                            {
                               item? <img height="50px" src={item} onClick={e=>{this.clickSel(i)}}/>:
                                <div  className="upload-app" onClick={e=>{this.clickSel(i)}}>
                                    +
                                </div>
                            }
                            <input ref="uploadIpt" className="upload-ipt" onChange={e=>{this.onChange(i,e)}}  type="file" />
                        </div>
              })


          }
         {
           this.props.options.showBtn?<button type="button"  onClick={this.clickAdd.bind(this)}>add</button>:''
         }
        
      </div>
    );
  }
}

export default Upload;
