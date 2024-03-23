import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Snackbar from 'awesome-snackbar'
import { mappls as mappls1 } from 'mappls-web-maps'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const LandRegistrationForm = () => {
  const api = import.meta.env.VITE_API_URL;
  const token = import.meta.env.VITE_API_TOKEN
  const [area, setArea] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [address, setAddress] = useState('');
  const [propertyid, setPropertyId] = useState('');
  const [survey, setSurvey] = useState('');
  const [price, setPrice] = useState('');
  const [files, setFiles] = useState([])
  const [areaErr, setAreaErr] = useState('')
  const [stateErr, setStateErr] = useState('')
  const [districtErr, setDistrictErr] = useState('')
  const [surveyErr, setSurveyErr] = useState('')
  const [priceErr, setPriceErr] = useState('')
  const [fileErr, setFileErr] = useState('')
  const [showMap, setShowMap] = useState('inline-block');
  const [polygon , setPolygon] = useState('')
  const navigate = useNavigate()

  const styleMap = {
    width: '80%', height: '80vh', display: showMap, position: 'absolute', zIndex: '10', left: '10%', top: '15%'
  }
  var mapProps = null
  var mapObject;
  var mapplsClassObject = new mappls1();
  mapProps = { traffic: false, zoom: 4, geolocation: true, location: true, clickableIcons: true }

  useEffect(() => {
    mapplsClassObject.initialize(token, () => {
      mapObject = mapplsClassObject.Map({ id: "map", properties: mapProps });
      //load map layers/components after map load, inside this callback (Recommended)
      mapObject.addListener('load', function () {
        let polygon1 = null
        var options = {
          fillColor: "red",
          lineGap: 10,
          strokeOpacity: 1.0,
          popupHtml: `<button class="popup-btn" id="popup-btn"><i class="bi bi-check"></i></button>`
        }
        mappls.draw({
          map: mapObject,
          type: 'polygon',
          callback: draw_callback,
          options: options,
          onclick: handleShowMap
        })
        function draw_callback(data) {
          polygon1 = data;
          setPolygon(data)
          polygon1.setEditable(true);
          polygon1.on('click', 'pgon0', handleShowMap())
        }
      });

    });
  }, [])
  const handleShowMap = () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () =>setShowMap('none')
        },
        {
          label: 'No',
          onClick: () =>setShowMap('inline-block')
        }
      ]
    });
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    let formdata = new FormData()
    for (var item of files) {
      formdata.append('files', item)
    }
    formdata.append('data', JSON.stringify({ email: localStorage.getItem('id'), price, area, state, district, propertyid, survey }))
    // You can handle form submission here, for example, sending data to an API
    console.log(formdata, files)
    let result = await fetch(`${api}add-land`, {
      method: 'post',
      body: formdata
    })
    result = await result.json()
    if (result.success == true) {
      new Snackbar(`<i class="bi bi-check-circle-fill"></i>&nbsp;&nbsp;&nbsp;Land Registered Successful`, {
        position: 'bottom-center',
        style: {
          container: [
            ['background', 'rgb(130, 249, 103)'],
            ['border-radius', '5px'],
            ['height', '50px'],
            ['padding', '10px'],
            ['border-radius', '20px']
          ],
          message: [
            ['color', 'black'],
            ['font-size', '18px']
          ],
          bold: [
            ['font-weight', 'bold'],
          ],
          actionButton: [
            ['color', 'white'],
          ],
        }
      });
      navigate('/')
    }
    else {
      new Snackbar(`<i class="bi bi-exclamation-circle-fill"></i>&nbsp;&nbsp;&nbsp;Internal Server Error`, {
        position: 'bottom-center',
        style: {
          container: [
            ['background', 'rgb(246, 58, 93)'],
            ['border-radius', '5px'],
            ['height', '50px'],
            ['padding', '10px'],
            ['border-radius', '20px']
          ],
          message: [
            ['color', '#eee'],
            ['font-size', '18px']
          ],
          bold: [
            ['font-weight', 'bold'],
          ],
          actionButton: [
            ['color', 'white'],
          ],
        }
      });
    }
  };

  const handleArea = (e) => {
    const temp = e.target.value.replace(/\s/g, '')
    setArea(temp);
    if (area == '' && areaErr == '') {
      setAreaErr('Area not filled')
    }
    else {
      setAreaErr('')
    }
  }

  const handlePrice = (e) => {
    const temp = e.target.value.replace(/\s/g, '')
    setPrice(temp);
    if (price == '' && priceErr == '') {
      setPriceErr('Price not filled')
    }
    else {
      setPriceErr('')
    }
  }

  const handleState = (e) => {
    const temp = e.target.value.replace(/\s/g, '')
    setPrice(temp);
    if (price == '' && priceErr == '') {
      setPriceErr('Price not filled')
    }
    else {
      setPriceErr('')
    }
  }

  const handleDistrict = (e) => {
    const temp = e.target.value.replace(/\s/g, '')
    setDistrict(temp);
    if (district == '' && districtErr == '') {
      setDistrictErr('District not filled')
    }
    else {
      setDistrictErr('')
    }
  }

  const handleFiles = (e) => {
    let validFiles = Array.from(e.target.files)
    if (validFiles.length > 7) {
      validFiles = validFiles.splice(0, 7)
    }
    setFiles(prevFiles => [...prevFiles, ...validFiles]);
    if (files.length > 7) {
      setFiles(Array.from(files.splice(0, 7)))
    }
  }
  const handleFileDelete = (target) => {
    setFiles((current) =>
      current.filter((item, index) => index != target)
    )
  }


  return (
    <>
      <div>
        <div id="map" style={styleMap}></div>
      </div>
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
              onChange={handleArea}
              className="form-control"
            />
            <p>Error</p>
          </div>
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input
              type="text"
              id="price"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="form-control"
            />
            <p>Error</p>
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
            <p>Error</p>
          </div>
          <div className="form-group">
            <label htmlFor="district">District:</label>
            <input
              type="text"
              id="district"
              placeholder="Enter district"
              value={district}
              onChange={handleDistrict}
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
              style={{ marginLeft: '10px' }}
              disabled={files.length >= 7 ? true : false}
            />
          </div>
          <div className='display'>
            {files.map((item, index) => (
              <div>
                <img key={index} width={50} height={50} src={URL.createObjectURL(item)}></img>
                <i className='bi bi-trash' onClick={() => handleFileDelete(index)}></i>
              </div>
            )
            )}
          </div>
          <button onClick={handleSubmit} className="btn-submit">Register</button>
        </form>
      </div>
    </>
  );
};

export default LandRegistrationForm;