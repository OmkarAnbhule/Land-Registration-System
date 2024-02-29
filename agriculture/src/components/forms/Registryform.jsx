import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const LandRegistrationForm = () => {
  const [area, setArea] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [propertyid,setPropertyId] = useState('');
  const [survey,setSurvey] = useState('');
  const [files,setFiles] = useState([])
  const navigate = useNavigate()

  const handleSubmit = async(event) => {
    event.preventDefault();
    let formdata = new FormData()
    formdata.append('files',files)
    formdata.append('data',JSON.stringify({email:localStorage.getItem('id'),area,state,district,propertyid,survey}))
    // You can handle form submission here, for example, sending data to an API
    let result = await fetch('http://localhost:5000/add-land',{
      method:'post',
      body:formdata
    })
    result = await result.json()
    if(result.success == true){
      navigate('/')
    }
  };
  

  const handleFiles = (e) => {
    let validFiles =  Array.from(e.target.files)
    if(validFiles.length > 7){
      validFiles = validFiles.splice(0,7)
    }
    setFiles(prevFiles => [...prevFiles, ...validFiles]);
    if(files.length > 7){
      setFiles(Array.from(files.splice(0,7)))
    }
  }
  const handleFileDelete = (target) => {
    setFiles((current)=>
      current.filter((item,index)=> index != target)
    )
  }
  

  return (
    <div className="registration-form-container">
      <h2>Land Registration Form</h2>
      <form className="registration-form">
        <div className="form-group">
          <label htmlFor="area">Area:</label>
          <input
            type="text"
            id="area"
            placeholder="Enter area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="state">State:</label>
          <input
            type="text"
            id="state"
            placeholder="Enter state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="district">District:</label>
          <input
            type="text"
            id="district"
            placeholder="Enter district"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="property">Property Number:</label>
          <input
            type="text"
            id="property"
            placeholder="Enter property number"
            value={propertyid}
            onChange={(e) => setPropertyId(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="survey">Survey Number:</label>
          <input
            type="text"
            id="survey"
            placeholder="Enter survey number"
            value={survey}
            onChange={(e) => setSurvey(e.target.value)}
            className="form-control"
          />
        </div>
        <div className='form-group'>
          <label htmlFor='files'>Enter Documents:</label>
          <input
          type="file"
          id="files"
          onChange={handleFiles}
          multiple
          accept='image/*'
          style={{marginLeft:'10px'}}
          disabled={files.length >= 7 ? true : false}
          />
        </div>
        <div className='display'>
          {files.map((item,index)=>(
            <div>
            <img key={index} width={50} height={50} src={URL.createObjectURL(item)}></img>
            <i className='bi bi-trash' onClick={()=>handleFileDelete(index)}></i>
            </div>
            )
          )}
        </div>
        <button onClick={handleSubmit} className="btn-submit">Register</button>
      </form>
    </div>
  );
};

export default LandRegistrationForm;