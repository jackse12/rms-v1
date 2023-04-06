import CalculateTree from "./CalculateTree/CalculateTree.js"
import {createTreeDataWithMainNode} from "./handlers/newPerson.js"
import dataJson from './data.json';


export default function createStore(initial_state) {
  let onUpdate;
  const state = initial_state,
    update = {
      tree: (props) => {
        state.tree = calcTree();
        if (onUpdate) onUpdate(props)
      },
      mainId: main_id => state.main_id = main_id,
      data: data => state.data = data
    },
    getData = () => state.data,
    getTree = () => state.tree,
    setOnUpdate = (f) => onUpdate = f,
    methods = {}

  return {state, update, getData, getTree, setOnUpdate, methods}

  // async function submitForm (data){
  //   let res = await fetch("http://localhost:3000/api/services/familydata", {
  //     method: "POST",
  //     body: JSON.stringify(data),
  //   });
  //   res = await res.json();
   
  // };

  function calcTree() {
    // console.log("This is it",state.data)
    localStorage.setItem('treeData', JSON.stringify(state.data));
    // submitForm(state.data)
    return CalculateTree({
      data_stash: state.data, main_id: state.main_id,
      node_separation: state.node_separation, level_separation: state.level_separation
    })
  }
}