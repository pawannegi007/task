import React from "react";
import {API} from "../globles/config"
import {imageData} from "../services/imageData";

 export default class ImageUpload  extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          imageList:[],
          uploadImageArr:[]
        }
    }

    componentDidMount = ()=>{
      this.handleImageGetList();
    }

    handleImageGetList = async()=>{
      await imageData.imageGetList().then((response)=>{
        this.setState({imageList:response})
      })
    }

      handleOnChange = (event) =>{
        event.preventDefault();
        this.setState({uploadImageArr : event.target.files})
     }

     handleSubmit = (event) =>{
      event.preventDefault();
      let imageArr = [];
      imageArr = this.state.uploadImageArr;

      let formData = new FormData();
        for (const image of imageArr) {
          formData.append("Image",image)
          }
        imageData.imageUplaod(formData).then((response)=>{
          this.state.uploadImageArr = [];
          alert(response)
          this.handleImageGetList();
        })
     }

    render(){
      
        return(<div className="container">
        <div className="row">
          <div className="col-lg-4">
          <h1>Image Uploader</h1>
          <div className="card" style={{width:"18rem"}}>
          <div className="card-body">
          <h5 className="card-title">Image Upload</h5>
         <form>
              <div className="custom-file">
          <input type="file" onChange={this.handleOnChange} accept="image/*" className="custom-file-input" id="images" multiple/>
          <label className="custom-file-label" htmlFor="images">Choose file</label>
            </div>
            <button type="button" onClick={this.handleSubmit}>Upload</button>
        </form>
 

  </div>
</div>
          </div>
          <div className="row">
<div className="col">
<div className="card" style={{width:"18rem"}}>
<div className="card-body">
<h5 className="card-title">Image gallry</h5>
{this.state.imageList ? this.state.imageList.map((data)=>(
  (data.Image.map((image,index)=>(<img key={index} scr={API+image} alt={image} />))) 
)) :("")}

 

</div>

</div>

</div>
          </div>
        </div>
      </div>)
    }
}
