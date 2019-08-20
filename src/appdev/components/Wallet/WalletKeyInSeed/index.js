import React, { Component } from 'react';
import { Input, Radio, Tooltip, Button } from 'antd';
import { observer, inject } from 'mobx-react';
import { toJS } from "mobx";
import intl from 'react-intl-universal';

const { TextArea } = Input;

import './index.less';
import { setDefaultWordlist } from 'bip39';
@inject(stores => ({
  CreateEthAddress : () => stores.walletStore.CreateEthAddress(),
  setCurrent: current => stores.walletStore.setCurrent(current),
  seedphase: stores.walletStore.seedphase,
  ethaddress: stores.walletStore.ethaddress,
  language: stores.languageIntl.language
}))

@observer
class WalletKeyInSeed extends Component {
  state = {
    seedphaseel : null,
    selectedseedphase : [],
    originalseedphase : [],
    nextbuttonstyle : {display:"none"}
  }

  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.get12SeedPhase();
  }

  inputChanged = e => {
    this.setState({ mobilevalue : e.target.value }, () => {
      this.props.setMobile(this.state.mobilevalue);
    });
  }

  get12SeedPhase = () => {
    this.setState({originalseedphase: Array.from(this.props.seedphase) });
  }

  SeedonClick = e => {
    var dataval = e.target.getAttribute('data-val');
    console.log(dataval);
    //e.target.style.display = "none";

    var array = this.state.originalseedphase;
    var index = array.indexOf(dataval);
    array.splice(index, 1);
    this.setState({ originalseedphase: array });

    this.setState(state => {
      const list = state.selectedseedphase.push(dataval);
        return(
          list
        )
      },() => {this.validateseedphase();});
  }

  RestoreonClick = e => {
    var dataval = e.target.getAttribute('data-val');
    //e.target.style.display = "none";

    var array = this.state.selectedseedphase;
    var index = array.indexOf(dataval);
    array.splice(index, 1);
    this.setState({ selectedseedphase: array });

    this.setState(state => {
      const list = state.originalseedphase.push(dataval);
        return(
          list
        )
      },() => {this.validateseedphase();});
  }

  selectSeedPhase = () => {

  }

  copy = () => {
    console.log("COPY");
  }

  next = async () => {
    //this.validateseedphase();
    await this.props.CreateEthAddress();
    this.props.setCurrent("walletdetail");
  }

  validateseedphase = () => {
    console.log(toJS(this.props.seedphase));
    console.log(this.state.selectedseedphase);
    if(JSON.stringify(toJS(this.props.seedphase)) == JSON.stringify(this.state.selectedseedphase)){
      this.setState({nextbuttonstyle : {display:"block"}});
    }else{
      this.setState({nextbuttonstyle : {display:"none"}});
    }
  }

  back = () => {
    this.props.setCurrent("walletcreation");
  }

  render() {
    const { selectedseedphase,originalseedphase,nextbuttonstyle } = this.state;
    const _SeedonClick = this.SeedonClick;
    const _RestoreonClick = this.RestoreonClick;
    return (
      <div>
        <div>
          {
            originalseedphase.map(function(item, i){
              return <li key={i} data-val={item} onClick={_SeedonClick}>{item}</li>
            })
          }
        </div>
        <div style={{marginTop:"50px"}}>
          {
            selectedseedphase.map(function(item, i){
              return <li key={i} data-val={item} onClick={_RestoreonClick}>{item}</li>
            })
          }
        </div>
        <ul>{this.state.seedphaseel}</ul>       
        <Button type="primary" onClick={this.back} >{intl.get('Common.Back')}</Button>
        <div className="steps-action">
          <Button type="primary" style={nextbuttonstyle} onClick={this.next} >{intl.get('Register.next')}</Button>
        </div>
      </div>
    );
  }
}

export default WalletKeyInSeed;