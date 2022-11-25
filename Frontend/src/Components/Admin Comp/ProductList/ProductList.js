import React from "react";

import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import "./productList.css";
import { productRows } from "./productlistdata";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { userRequest } from "../../../publicrequest";
import { useSelector } from "react-redux";

export default function ProductList() {
  const [data, setData] = useState(productRows);
  const [loading, setloading] = useState(true);
  const { currentUser } = useSelector((state) => state.user);
  const sailerid = currentUser._id;
  const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
  const TOKEN = currentUser?.accessToken;

  useEffect(() => {
    async function fetchData() {
      const response = await userRequest.get(
        `/products/productbysailor/${sailerid}`,
        { headers: { token: `Bearer ${TOKEN}` } }
      );
      setData(response.data);
      setloading(false);
    }
    fetchData();
  }, [sailerid]);
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "stock", headerName: "Stock", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

if(loading){
  return <div>loading....</div>
}

  return (

    <div>
      <div className="productList" style={{ display: "flex", height: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
            padding: "0 50px",
          }}
        >
          <div style={{ height: "100vh", width: "100%" }}>
            <DataGrid
              rows={data}
              disableSelectionOnClick
              columns={columns}
              getRowId={(data) => data.internalId}
              // =pageSize={8}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
