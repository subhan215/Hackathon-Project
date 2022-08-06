import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useState , useEffect } from 'react';

const Dropdown = ({ label, value, options, onChange, Class }) => {
  const [iconName, setIconName] = useState(faAngleDown)
  const iconHandler = () => {
/*     styleHandler()
 */    if (iconName === faAngleDown) {
      setIconName(faAngleUp)
    } else {
      setIconName(faAngleDown)
    }

  }
  /* useEffect(() => {
    if (style === {
      border: "",
      borderRadius: ""
    }) {
      setStyle({
        border: "1px solid rgb(28, 58, 147)",
        borderRadius: "5px"
      })
    } else {
      setStyle({
        border: "",
        borderRadius: ""
      })
    }
  } ) */
  const [style, setStyle] = useState({
    border: "1px solid rgb(28, 58, 147)",
    borderRadius: "5px" , 
    paddingRight : "5px" , 
/*     paddingLeft : "5px" , 
 */    height : "32px"
  })
  /* const styleHandler = () => {
    if (style === {
      border: "",
      borderRadius: ""
    }) {
      setStyle({
        border: "1px solid rgb(28, 58, 147)",
        borderRadius: "5px"
      })
    } else {
      setStyle({
        border: "",
        borderRadius: ""
      })
    }
  } */
  return (<div className={Class}  >
    {<label >
      {label}
    </label>}
    <div style={style}>
      <select value={value} onChange={onChange} onClick={iconHandler}>
        {options.map((option) => (
          <option value={option.value} >{option.label}</option>
        ))}

      </select>
      <FontAwesomeIcon icon={iconName} />
    </div>
  </div>
  );
};


export default Dropdown;