import "./App.css";
import {
  Button,
  FormControl,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { feeData } from "./data";

const Drop = () => {
  const [data, setData] = useState("");
  const [type, setType] = React.useState("");
  const[feeType, setFeeType] = useState('');
  const [country, setCountry] = React.useState("");
  const [course, setCourse] = useState("");
  const [degree, setDegree] = useState("");
  const [allDegree, setAllDegree] = useState('')
  const [allCourse, setAllCourse] = useState("");
  const [amount,setAmount] = useState(0)

  const handleDropType = (event) => {
    setType(event.target.value);
  };

  const handleCountry = (event) => {
    setCountry(event.target.value);
    getDegree(event.target.value);
  };


  const handleCourse = (event) => {
    setCourse(event.target.value);
  };

  const handleDegree = (event) => {
    setDegree(event.target.value);
    getAmount(event.target.value)
  };

  const handleReset =() => {
    setType('');
    setCountry('');
    setCourse('');
    setDegree('');
    setAmount(0)
  }

  const getType = () => {
      const t = Object.keys(feeData);
      setFeeType(t)
  }

  const getCountrys = () => {
    if (type === "Exam Fee") {
      const keys = Object.keys(feeData[type]);
      setData(keys);
    } else {
      const keys2 = Object.keys(feeData["Application Fee"]);
      setData(keys2);
    }
  };

  function setCourses() {
    if (
      (type === "Exam Fee" || type === "Application Fee") &&
      (country === "INDIAN" ||
        country === "FOREIGN" ||
        country === "NRI" ||
        country === "SAARC")
    ) {
      const cours = Object.keys(feeData[type][country]);
      setAllCourse(cours);
    } else {
      const cours = Object.keys(feeData["Exam Fee"].INDIAN);
      setAllCourse(cours);
    }
  }

  function getDegree(country) {

    const degrees = Object.keys(feeData[type][country].Medical);
    setAllDegree(degrees);
  }

  function getAmount(degree){
    const amount = feeData[type][country][course][degree].amount;
    setAmount(amount)
  }


  useEffect(() => {
    getCountrys();
    setCourses();
    getType()
  }, [type]);



  return (
    <div className="drop">
   <div className="drop-container">
      <div className="drop-type drop-bx">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Fee-Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            label="Fee-Type"
            onChange={handleDropType}
          >
            {/* <MenuItem value={"Exam Fee"}>Exam Fee</MenuItem>
            <MenuItem value={"Application Fee"}>Application Fee</MenuItem> */}
            
            {feeType &&
                feeType.map((item, index) => {
                  return (
                    <MenuItem value={item} key={index}>
                      {item}
                    </MenuItem>
                  );
                })}

          </Select>
        </FormControl>
      </div>
        <div className="drop-country drop-bx">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Country</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={country}
              label="Country"
              onChange={handleCountry}
            >
              {data &&
                data.map((item, index) => {
                  return (
                    <MenuItem value={item} key={index}>
                      {item}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </div>
        <div className="drop-course drop-bx">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">All-Courses</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={course}
              label="ALL-COURSES​"
              onChange={handleCourse}
            >
              {allCourse &&
                allCourse.map((item, index) => {
                  return (
                    <MenuItem value={item} key={index}>
                      {item}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </div>
        <div className="drop-course-type drop-bx">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Degree</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={degree}
              label="Degree"
              onChange={handleDegree}
            >
              {allDegree &&
                allDegree.length >0 && allDegree.map((item, index) => {
                  return (
                    <MenuItem value={item} key={index}>
                      {item}
                    </MenuItem>
                  )
                })}
            </Select>
          </FormControl>
        </div>
      </div>

      <div className="fee_amount" style={{margin : "20px 0px"}}>
         <h4 >Total Fee - {amount} ₹</h4>
         <Button variant="contained"  onClick={handleReset} className= "reset-btn">Reset</Button>
      </div>
    </div>
  );
};

export default Drop;
