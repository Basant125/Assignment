import "./App.css";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { feeData } from "./data";

const Drop = () => {
  const [data, setData] = useState("");
  const [type, setType] = React.useState("");
  const [feeType, setFeeType] = useState("");
  const [country, setCountry] = React.useState("");
  const [course, setCourse] = useState("");
  const [degree, setDegree] = useState("");
  const [allDegree, setAllDegree] = useState("");
  const [allCourse, setAllCourse] = useState("");
  const [amount, setAmount] = useState(0);

  const handleDropType = (event) => {
    setType(event.target.value);
    setCountry("");
    setData('')
    setAllCourse('')
    setCourse("");
    setDegree("");
    setAllDegree('')
    setAmount(0);
  };

  const handleCountry = (event) => {
    setCountry(event.target.value);
    setDegree("");
    setAllDegree('')
    setCourse("");
    setAllCourse('')
  };

  const handleCourse = (event) => {
    setCourse(event.target.value);
  };

  const handleDegree = (event) => {
    setDegree(event.target.value);
  };

  const handleReset = () => {
    setType("");
    setCountry("");
    setData('')
    setCourse("");
    setAllCourse('')
    setDegree("");
    setAllDegree('')
    setAmount(0);
  };

  const getType = () => {
    const t = Object.keys(feeData);
    setFeeType(t);
  };

  const getCountrys = () => {
    if (type) {
      const keys = Object.keys(feeData[type]);
      setData(keys);
    }
  };

  function setCourses() {
    if (type && country) {
      const cours = Object.keys(feeData[type][country]);
      setAllCourse(cours);
    }
  }

  function getDegree() {
    if (type && country && course) {
      const degrees = Object.keys(feeData[type][country][course]);
      setAllDegree(degrees);
    }
  }

  function getAmount() {
    if (type && country && course && degree) {
      const amount = feeData[type][country][course][degree].amount;
      setAmount(amount);
    }
  }

  useEffect(() => {
    getCountrys();
    setCourses();
    getType();
    getDegree();
    getAmount();
  }, [type, course, country, degree]);

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
              {data.length > 0 ? (
                data.map((item, index) => {
                  return (
                    <MenuItem value={item} key={index}>
                      {item}
                    </MenuItem>
                  );
                })
              ) : (
                <span>please select above options</span>
              )}
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
              label="All-Courses​"
              onChange={handleCourse}
            >
              {allCourse.length > 0 ? (
                allCourse.map((item, index) => {
                  return (
                    <MenuItem value={item} key={index}>
                      {item}
                    </MenuItem>
                  );
                })
              ) : (
                <span>please select above two options</span>
              )}
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
              {allDegree.length > 0 ? (
                allDegree.map((item, index) => {
                  return (
                    <MenuItem value={item} key={index}>
                      {item}
                    </MenuItem>
                  );
                })
              ) : (
                <span>please select above three options</span>
              )}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="fee_amount" style={{ margin: "20px 0px" }}>
        <h4>Total Fee - {amount} ₹</h4>
        <Button variant="contained" onClick={handleReset} className="reset-btn">
          Reset
        </Button>
      </div>
    </div>
  );
};

export default Drop;
