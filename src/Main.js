import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faEraser } from "@fortawesome/free-solid-svg-icons";
import { deleteWordFB } from "./redux/modules/word";


const Main = () => {
  const list = useSelector((state) => state.word.list); 

  const history = useHistory();
  const dispatch = useDispatch();


  return (
    <Back>
      <Btn>
        <button
          onClick={() => {
            history.push("/add");
          }}
        >
          Add
        </button>
      </Btn>
      <CardBack >
        { 
        list && list.map((list, i) => {
          return (
            <Card key={i}>
              <div>
                {list.eng}
                <span>
                  <FontAwesomeIcon
                    icon={faEraser}
                    className="icon"
                    onClick={() => {
                      history.push(`/modify/${i}`);
                    }}
                  />
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    className="icon"
                    style={{ marginLeft: "8px" }}
                    onClick={()=>{
                        dispatch(deleteWordFB(list.id));
                        history.push("/");
                    }}
                  />
                </span>
              </div>
              <div style={{ color: "#534340" }}>{list.mean}</div>
              <div style={{ color: "#5463FF" }}>{list.example}</div>
            </Card>
          );
        })}
      </CardBack>
      <div></div>
    </Back>
  );

}
export default Main;

const Back = styled.div`
  max-width: 1300px;
  min-width: 300px;
  margin: 100px auto;
`;

const Btn = styled.div`
  height: 15px;
  display: flex;
  justify-content: flex-end;

  button {
    all: unset;
    text-decoration: none;
    text-align: center;
    color: white;
    font-weight: 700;
    width: 60px;
    height: 60px;
    background-color: silver;
    border-radius: 50%;

    position: fixed;
    z-index: 0;
  }

  button:hover {
    cursor: pointer;
    color: tomato;
  }
`;

const CardBack = styled.div`
  margin-top: 50px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
`;

const Card = styled.div`
  display : flex;
  flex-direction : column;
  width : 300px;
  height 200px;
  margin : 20px;
  background-color : #97BFB4;
  border-radius : 10px;
  box-sizing : border-box;
  padding : 10px;

    div {
        margin : 10px;
        font-weight : 600;
        font-size : 15px;
    }

    div:first-child {
        color : #F3E9DD;
        font-size : 20px;
        font-weight : bolder!important;
        display : flex;
        justify-content : space-between;
    }

    .icon {
        color : black!important;
        font-size : 16px;
    }

    .icon:hover {
        cursor : pointer;
    }
`;


