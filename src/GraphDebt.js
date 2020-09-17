import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
import CSVReader from 'papaparse';
import Loader from './Loader';
import TableBar from './TableBar.js';
import 'chartjs-plugin-zoom';


const debt = 'debt'
const debtOver = 'debt_over'
const debtAndOver = 'debt_and_over'
const overall = 'Общая'
const overdue= 'Просроченная'
const debtTitle = 'Вся дебиторская задолженность(USD)'
const debtOverTitle = 'Просроченная дебиторская задолженность(USD)'
const debtAndOverTitle = 'Дебиторская задолженность без стран(USD)'

class GraphDebt extends Component {
  
    constructor() {
      super();
      this.state = {
        isLoading: true,     
        isLoading_fcat: true, 
        csvfile: undefined,
        data:[],
        fcat:[],
        fields:[],
        chartType:debtOver,
        title:debtOverTitle
      };
    }

    async componentDidMount() {

        await new Promise( (resolve, reject) => {
          CSVReader.parse("https://crm.gomselmash.by/zva501_graph_fcat.csv", {
            download: true,
            header: true,
            dynamicTyping: true,
            delimiter:";",
            complete:(results) => {
              this.setState(
                {
                  isLoading_fcat: false,
                  fcat: results.data,
                })            
              
              //console.log(results)
            }
          }) 
          resolve (true);
        });
        await new Promise( (resolve, reject) => {
          CSVReader.parse("https://crm.gomselmash.by/zva501_graph.csv", {
            download: true,
            header: true,
            dynamicTyping: true,
            complete:(results) => {
              results.data.forEach(function(item,i)
                    {
                        if (item.DATA == null){
                           results.data.splice(i,1)
                        }
                    })   
              this.setState(
                {
                  fields:results.meta.fields,
                  isLoading: false,
                  data:results.data

                })   
                console.log(results.data)                   
            }
          }) 
          resolve (true);
        });
      } 

    onDebt=()=>{this.setState({chartType:debt,title:debtTitle})}  
    onDebtOver=()=>{this.setState({chartType:debtOver,title:debtOverTitle})}  
    onDebtAndOver=()=>{this.setState({chartType:debtAndOver,title:debtAndOverTitle})}  
    
    render() {
    let data = this.state.data;
    let labels = [];
    let landx = [];

    let uniqueLabels = [];
    this.state.data.map((element,i)=>(labels.push(element.DATA)))

    labels.forEach(function(item) 
    {
        if(uniqueLabels.indexOf(item) < 0) 
        {
            uniqueLabels.push(item);
        }
    });  
    
    let uniqueLandx = [];
    this.state.data.map((element)=>
    {
      if (this.state.chartType !== debtAndOver) 
      {
        if (element.LANDX !== overall && element.LANDX !== overdue) landx.push(element.LANDX)
      }
      if (this.state.chartType === debtAndOver) 
      {
        if (element.LANDX === overall || element.LANDX === overdue) 
        {
          landx.push(element.LANDX)
        }
      }        
    })

    landx.forEach(function(item) 
    {
        if(uniqueLandx.indexOf(item) < 0) 
        {
            uniqueLandx.push(item);
        }
    });     

    console.log(uniqueLandx)

       let dataset = 
    {
        label: '', 
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,19,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,        
        data: [], // ДАННЫЕ - здесь ваши "количество говорящих" - 652230, 1580, 28748.. - так же в массиве и в том же порядке.        
    }

    var myCSVData =
    {
        labels:[], 
        datasets:[]

    };
    myCSVData.labels = uniqueLabels;
    uniqueLandx.map((land,i)=>
    {
        if (i === 0) {dataset.borderColor = '#7ad319'}
        if (i === 1) {dataset.borderColor = '#d20e45'}
        if (i === 2) {dataset.borderColor = '#ff6900'}  
        if (i === 3) {dataset.borderColor = '#f47373'}
        if (i === 4) {dataset.borderColor = '#b80000'}     
        if (i === 5) {dataset.borderColor = '#2ccce4'}
        if (i === 6) {dataset.borderColor = '#9900ef'}  
        if (i === 7) {dataset.borderColor = '#5300eb'}
        if (i === 8) {dataset.borderColor = '#194d33'}   
        if (i === 9) {dataset.borderColor = '#5d888e'}     
        if (i === 10) {dataset.borderColor = '#cdbc2a'}
        if (i === 11) {dataset.borderColor = '#a11a17'}  
        if (i === 12) {dataset.borderColor = '#4caf50'}
        if (i === 13) {dataset.borderColor = '#7b64ff'}
        if (i === 14) {dataset.borderColor = '#09c618'}
        if (i === 15) {dataset.borderColor = '#f80d2e'}
        if (i === 16) {dataset.borderColor = '#4a84e7'}
        if (i === 17) {dataset.borderColor = '#301c56'}
        if (i === 18) {dataset.borderColor = '#ffeb3b'} 
        if (i === 19) {dataset.borderColor = '#93ff00'}
        if (i === 20) {dataset.borderColor = '#57051f'}
        if (i === 21) {dataset.borderColor = '#0705ff'}

        //console.log(land)
        let cloneDataset = new Object() 
        dataset.label = land
        cloneDataset = Object.assign({}, dataset) 
        cloneDataset.data = [] 
        let findElement = false;
        let debt_usd;
        let chartType = this.state.chartType;
        myCSVData.labels.forEach(function(item_data)
        {
            findElement = false

            data.forEach(function(item) 
            {           
               if (land === item.LANDX && item.DATA === item_data ) {
                   //console.log(item.DATA)
                   if (chartType === debt) {debt_usd = item.DEBT_USD}
                   if (chartType === debtOver) {debt_usd = item.DEBT_OVER_USD}       
                   if (chartType === debtAndOver) {debt_usd = item.DEBT_USD}                                                                                                      
                   cloneDataset.data.push(debt_usd)
                   findElement = true 
                }                            
            }); 

            if (findElement === false)
            {
                cloneDataset.data.push('0')
                //console.log('No data', item_data)
            }
        })
        myCSVData.datasets.push(cloneDataset)
    });
    const defaultTableBar = (
      <React.Fragment>
               <TableBar
                         onDebt={this.onDebt} 
                         onDebtOver={this.onDebtOver}
                         onDebtAndOver={this.onDebtAndOver}
                         chartType = {this.state.chartType}/>
       </React.Fragment>
      );
    const options = {
        title: {
        display: true,
        fontColor:'#000000',
        fontSize:16,
        text: this.state.title
    },      
    zoom: {
      enabled: true,
      mode: 'y',
    },
    pan: {
      enabled: true,
      mode: 'xy',
    },    
      showScale: true,
        scales: {
          xAxes: [
            {
              ticks: {
                //suggestedMax: 10,
                  //min: 1000,
                  //max:30,
                  //stepSize: 3
                }
            }
          ],
          yAxes: [
            {
              ticks: {
              // min: 1000000,
               // max:5000000
               //stepSize: 1000000
              }
            }
          ]
        }
    }  
    const outChart = (
        <div className="container">
        {
          ( this.state.isLoading || this.state.isLoading_fcat )
          ? <Loader />
          : <React.Fragment >
              {defaultTableBar}
              <div style={ {position: "sticky", margin: "left", width: "90vw"} }>
                <Line data={myCSVData} options = {options} title = 'График'/>
              </div>
           </React.Fragment>
        }
        </div>)

    return(          
        <div>{outChart}</div>
    )}}

    export default GraphDebt;