import React, { useEffect, useRef, useState } from "react";
import f3 from "family-chart";
import { Form } from "./view/elements/Form.js"
import axios from 'axios';
import dataJson from './data.json';
import * as d3 from "d3";

import createStore from "./createStore";
import handlers from "./handlers.js";
import {Card as NewCard} from "./view/elements/Card.js";
import d3AnimationView from "./view/View.d3Animation";
import Modal from "@/component/modal";
import { AddRelative } from "./handlers.js";


function customAddBtnListener(store, props) {
  console.log(props.card)
  console.log(props.d)
}

function FeatureFunc() {
  const contRef = useRef(null);
  const [modalVisibility, setModalVisibility] = useState("close")
  const handleF3 = function() {
    const chartElement = document.getElementById('chart');

    // Get the chart instance from the element reference
    const chartInstance = chartElement.chartInstance;
  }.bind(this);

  useEffect(() => {
    if (!contRef.current) return;


    let dataTree = dataJson
    let localTree = localStorage.getItem('treeData')
    if (localTree === null) {

      console.log("NOt retain")
      localStorage.setItem('treeData', JSON.stringify(dataJson));
    } else {
      console.log("reteain")
      dataTree = localStorage.getItem('treeData');
      dataTree = JSON.parse(dataTree)
    }

    initProcess()

  }, [])


  function initProcess() {
    let dataTree = dataJson
    const cont = document.querySelector("#chart")

    const card_dim = { w: 220, h: 70, text_x: 75, text_y: 15, img_w: 60, img_h: 60, img_x: 5, img_y: 5 }

    const card_edit = cardEditParams();
    // const store = f3.createStore({
    const store = createStore({
      data: dataTree,
      card_display: [d => d.data.label || '', d => d.data.desc || ''],
      mini_tree: true,
      hide_rels: true,
      node_separation: 250,
      level_separation: 150,
      custom_elements: [{ el: customAddBtn(card_dim), lis: customAddBtnListener, query: ".customAddBtn" }],
      card_dim
    }),
      view = d3AnimationView({
        // view = f3.d3AnimationView({
        store,
        cont: document.querySelector("#chart"),
        card_edit
      }),
      Card = NewCard({
        store,
        svg: view.svg,
        card_dim: {
          w: 220,
          h: 70,
          text_x: 75,
          text_y: 15,
          img_w: 60,
          img_h: 60,
          img_x: 5,
          img_y: 5
        },
        card_display: [
          (d) => `${d.data["first name"] || ""} ${d.data["last name"] || ""}`,
          (d) => `${d.data["birthday"] || ""}`
        ],
        cardEditForm,
        addRelative: AddRelative({ store, cont, card_dim, cardEditForm, labels: { mother: 'Add mother' } }),
        mini_tree: true,
        link_break: false
      });

    view.setCard(Card);
    store.setOnUpdate((props) => view.update(props || {}));
    store.update.tree({ initial: true });



    const modal = document.body.appendChild(document.createElement("div"));
    modal.setAttribute("id", "form_modal");
    modal.setAttribute("class", "modal");
    // M.Modal.init(modal);

    
    handleF3()


  }

  function cardEditForm(props) {
    const card_edit = cardEditParams();
    const card_display = cardDisplay();
    const postSubmit = props.postSubmit;
    props.postSubmit = (ps_props) => {
      postSubmit(ps_props)
      console.log("ps_props", postSubmit)
    }
    const el = document.querySelector('#form_modal')
    //   modal = M.Modal.getInstance(el),
    // const  edit = { el, open: () => modal.open(), close: () => modal.close() }
    const edit = { el, open: () => { handleModal("open") }, close: () => handleModal("close") }
    Form({ ...props, card_edit, card_display, edit })
  }

  function cardDisplay() {
    const d1 = d => `${d.data['first name'] || ''} ${d.data['last name'] || ''}`,
      d2 = d => `${d.data['birthday'] || ''}`
    d1.create_form = "{first name} {last name}"
    d2.create_form = "{birthday}"

    return [d1, d2]
  }


  function cardEditParams() {
    return [
      { type: 'text', placeholder: 'first name', key: 'first name' },
      { type: 'text', placeholder: 'last name', key: 'last name' },
      { type: 'text', placeholder: 'birthday', key: 'birthday' },
      { type: 'text', placeholder: 'avatar', key: 'avatar' }
    ]
  }

  function handleModal(visibility) {
    console.log(visibility)
    setModalVisibility(visibility)
  }

 

  function customAddBtn(card_dim) {
    return (`
        <g class="customAddBtn" style="cursor: pointer">
          <g transform="translate(${card_dim.w - 12},${card_dim.h - 12})scale(.08)">
            <circle r="100" fill="#fff" />
            <g transform="translate(-50,-45)">
              <line
                x1="10" x2="90" y1="50" y2="50"
                stroke="currentColor" stroke-width="20" stroke-linecap="round"
              />
              <line
                x1="50" x2="50" y1="10" y2="90"
                stroke="currentColor" stroke-width="20" stroke-linecap="round"
              />
            </g>
          </g>
        </g>
      `)
  }











  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start', maxWidth: '100%', margin: 'auto' }}>

      <div className="row">
        <div className="f3" id="chart" ref={contRef} style={{ position: 'absolute' }}>
        </div>  
        
        {/* <div className="f3" id="chart" ref={contRef} style={{ position: 'relative' }}>
        </div> */}

      </div>
      <div id="form-data" className="modal">
      </div>
      <div className="title-app" >
        <b> RAMIRO FAMILY TREE</b>

      </div>
      {/* </div> */}
      <div className=" absolute z-50 ">
        <Modal visibility={modalVisibility}  onClose={()=>{handleModal("close")}} />
      </div>
    </div>
  )
}

export default FeatureFunc