import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import React, { useRef } from "react";
import { filterPosts } from "../redux/actions/postActions";

const mouse = "Chuột Hamster";
const myMap = {
  "Hà nội": "Hà nội",
  "Bắc Ninh": "Bắc Ninh",
  Chó: "Chó",
  Mèo: "Mèo",
  [mouse]: "Chuột Hamster",
  Gà: "Gà",
  Chim: "Chim",
  Khác: "Khác",
  "0-12": "0",
  "12-36": "13",
  "lớn hơn 36": "37",
  Đực: "Đực",
  Cái: "Cái",
  "2kg": "2kg",
  "4kg": "4kg",
  "đã tiêm": 1,
  "chưa tiêm": 0,
};

const FilterForm = ({ category, updateParams }) => {
  const { title, data, name } = category;
  const { displayText, filterVals } = data;
  const handleChange = (event) => {
    let name = event.target.name;
    let value = myMap[event.target.value];

    updateParams({
      [name]: value,
    });
  };

  return (
    <FormControl>
      <FormLabel>{title}</FormLabel>
      <Select key={title} name={name} onChange={(value) => handleChange(value)}>
        {displayText.length > 0 &&
          displayText.map((option, index) => {
            {
              return (
                <option key={option} value={option}>
                  {option}
                </option>
              );
            }
          })}
      </Select>
    </FormControl>
  );
};

export default FilterForm;
