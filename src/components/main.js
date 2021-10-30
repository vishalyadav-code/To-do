import React, { useState ,useEffect} from "react";
import Input from "./input";
import "./main.css";
import Button from "./Button";

const getLocalItems = ()=>{
    let list = localStorage.getItem('lists');
    // console.log(list);

    if(list){
        return JSON.parse(localStorage.getItem('lists'));
    }
    else{
        return [];
    }
}


const Main = () =>{

    const [word,setWord] = useState("");
    const [list,setlist] = useState(getLocalItems());
    const [showEditModal,setShowEditModal] = useState(false);
    const [edit,setEdit] = useState();

    const handleChange=(e)=>{
        setWord(e.target.value);//input.value
        // console.log(word);
    }

    const handleEditChange=(e)=>{
        setEdit(e.target.value);//input.value
        // console.log(edit);
    }
    
    const showList = ()=>{
        if(word.length>0){
        setlist((prevItems)=>{
            // console.log([...prevItems,word]);
            return [...prevItems,word]
        });
        
       }
       setWord("");
    }
    
    const [it,setIt] = useState();
    // const [text,setText] = useState("");
    const editOnOp = (item,index)=>{
        // e.preventDefault();
        setShowEditModal(true);
        setEdit(item);
        setIt(index);
        // return false;

    }

    const editOffOp = () =>{

      if(edit!==""){
         setlist((prevItems)=>{
           let newarr = []
           prevItems.filter((item,index)=>{
                 if(index===it){
                     newarr[it] = edit;
                 }
                 else{
                     newarr[index] = item;
                 }
               
           })
           console.log(newarr);
           console.log(prevItems);
           return newarr;
        });
        setShowEditModal(false);
      }
        
        setEdit("");
    }



    const deleteOp = (id)=>{
      setlist(prevItems=>{
          return prevItems.filter((item,index)=>{
               return index!==id
           })
        })

    }

    // const [showlineEdit , setShowLineEdit] = useState(true);
  
    const setLineThrough=(event)=>{
          event.target.classList.toggle("crossed-line");  
    }

    // setShowLineEdit=(e)=>{
    //     e.target.classList.toggle("show-pen");
    // }    
    
    useEffect(()=>{
        localStorage.setItem('lists',JSON.stringify(list));
    },[list])



    return(
        <>
        <div className="main">
        <h1>To-Do-List</h1> 
        <div className="btnList">
            <Input val = {word} change = {handleChange}/>
            <Button click = {showList} />
        </div>
        <div className="itemList">
            {
                
                list.map((item , index) =>{
                    return(
                        <div key={index} id={index} className="items">
            
                            <div  onClick={setLineThrough} className="text">{item}</div>
                            <div className="editDelete">
                                <div onClick={()=> editOnOp(item,index) }>
                                    <i className="fas fa-pen"></i>
                                </div>
                                <div onClick={()=>deleteOp(index)}>
                                    <i className="fas fa-minus-square"></i>
                                </div>
                            </div>
                            
                        </div>
                    )
                })

           }
       </div>

       {
            showEditModal?(
            <div className="editor">
            {/* <h1>{text}</h1> */}
             <div className="child">
                <textarea placeholder="Add a task..." className="can-edit" value = {edit} onChange={handleEditChange} cols="30" rows="3"></textarea>
                <button onClick = {()=>editOffOp()} className="btn2">Save</button>
             </div>
            </div>
          ):null
       }

       </div>
        </>
    )
}

export default Main;
