import "./newProduct.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import { useState } from "react";
import app from '../../firebase'
import {useDispatch} from "react-redux"
import {addProduct} from '../../redux/apiCalls'
// from firebase
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"


export default function NewProduct() {
  //using dispatch

  const dispatch = useDispatch()

  //using useState hook to handle our inputs

  const [inputs , setInputs] = useState({})

  //creating anther useState for our file or img

  const [file , setFile] = useState(null)

  //create another useState for categories

  const [cat ,setCat] = useState([])

  // defing our onChange and onClick function

  const handleChange=(e)=>{
         setInputs(prev=>{
          return {...prev ,[e.target.name]: e.target.value}
         })
  }

  const handleCat =(e)=>{
    //as category contains an array we neeed to split each item
    setCat(e.target.value.split(","))
  }

// onClick for sending our data to our Db

  const handleClick =(e)=>{
    e.preventDefault()

    //giving fileName a name so it will not overwrite other files

    const fileName = new Date().getTime() + file.name

    // getStorage is a firebase import and we getting app from our firebase app that we made

    const storage = getStorage(app)

    const storageRef = ref(storage , fileName)

    const uploadTask = uploadBytesResumable(storageRef, file);

    // pick the below from firebase docs

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
        default:
      }
  }, (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      // we created the contant to send the product to our db
     const product = {...inputs, img:downloadURL , categories : cat};
    // calling addProduct from our apiCalls
     addProduct(product , dispatch)
    });
  }
);
}
  
  return (
    <> 

    <Topbar/>
    <div style={{display:" flex",marginTop:"10px"}} >
     <Sidebar/>  
     <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          {/* // we are directly settingState for file and we have written [0] for just we want to take only one file at a time */}
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            name="title"
            type="text"
            placeholder="Apple Airpods"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            name="desc"
            type="text"
            placeholder="description..."
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            name="price"
            type="number"
            placeholder="100"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input type="text" placeholder="jeans,skirts" onChange={handleCat} />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button onClick={handleClick} className="addProductButton">
          Create
        </button>
      </form>
    </div>
    </div>
    </>
  );
}
