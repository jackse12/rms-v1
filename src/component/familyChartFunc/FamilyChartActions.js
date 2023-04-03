import React from "react";
import f3 from "family-chart"; // npm i family-chart
// import "./family-chart.css"; // create file 'family-chart.css' in same directory, copy/paste css from examples/create-tree
// import M from "materialize-css";
import { Form } from "./view/elements/Form.js"
import axios from 'axios';
import dataJson from './data.json';
import * as d3 from "d3";

import createStore from "./createStore";
import d3AnimationView from "./view/View.d3Animation";
import Modal from "@/component/modal";



export default class FamilyTree extends React.Component {

  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    this.contRef = React.createRef();
    this.handleF3 = this.handleF3.bind(this);
      // this.handleModal = this.handleModal.bind(this);
    this.state = {
      chartState: null,
      modalVisibility: "close",
    };
  }

  // contRef = React.createRef();

  componentDidMount() {
    if (!this.contRef.current) return;

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

    function initProcess() {
      const cont = document.querySelector("#chart")



      const card_dim = { w: 220, h: 70, text_x: 75, text_y: 15, img_w: 60, img_h: 60, img_x: 5, img_y: 5 }
      const card_display = cardDisplay();
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
        Card = f3.elements.Card({
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
          addRelative: f3.handlers.AddRelative({ store, cont, card_dim, cardEditForm, labels: { mother: 'Add mother' } }),
          mini_tree: true,
          link_break: false
        });

      view.setCard(Card);
      store.setOnUpdate((props) => view.update(props || {}));
      store.update.tree({ initial: true });
      console.log("store", store)
      // function data() {
      //   return [
      //     {
      //       id: "0",
      //       rels: {
      //         spouses: null,
      //         father: null,
      //         mother: null,
      //         children: null
      //       },
      //       data: {
      //         "first name": "Agnus",
      //         "last name": "",
      //         birthday: "1970",
      //         avatar:
      //           "https://static8.depositphotos.com/1009634/988/v/950/depositphotos_9883921-stock-illustration-no-user-profile-picture.jpg",
      //         gender: "M"
      //       }
      //     },

      //   ];
      // }

      function cardEditForm(props) {
        const postSubmit = props.postSubmit;
        props.postSubmit = (ps_props) => {
          postSubmit(ps_props)
          console.log("ps_props", postSubmit)
        }
        const el = document.querySelector('#form_modal')
        //   modal = M.Modal.getInstance(el),
        // const  edit = { el, open: () => modal.open(), close: () => modal.close() }
        const  edit = { el, open: () => {handleModal("open")}, close: () => handleModal("close") }
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
        // this.setState((prevState) => ({
        //   modalVisibility: visibility,
        // }));
      }
    

      const modal = document.body.appendChild(document.createElement("div"));
      modal.setAttribute("id", "form_modal");
      modal.setAttribute("class", "modal");
      // M.Modal.init(modal);



    }
  }

  handleF3() {
    const chartElement = document.getElementById('chart');

    // Get the chart instance from the element reference
    const chartInstance = chartElement.chartInstance;

    // Get the current data state of the chart
    // const dataState = chartInstance.getData();


  }

  


  render() {



    return (
      <div style={{ display: 'flex', justifyContent: 'flex-start', maxWidth: '100%', margin: 'auto' }}>

        <div className="row">
          {/* <div className="col s12 m9" ref={this.chartRef}> */}
          <div className="f3" id="chart" ref={this.contRef} style={{ position: 'relative' }}>
          </div>
          {/* </div> */}

        </div>
        <div id="form-data" className="modal">
        </div>
        {/* <div class="title-container"> */}
        <div className="title-app" >
          {/* <div class="title_app" style={{ position: "absolute", zIndex: 1000, color: "white", top: "10px" }}> */}
          <b> RAMIRO FAMILY TREE</b>

        </div>
        {/* </div> */}
        <div className=" absolute z-50 ">
          <Modal visibility={this.state.modalVisibility} />
        </div>
      </div>)
  }
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

function customAddBtnListener(store, props) {
  console.log(props.card)
  console.log(props.d)
}
