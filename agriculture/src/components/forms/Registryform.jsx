import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Snackbar from 'awesome-snackbar'
import { mappls as mappls1 } from 'mappls-web-maps'

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
  const [addressErr, setAddressErr] = useState('');
  const [propertyPIDErr, setPropertyPIdErr] = useState('');
  const [surveyErr, setSurveyErr] = useState('')
  const [priceErr, setPriceErr] = useState('')
  const [fileErr, setFileErr] = useState('')
  const [showMap, setShowMap] = useState('none');
  const [polygon, setPolygon] = useState('')
  const navigate = useNavigate()

  const styleMap = {
    width: '80%', height: '80vh', display: showMap, position: 'absolute', zIndex: '10', left: '10%', top: '20%'
  }
  var mapProps = null
  var mapObject;
  var mapplsClassObject = new mappls1();
  mapProps = { traffic: false, zoom: 4, geolocation: true, location: true, clickableIcons: true }
  function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  function calculatePolygonArea(vertices) {
    var totalArea = 0;

    // Convert latitude and longitude from degrees to radians
    function toRadians(lat, lng) {
      return {
        lat: degreesToRadians(lat),
        lng: degreesToRadians(lng)
      };
    }

    // Calculate area of a single triangle formed by three vertices
    function triangleArea(a, b, c) {
      var semiperimeter = (a + b + c) / 2;
      return Math.sqrt(semiperimeter * (semiperimeter - a) * (semiperimeter - b) * (semiperimeter - c));
    }

    // Iterate over each vertex and calculate triangle areas
    for (var i = 0; i < vertices.length - 2; i++) {
      var p1 = toRadians(vertices[0][0], vertices[0][1]);
      var p2 = toRadians(vertices[i + 1][0], vertices[i + 1][1]);
      var p3 = toRadians(vertices[i + 2][0], vertices[i + 2][1]);

      var side1 = Math.acos(Math.sin(p1.lat) * Math.sin(p2.lat) +
        Math.cos(p1.lat) * Math.cos(p2.lat) * Math.cos(p1.lng - p2.lng));

      var side2 = Math.acos(Math.sin(p2.lat) * Math.sin(p3.lat) +
        Math.cos(p2.lat) * Math.cos(p3.lat) * Math.cos(p2.lng - p3.lng));

      var side3 = Math.acos(Math.sin(p3.lat) * Math.sin(p1.lat) +
        Math.cos(p3.lat) * Math.cos(p1.lat) * Math.cos(p3.lng - p1.lng));

      var triangleAreaValue = triangleArea(side1, side2, side3);
      totalArea += triangleAreaValue;
    }

    // Return the total area
    return totalArea;
  }
  const handleMap = () => {
    setShowMap('inline-block')
    mapplsClassObject.initialize(token, () => {
      mapObject = mapplsClassObject.Map({ id: "map", properties: mapProps });
      //load map layers/components after map load, inside this callback (Recommended)
      mapObject.addListener('load', function () {
        let polygon1 = null
        var options = {
          fillColor: "red",
          lineGap: 10,
          strokeOpacity: 1.0,
          popupHtml: 'your land'
        }
        mappls.draw({
          map: mapObject,
          type: 'polygon',
          callback: draw_callback,
          options: options
        })


        function draw_callback(data) {
          polygon1 = data;
          setPolygon(data)
          polygon1.setEditable(true);
        }
      });

    });
  }
  const handleShowMap = async () => {
    let data = await fetch(`https://apis.mapmyindia.com/advancedmaps/v1/${token}/rev_geocode?&lng=${polygon.getPath("pgno0")[0][1][1]}&lat=${polygon.getPath("pgno0")[0][1][0]}&region=IND&lang=en`)
    data = await data.json()
    console.log(data)
    if (data.responseCode == 200) {
      console.log(data.results)
      setState(data.results[0].state)
      setDistrict(data.results[0].district)
      setAddress(data.results[0].formatted_address)
      console.log(polygon.getPath("pgno0")[0], Math.round(calculatePolygonArea(polygon.getPath("pgno0")[0]) * 1e12))
      setArea(Math.round(calculatePolygonArea(polygon.getPath("pgno0")[0]) * 1e12).toString())
      setShowMap('none')
    }

  }
  const handleSubmit = async () => {
    if (areaErr == '' && priceErr == '' && addressErr == '' && stateErr == '' && districtErr == '' && propertyPIDErr == '' && surveyErr == '' && fileErr == '' && area != '' && price != '' && address != '' && state != '' && district != '' && propertyid != '' && survey != '' && files.length != 0) {
      let formdata = new FormData()
      for (var item of files) {
        formdata.append('files', item)
      }
      formdata.append('data', JSON.stringify({ price, area, state, district, propertyid, survey , address}))
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
    }
    else {
      new Snackbar(`<i class="bi bi-exclamation-circle-fill"></i>&nbsp;&nbsp;&nbsp;Empty Fields`, {
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
  const handleAddress = (e) => {
    const temp = e.target.value.replace(/\s/g, '')
    setAddress(temp);
    if (address == '' && addressErr == '') {
      setAddressErr('Address not filled')
    }
    else {
      setAddressErr('')
    }
  }

  const handlePropertyPID = (e) => {
    const temp = e.target.value.replace(/\s/g, '')
    setPropertyId(temp);
    if (propertyid == '' && propertyPIDErr == '') {
      setPropertyPIdErr('Property PID not filled')
    }
    else {
      setPropertyPIdErr('')
    }
  }

  const handleSurvey = (e) => {
    const temp = e.target.value.replace(/\s/g, '')
    setSurvey(temp);
    if (survey == '' && surveyErr == '') {
      setSurveyErr('Survey not filled')
    }
    else {
      setSurveyErr('')
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
    else if (files.length == 0) {
      setFileErr('Files not filled')
    }
    else {
      setFileErr('')
    }
  }
  const handleFileDelete = (target) => {
    setFiles((current) =>
      current.filter((item, index) => index != target)
    )
  }
  const handleBlur = () => {
    if(files.length != 0){
      setFileErr('')
    }
  }


  return (
    <>
      <div>
        <div id="map" style={styleMap}>
          <button onClick={handleShowMap} className='btn'><i className='bi bi-check-lg' style={{ fontSize: '25px' }}></i></button>
        </div>
      </div>
      <div className="registration-form-container">
        <h2>Land Registration Form</h2>
        <div className="registration-form">
          <div className="form-group">
            <label htmlFor="area">Area:</label>
            <input
              type="text"
              id="area"
              placeholder="Enter area in (.sqft)"
              value={area}
              onChange={handleArea}
              className="form-control"
            />
            <p>{areaErr}</p>
          </div>
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input
              type="text"
              id="price"
              placeholder="Enter price"
              value={price}
              onChange={handlePrice}
              className="form-control"
            />
            <p>{priceErr}</p>
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              placeholder="Enter Address"
              value={address}
              onChange={handleAddress}
              className="form-control state"
            />
            <i className='bi bi-map' onClick={handleMap}></i>
            <p>{addressErr}</p>
          </div>
          <div className="form-group">
            <label htmlFor="state">State:</label>
            <input
              type="text"
              id="state"
              placeholder="Enter state"
              value={state}
              onChange={handleState}
              className="form-control"
            />
            <p>{stateErr}</p>
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
            <p>{districtErr}</p>
          </div>
          <div className="form-group">
            <label htmlFor="property">Property Number:</label>
            <input
              type="text"
              id="property"
              placeholder="Enter property number"
              value={propertyid}
              onChange={handlePropertyPID}
              className="form-control"
            />
            <p>{propertyPIDErr}</p>
          </div>
          <div className="form-group">
            <label htmlFor="survey">Survey Number:</label>
            <input
              type="text"
              id="survey"
              placeholder="Enter survey number"
              value={survey}
              onChange={handleSurvey}
              className="form-control"
            />
            <p>{surveyErr}</p>
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
              onBlur={handleBlur}
            />
            <p>{fileErr}</p>
          </div>
          <div className='display'>
            {files.map((item, index) => (
              <div key={index}>
                <img key={index} width={50} height={50} src={URL.createObjectURL(item)}></img>
                <i className='bi bi-trash' onClick={() => handleFileDelete(index)}></i>
              </div>
            )
            )}
          </div>
          <button onClick={handleSubmit} className="btn-submit">Register</button>
        </div>
      </div>
    </>
  );
};

export default LandRegistrationForm;