import React from "react";
import { FaStar } from "react-icons/fa";
import { useState,useEffect } from "react";
import { userRequest } from "../../publicrequest";
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  stars: {
    display: "flex",
    flexDirection: "row",
  },
};
const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

function Review({ userid, productId, isSailer }) {
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  
  const stars = Array(5).fill(0);

useEffect(()=>{
async function fetchData(){
    const rate = await userRequest.get(`/users/getrating/${userid}/${productId}`);
        setCurrentValue(rate.data);
        console.log(rate.data);
       
}
fetchData();

},[])

  const handleClick = async (value) => {

    if (userid && isSailer === false) {
      setCurrentValue(value);
      if(currentValue>0){
        setCurrentValue(currentValue)
        alert("already have review")
      }
      else{
        const res = await userRequest.post("/users/registerrating", {
          userid: userid,
          productid: productId,
          rating: hoverValue,
        });
        console.log(res.data);
      }
      
    }
    
    
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  return (
    <div>
      <div style={styles.stars}>
        {stars.map((_, index) => {
          return (
            <FaStar
              key={index}
              size={24}
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
              color={
                (hoverValue || currentValue) > index
                  ? colors.orange
                  : colors.grey
              }
              style={{
                marginRight: 10,
                cursor: "pointer",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Review;
