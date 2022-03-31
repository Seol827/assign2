import React, {useEffect} from "react";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";
import { loadWordFB } from "./redux/modules/word";
import { useDispatch } from "react-redux";
import Add from "./Add";
import Main from "./Main";
import Modify from "./Modify";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadWordFB());
  }, []);

  return (
    <>
      <Header>
        <p>Developer's Dictionary</p>
      </Header>   

      <Switch>
        <Route exact path="/" component={Main}/> 
        <Route exact path="/add" component={Add}/>
        <Route exact path="/modify/:id" component={Modify}/>
      </Switch>
      
    </>
  );
}

export default App;


const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f4a9a8;
  padding: 5px;
  width : 100vw;

  position : fixed;
  top : 0;
  z-index : 0;

  p {
    font-weight: bolder;
    color: white;
    font-size: 25px;
  }

`;
