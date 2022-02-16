import { render } from "@testing-library/react";
import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import "./index.css";
import drone from "./drone.jpg";
import star from "./star.png";
import expo from "./marchexpo.png";
import clock from "./clock.png";
import envelope from "./envelope.png";
import info from "./info.png";
import ok from "./ok.png";
import { ReactComponent as Mcard } from "./mcard.svg";
import { ReactComponent as Secure } from "./Secure.svg";
import { ReactComponent as Visa } from "./visa.svg";
import { ReactComponent as Appay } from "./appay.svg";
import ReactTooltip from "react-tooltip";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      HD: 0,
      QHD: 0,
      Bat: 0,
      tHD: 0,
    };
    this.HDref = React.createRef();

    this.changeHD = this.changeHD.bind(this);
    this.changeQHD = this.changeQHD.bind(this);
    this.changeBat = this.changeBat.bind(this);
  }

  componentDidMount() {
    fetch("https://fe-assignment.vaimo.net/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          isLoaded: true,
          items: data,
          HD: 0,
          QHD: 0,
          Bat: 0,
          tHD: 0,
        });
      });
  }

  
  

  blurHD = (e) => {
    let temp = this.state.HD;
    let o = 0;
    o = parseInt(e.target.value);
    console.log(o);
    if (o < 0 || o === "" || o == NaN) {
      this.setState({ HD: temp });
    } else {
      this.setState({ HD: o });
    }
  };

  changeHD = (e) => {
    let temp = this.state.HD;
    let o = 0;
    o = parseInt(e.target.value);
    console.log(o);
    if (o < 0 || o === "" || o == NaN) {
      this.setState({ HD: temp });
      this.setState({[e.target.value]: temp});
      e.target.value = temp;
      this.setState({tHD : temp})
    } else {
      this.setState({ HD: o });
      this.setState({tHD: o})
    }
  };

  changeQHD = (e) => {
    let temp = this.state.QHD;
    let o = 0;
    o = parseInt(e.target.value);
    console.log(o);
    if (o < 0 || o === "" || o == NaN) {
      this.setState({ QHD: temp });
    } else {
      this.setState({ QHD: o });
    }
  };

  changeBat = (e) => {
    let temp = this.state.Bat;
    let o = 0;
    o = parseInt(e.target.value);
    console.log(o);
    if (o < 0 || o === "" || o == NaN) {
      this.setState({ Bat: temp });
      
    } else {
      this.setState({ Bat: o });
    }
  };

  increaseHD = () => {
    this.setState({
      HD: this.state.HD + 1,
      tHD: this.state.HD + 1,
    });
  };
  decreaseHD = () => {
    let i = 0;
    i = this.state.HD;
    if (i == 0) {
    } else {
      this.setState({
        HD: this.state.HD - 1,
        tHD: this.state.HD,
      });
    }
  };
  increaseQHD = () => {
    this.setState({
      QHD: this.state.QHD + 1,
    });
  };
  decreaseQHD = () => {
    let i = 0;
    i = this.state.QHD;
    if (i == 0) {
    } else {
      this.setState({
        QHD: this.state.QHD - 1,
      });
    }
  };
  increaseB = () => {
    this.setState({
      Bat: this.state.Bat + 1,
    });
  };
  decreaseB = () => {
    let i = 0;
    i = this.state.Bat;
    if (i == 0) {
    } else {
      this.setState({
        Bat: this.state.Bat - 1,
      });
    }
  };

  render() {
    let content = null;
    let rating = 0;
    let lprice = null;
    var { isLoaded, items } = this.state;
    if (!isLoaded) {
      return <div>Loading..</div>;
    } else {
      console.log(items);
      if (items) {
        content = (
          <div class="flex-main-title">
            <div className="taggroup">
              <div className="rdyship">Ready to Ship</div>
              <div className="instock">
                <img className="ok" src={ok} alt={ok}></img>
                In Stock
              </div>
              <div className="fst-dispatch">
                <img className="ok" src={ok} alt={ok}></img>
                Fast Dispatch
              </div>
            </div>
            <h1 className="headtitle">
              {items.product.name}
              <div className="flexbox-item-tag">{items.product.tags}</div>
            </h1>
          </div>
        );
      }

      rating = items.product.reviews.rating;
      let starcon = null;
      let x = Math.floor(rating);
      let revcon = null;
      let buyercon = null;
      let olprice = null;
      let HDprice = null;
      let QHDprice = null;
      let Batprice = null;
      let shiptext = null;
      let shipval = null;
      let date = null;
      let time = null;
      let curdate = null;
      let imgUrl = null;
      imgUrl = items.product.gallery["0"].main;
      curdate = { currentTime: new Date().toLocaleString() };
      date = items.product.discount.end_date; //2022-02-19T06:16:04+01:00
      time = new Date(date);
      console.log(curdate)
      console.log(time);
      shiptext =
        "Ship to  " +
        items.product.shipping.method.country +
        "  by  " +
        items.product.shipping.method.title;
      shipval =
        items.product.shipping.method.cost.currency.symbol +
        "  " +
        parseFloat(items.product.shipping.method.cost.value)
          .toFixed(2)
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "6,");

      HDprice =
        items.product.options["1080p"].price.currency.symbol +
        "  " +
        items.product.options["1080p"].price.value;
      Batprice =
        items.product.options.battery_accessories.price.currency.symbol +
        "  " +
        items.product.options.battery_accessories.price.value;
      QHDprice =
        items.product.options["4k"].price.currency.symbol +
        "  " +
        items.product.options["4k"].price.value;

      lprice =
        items.product.options.battery_accessories.price.currency.symbol +
        "  " +
        items.product.options.battery_accessories.old_price.value +
        "  -  " +
        items.product.options.battery_accessories.price.currency.symbol +
        "  " +
        items.product.options["4k"].old_price.value;
      revcon = items.product.reviews.count + "     reviews";
      buyercon = items.product.reviews.total_buyers + "        buyers";
      olprice =
        items.product.options.battery_accessories.price.currency.symbol +
        "  " +
        items.product.options.battery_accessories.price.value +
        "  -  " +
        items.product.options.battery_accessories.price.currency.symbol +
        "  " +
        items.product.options["4k"].price.value;
      let disc = null;
      disc = items.product.discount.amount + "   OFF";
      // eslint-disable-next-line default-case
      switch (x) {
        case (x = 1):
          starcon = (
            <div>
              <img className="star" src={star} alt={star}></img>
              {"    "}
            </div>
          );
          break;
        case (x = 2):
          starcon = (
            <div>
              <img className="star" src={star} alt={star}></img>
              <img className="star" src={star} alt={star}></img>
              {"    "}
            </div>
          );
          break;
        case (x = 3):
          starcon = (
            <div>
              <img className="star" src={star} alt={star}></img>
              <img className="star" src={star} alt={star}></img>
              <img className="star" src={star} alt={star}></img>
              {"    "}
            </div>
          );
          break;
        case (x = 4):
          starcon = (
            <div>
              <img className="star" src={star} alt={star}></img>
              <img className="star" src={star} alt={star}></img>
              <img className="star" src={star} alt={star}></img>
              <img className="star" src={star} alt={star}></img>
              {"    "}
            </div>
          );
          break;
        case (x = 5):
          starcon = (
            <div>
              <img className="star" src={star} alt={star}></img>
              <img className="star" src={star} alt={star}></img>
              <img className="star" src={star} alt={star}></img>
              <img className="star" src={star} alt={star}></img>
              <img className="star" src={star} alt={star}></img>
              {"    "}
            </div>
          );
          break;
      }

      return (
        <div class="flex-mainbox">
          <div>
            <img
              className="image"
              src={items.product.gallery["0"].main}
              alt={drone}
            ></img>
          </div>
          <div>
            <div></div>
            <div class="flex-container">
              <div>{content}</div>
              <div>
                <div class="flexheader">
                  {starcon}
                  <div className="revnumber">{" " + rating + " "}</div>

                  <div className="review-text">{revcon}</div>
                  <div className="buyer-text">{buyercon}</div>
                </div>
              </div>
              <div
                style={{
                  borderTop: "1px solid #E6E7EB ",
                  marginBottom: 0,
                  marginRight: 20,
                  marginTop: -5,
                }}
              ></div>
              <div className="Strikegroup">
                <div className="flexheader">
                  <div className="orangeText">{olprice}</div>
                  <div className="gray-text-price">/ option</div>
                  <div className="black-text-price">2 Options</div>
                  <div className="gray-text-price">(Min.Order)</div>
                </div>
                <div className="under-strike-price">{lprice}</div>
              </div>
              <div
                style={{
                  borderTop: "1px solid #E6E7EB ",
                  marginBottom: 0,
                  marginRight: 20,
                  marginTop: 0,
                }}
              ></div>

              <div className="expo-box">
                <div>
                  <img className="expo" src={expo} alt={expo}></img>
                </div>
                <div className="expo-text">
                  <ul>
                    <li>Free shipping (up to $40)</li>
                  </ul>
                </div>
                <div className="expo-text">
                  <ul>
                    <li>On-time delivery guaranteed</li>
                  </ul>
                </div>
              </div>
              <div className="flex-mainbox">
                <div className="orange-disc-text">{disc}</div>
                <div className="graydisc">Discount ends in</div>
                <img className="clock" src={clock} alt={clock}></img>
                <div className="graydisc">{date}</div>
              </div>

              <div className="flex-product-col">
                <div className="flex-col-box">
                  <div className="options-gray">{"Options: "}</div>
                  <div className="black-row-item">
                    {items.product.options["1080p"].label}
                  </div>
                  <div className="black-row-item-2">{HDprice}</div>
                  <div className="button-row">
                    <button
                      className="minus"
                      onClick={this.decreaseHD}
                      disabled={this.state.HD == 0}
                    >
                      -
                    </button>
                    <input
                      className="input"
                      name="HDin"
                      type="number"
                      value={this.state.HD}
                      defaultValue={this.state.HD}
                      onBlur={this.changeHD}
                      onChange={this.changeHD}
                      ref={this.HDref}
                    ></input>
                    <button className="plus" onClick={this.increaseHD}>
                      +
                    </button>
                  </div>
                </div>
                <div className="flex-col-box">
                  <div className="placeholder-space"></div>
                  <div className="black-row-item">
                    {items.product.options["4k"].label}
                  </div>
                  <div className="black-row-item-2">{QHDprice}</div>
                  <div className="button-row">
                    <button
                      className="minus"
                      onClick={this.decreaseQHD}
                      disabled={this.state.QHD == 0}
                    >
                      -
                    </button>
                    <input
                      className="input"
                      type="number"
                      defaultValue={this.state.QHD}
                      value={this.state.QHD}
                      onChange={this.changeQHD}
                      onBlur={this.changeQHD}
                    ></input>
                    <button className="plus" onClick={this.increaseQHD}>
                      +
                    </button>
                  </div>
                </div>
                <div className="flex-col-box">
                  <div className="placeholder-space"></div>
                  <div className="black-row-item">
                    {items.product.options.battery_accessories.label}
                  </div>
                  <div className="black-row-item-2">{Batprice}</div>
                  <div className="button-row">
                    <button
                      className="minus"
                      onClick={this.decreaseB}
                      disabled={this.state.Bat == 0}
                    >
                      -
                    </button>
                    <input
                      className="input"
                      type="number"
                      value={this.state.Bat}
                      onChange={this.changeBat}
                      onBlur={this.changeBat}
                    ></input>
                    <button className="plus" onClick={this.increaseB}>
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="Strikegroup">
                <div className="flexheader">
                  <Secure></Secure>
                  <div className="trade-assurance">{"Trade Assurance"}</div>
                  <div className="disclaim">
                    protects your Alibaba.com orders
                  </div>
                </div>
                <div className="flexspace">
                  <div className="smalltextbox">Payments:</div>
                  <div>
                    <Visa></Visa>
                  </div>
                  <div>
                    <Mcard></Mcard>
                  </div>
                  <div>
                    <Appay></Appay>
                  </div>
                </div>
                <div className="flexend">
                  <div className="smalltext">Alibaba.com Logistics</div>
                  <div className="smalltext">Inspection Solutions</div>
                </div>
              </div>
            </div>
          </div>
          <div className="rightflex">
            <div
              className="sumbox"
              hidden={
                this.state.HD == 0 && this.state.QHD == 0 && this.state.Bat == 0
              }
            >
              <div className="orangeText">Total Summary</div>
              <div className="sums" hidden={this.state.HD == 0}>
                HD camera, QTY = {this.state.HD} Total ={" "}
                {parseFloat(
                  this.state.HD * items.product.options["1080p"].price.value
                ).toFixed(2)}
              </div>
              <div className="sums" hidden={this.state.QHD == 0}>
                QHD camera, QTY = {this.state.QHD} Total ={" "}
                {parseFloat(
                  this.state.QHD * items.product.options["4k"].price.value
                ).toFixed(2)}
              </div>
              <div className="sums" hidden={this.state.Bat == 0}>
                Batteries, QTY = {this.state.Bat} Total ={" "}
                {parseFloat(
                  this.state.Bat *
                    items.product.options.battery_accessories.price.value
                ).toFixed(2)}
              </div>
              <div className="orangeText">
                Total : R{" "}
                {parseFloat(
                  this.state.Bat *
                    items.product.options.battery_accessories.price.value +
                    this.state.QHD * items.product.options["4k"].price.value +
                    this.state.HD * items.product.options["1080p"].price.value
                ).toFixed(2)}
              </div>
            </div>
            <div className="shipbox">
              <div className="flex-row">
                <div className="shiptext">{shiptext}</div>
                <div className="shipprice">{shipval}</div>
              </div>
              <div className="shiplead">
                {"Lead time  " + items.product.shipping.lead_time.value}
                <img
                  className="infotag"
                  data-tip
                  data-for="leadtime"
                  src={info}
                  alt={info}
                ></img>
                <ReactTooltip id="leadtime" place="top" effect="solid">
                  {items.product.shipping.lead_time.info}
                </ReactTooltip>
              </div>
              <div className="shiplead">
                {"Shipping time  " +
                  items.product.shipping.method.shipping_time.value}

                <img
                  className="infotag"
                  src={info}
                  alt={info}
                  data-tip
                  data-for="shiptime"
                ></img>
                <ReactTooltip id="shiptime" place="top" effect="solid">
                  {items.product.shipping.method.shipping_time.info}
                </ReactTooltip>
              </div>
              <div className="buttonflex">
                <button className="login"> Login to Purchase</button>
                <button className="supplier">
                  {" "}
                  <img
                    className="emicon"
                    src={envelope}
                    alt={envelope}
                  ></img>{" "}
                  Contact the Supplier
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default App;
