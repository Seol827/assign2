import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { addWordFB } from "./redux/modules/word";
import { useDispatch } from "react-redux";
//import { useState } from "react";

const Add = () => {
  const engWrd = React.useRef(null);
  const mean = React.useRef(null);
  const example = React.useRef(null);

  const dispatch = useDispatch();
  const history = useHistory();

  const addWordList = () => {

    //삼항연산자는 왜 안 되는 걸까요? alert 이후 dispatch도 실행이 됩니다!
    if(engWrd.current.value === "" || mean.current.value === "" || example.current.value === ""){
        alert('Add your Word, plz')
    } else {
        dispatch(
            addWordFB({
              eng: engWrd.current.value,
              mean: mean.current.value,
              example: example.current.value,
              time : Date.now(),
            })
          );
          history.push("/");
    }
  };

  return (
    <Back>
      <Container>
        <h2>My Word</h2>
        <input type="text" ref={engWrd} placeholder="Word" maxLength={10}/>
        <input type="text" ref={mean} placeholder="Word meaning" maxLength={35}/>
        <input type="text" ref={example} placeholder="Word example" maxLength={35} />
        <button onClick={addWordList}>Save</button>
        <button
          onClick={() => {
            history.goBack();
          }}
        >
          Cancel
        </button>
      </Container>
    </Back>
  );
};

export default Add;

const Back = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height : 100vh;  
`;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 650px;
  background-color : #FBC6A4;
  border-radius : 10px;
  margin-top : 150px;

  h2{
    color : white;
    font-weight : bolder;
    margin-bottom : 70px;
  }

  input {
    width : 300px;
    border : none;
    padding : 15px;
    border-radius : 5px;
    margin-bottom : 10px;
  }

  input:focus {
      outline : none;
  }

  button {
    all: unset;
    margin-top: 18px;
    text-decoration: none;
    color: white !important;
    font-weight: bolder;
    padding: 10px 60px;
    background-color: silver;
    border-radius: 10px;
    width : 60px;
    text-align : center;
  }

  button:hover {
      cursor : pointer;
      background-color : tomato;
  }
`;
