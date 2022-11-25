import { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import { userRequest } from "../../publicrequest";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;





const Bottom = styled.div`
  display: flex;
  justify-content: space-between;


`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
 
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;

`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;


  



const Cart = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [orders,setOrders]=useState();
    console.log(orders);
  useEffect(()=>{
 async function fetchData(){
   const res=await userRequest.get(`/cart/getorder/${currentUser._id}`);
   if(res){
     setOrders(res.data);
   }
 }
 fetchData();

  },[currentUser._id])

  
  return (
    <Container>
      <Navbar />
      
      <Wrapper>
        <Title>YOUR ORDERS</Title>
        <Top>
      
        </Top>
        <Bottom>
          <Info>
          {orders?
          orders.map((item)=>{
            return <div>
            {item.products.map((i)=>{
              return <div>
              <Product>
              <ProductDetail>
                <Image src={`http://localhost:5000/uploads/${i.title}.png`} />
                <Details>
                  <ProductName>
                    <b>Product:</b> {i.title}
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> {i._id}
                  </ProductId>
                  <ProductColor color={i.color} />
                  <ProductSize>
                    <b>Size:</b> {i.size}
                  </ProductSize>
                  <div>
                    Status : {item.status}
                  </div>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  Quantity :
                  <ProductAmount>{i.quantity}</ProductAmount>
                  
                </ProductAmountContainer>
                <ProductPrice><span>&#x20B9;</span> {item.amount}</ProductPrice>
              </PriceDetail>
            </Product>
            <Hr />
              </div>
            })}
           
            </div>
          })

          
          
          : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "50px",
                }}
              >
                <h3>Start Shopping</h3>
              </div>
            )}
        
       
          </Info>
         
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;