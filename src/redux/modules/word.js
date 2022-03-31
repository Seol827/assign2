// word.js
import { db } from "../../firebase";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";


// 1. Actions
const LOAD = 'word/LOAD';
const CREATE = 'word/CREATE';
const UPDATE = 'word/UPDATE';
const DELETE = 'word/DELETE';



//초기값 지정
const initialState = {
    list : [],
}



//2. Action Creators
//LOAD
export function loadWord(word_list) {
    return {
        type: LOAD, word_list,
    };
}

//CREATE
export function createWord(word) {
    return {
        type: CREATE,    
        word: word 
    };
}

//UPDATE
export function updateWord(word) {
    return {
        type : UPDATE,
        word : word
    }
}

//DELETE
export function deleteWord(word_index) {
    return { 
        type: DELETE,
        word_index : word_index
    }
}



// 3. middlewares (redux thunk - 객체가 아닌 함수를 생성)
//LOAD
export const loadWordFB = () => {
    return async function (dispatch) {   //async : 비동기 처리

        const word_data = await getDocs(collection(db, "word")); 

        let word_list_bf = [];
        
        word_data.forEach((w)=>{
            word_list_bf.push({ id: w.id, ...w.data() });
        });

        const word_list =  word_list_bf.sort((a, b)=>
            a.time < b.time ? -1 : a.time > b.time ? 1 : 0
        );


        dispatch(loadWord(word_list));
    };
};


//Add
export const addWordFB = (word) => {
    return async function (dispatch) {
       const docRef = await addDoc(collection(db, "word"), word);
       const word_data = { id : docRef.id, ...word} ;

       dispatch(createWord(word_data));
    };
};


//UPDATE
export const updateWordFB = (word, real_id) => {
    return async function (dispatch) {
        const docRef = doc(db, "word", real_id);
        await updateDoc(docRef, word);

        const new_word = {...word, real_id}

        dispatch(updateWord(new_word));
    }
}


//DELETE
export const deleteWordFB = (real_id) => {
    return async function (dispatch, getState){
        const docRef = doc(db, "word", real_id);
        await deleteDoc(docRef);
        const _word_list = getState().word.list;
        const word_index = _word_list.findIndex((b)=>{
            return b.id === real_id;
        });

        dispatch(deleteWord(word_index));
    }
}


// 4. Reducer
export default function reducer(state = initialState, action = {}) {

    switch (action.type) {

        case "word/LOAD": {
            return {
                list:action.word_list,
            };
        }

        case "word/CREATE":{
            const new_word = [...state.list, action.word];
            return {
                list: new_word
            }
        }

        case "word/UPDATE":{
            let update_word = state.list.map((word) =>
            word.id === action.word.real_id? {...word, ...action.word} : word);
            return {
                list : update_word
            }
        }

        case "word/DELETE":{
            const new_word_list = state.list.filter((_, idx) => {
                return parseInt(action.word_index) !== idx;
            });
            return {
                list : new_word_list
            };
        }

    default: return state;
    }
}