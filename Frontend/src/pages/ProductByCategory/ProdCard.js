import React from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';

const CardCon = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 50px;
  margin-bottom: 20px;
  width: 220px;
  height: auto;
  border: solid 1px grey;
  img {
    width: 100%;
    height: 100%;
  }
`;

function ProdCard({i}) {
  //const img=`http://localhost:5000/${i.img}`
 // console.log(img);
  const url=`/product/${i._id}`
  return (
    <div>
    <Link style={{ textDecoration: "none" ,color:"black" }} to={url}>
    <CardCon>
            <img
              src={i.img}
              alt=""
            />
            <div>
              <p style={{ fontWeight: "600", paddingLeft: "10px" }}>
                {i.title}
              </p>
            </div>
            <div style={{ paddingLeft: "10px" }}>
              <p>Rs {i.price}</p>
            </div>
          </CardCon>
    </Link>
          
    </div>
  )
}

export default ProdCard