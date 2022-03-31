import React from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { updateWordFB } from "./redux/modules/word";
import { useDispatch, useSelector } from "react-redux";

const Modify = (state) => {

    const params = useParams();
    const list = useSelector((state) => state.word.list);
    
    const dispatch = useDispatch();
    
    const list_eng = list[params.id].eng;
    const list_mean = list[params.id].mean;
    const list_example = list[params.id].example;
    const history = useHistory();
    

    const newEng = React.useRef(null);
    const newMean = React.useRef(null);
    const newExample = React.useRef(null);

    const updateWord = () => {
        dispatch(
            updateWordFB({
                eng: newEng.current.value,
                mean: newMean.current.value,
                example: newExample.current.value,
                time: list[params.id].time,
            }, list[params.id].id)
        );
        history.push("/");
    }

    return(
        <Back>
        <Container>
          <h2>Word Edit</h2>
          <input type="text" defaultValue={list_eng} ref={newEng}/> 
          <input type="text" defaultValue={list_mean} ref={newMean}/>
          <input type="text"  defaultValue={list_example} ref={newExample}/>
          <button onClick={updateWord}>Save</button>
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
}

export default Modify;

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