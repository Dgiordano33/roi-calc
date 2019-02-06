import React, { Component } from 'react';
import logo from './SP_Logo_CLR_RGB_300dpi.png';
import './App.css';
import Organization from './Organization.js';
import Project from './Project.js';
import Savings from './Savings.js';
import CalculatorData from './calculator_data.json'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        orgSalaries: {},
        orgCount: {},
        orgTime: {},
        savingsAmounts: {
          perSprint: 0,
          perYear: 0
        }
      }
    this.handleCountChange = this.handleCountChange.bind(this)
    this.handleSalaryChange = this.handleSalaryChange.bind(this)
    this.handleTimeChange = this.handleTimeChange.bind(this)
    this.handleSavingsCalc  = this.handleSavingsCalc.bind(this)
  }

  componentWillMount() {
    let defaultState = this.state

    for (let i = 0; i < CalculatorData.roles.length; i++) {
      let currentObject = CalculatorData.roles[i]
      
      defaultState.orgCount[currentObject.lookupName] = currentObject.defaultCount
      defaultState.orgSalaries[currentObject.lookupName] = currentObject.defaultSalary
      defaultState.orgTime[currentObject.lookupName] = []
      
      for (let n = 0; n < currentObject.jobs.length; n++) {
        defaultState.orgTime[currentObject.lookupName].push(currentObject.jobs[n].defaultTime)
      }
    }

    this.setState(defaultState)
  }

  handleSavingsCalc(event) {
    let updateState = this.state
    let sprintSavings = 0;
    let yearSavings = 0;

    Array.from(document.getElementsByClassName("sprint")).forEach(function(saving) {
      let formattedNum = saving.outerText.split("$").join("").split(",").join("")

      sprintSavings += parseInt(formattedNum)
    });

    Array.from(document.getElementsByClassName("year")).forEach(function(saving) {
      let formattedNum = saving.outerText.split("$").join("").split(",").join("")

      yearSavings += parseInt(formattedNum)
    });

    updateState["savingsAmounts"]["perSprint"] = sprintSavings
    updateState["savingsAmounts"]["perYear"] = yearSavings

    this.setState(updateState);
  }

  handleCountChange(event) {
    let updateState = this.state

    updateState["orgCount"][event.target.name] = parseInt(event.target.value)

    this.setState(updateState)
  }

  handleSalaryChange(event) {
    let updateState = this.state
    let incomingValue = event.target.value

    if (incomingValue !== "") {
      incomingValue = incomingValue.split('$')[1].split(',').join('')
      updateState["orgSalaries"][event.target.name] = parseInt(incomingValue)
  
      this.setState(updateState)
    } else {
      updateState["orgSalaries"][event.target.name] = 0
  
      this.setState(updateState)
    }
  }

  handleTimeChange(event) {
    let updateState = this.state
    
    let incomingValue = (event.target.value.split("%")[0])
    let incomingTarget = event.target.name.split("_")

    if (incomingValue !== "") {
      updateState["orgTime"][incomingTarget[0]][incomingTarget[1]] = parseInt(incomingValue)

      this.setState(updateState)
    } else {
      updateState["orgTime"][incomingTarget[0]][incomingTarget[1]] = 0
    }
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="header-container">
            <a href="/" class="navbar-brand"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 226.564 28.719">

                    <g transform="translate(59.941 10.091)">
                        <path class="logo-text" d="M169.04,29.521s-3.528-.417-5.008-.417c-2.124,0-3.225.759-3.225,2.238,0,1.631.91,2.011,3.87,2.807,3.642,1.024,4.97,1.973,4.97,4.932,0,3.794-2.39,5.425-5.8,5.425a36.866,36.866,0,0,1-5.653-.683l.266-2.238s3.414.455,5.2.455c2.162,0,3.149-.948,3.149-2.769,0-1.48-.8-1.973-3.452-2.618-3.756-.948-5.349-2.087-5.349-5.122,0-3.49,2.314-4.932,5.766-4.932a38.642,38.642,0,0,1,5.5.607Z" transform="translate(-158 -26.6)"></path>
                        <path class="logo-text" d="M206.5,27.5h4.894l3.87,13.544,3.87-13.544h4.894V44.837h-2.845V29.852h-.152l-4.325,14.265h-2.921l-4.325-14.265h-.152V44.837H206.5Z" transform="translate(-188.1 -27.159)"></path>
                        <path class="logo-text" d="M367.4,27.5h12.671V30h-4.894V44.837h-2.845V30H367.4Z" transform="translate(-287.959 -27.159)"></path>
                        <path class="logo-text" d="M422.2,27.5c3.452,0,5.273,1.29,5.273,4.515,0,2.087-.645,3.149-2.049,3.908,1.48.569,2.466,1.631,2.466,4.021,0,3.528-2.162,4.894-5.5,4.894H415.6V27.5Zm-3.756,2.428V34.9h3.718c1.707,0,2.466-.873,2.466-2.542s-.873-2.39-2.58-2.39h-3.6Zm0,7.322v5.122h3.832c1.745,0,2.769-.569,2.769-2.618,0-1.973-1.48-2.5-2.845-2.5Z" transform="translate(-317.873 -27.159)"></path>
                        <path class="logo-text" d="M466.4,27.5h10.926v2.466h-8.119V34.86h6.6v2.39h-6.6v5.084h8.119V44.8H466.4Z" transform="translate(-349.401 -27.159)"></path>
                        <path class="logo-text" d="M514.849,27.5h5.577l4.287,17.337h-2.845l-1.29-5.084h-5.956l-1.214,5.084H510.6Zm.379,9.75h4.856L518.3,29.814h-1.252Z" transform="translate(-376.832 -27.159)"></path>
                        <path class="logo-text" d="M567.207,39.678V44.8H564.4V27.5h6.563c3.832,0,5.88,2.2,5.88,6.032,0,2.466-.986,4.666-2.845,5.539l2.845,5.767h-3.073l-2.5-5.122h-4.059Zm3.756-9.75h-3.756v7.36h3.832c2.124,0,2.921-1.9,2.921-3.718C573.96,31.6,573.012,29.928,570.963,29.928Z" transform="translate(-410.222 -27.159)"></path>
                        <path class="logo-text" d="M273.025,27.5H278.6l4.287,17.337h-2.845l-1.29-5.084H272.8l-1.29,5.084H268.7Zm.379,9.75h4.856l-1.783-7.436h-1.252Z" transform="translate(-226.703 -27.159)"></path>
                        <path class="logo-text" d="M325.507,39.678V44.8H322.7V27.5h6.563c3.832,0,5.88,2.2,5.88,6.032,0,2.466-.986,4.666-2.845,5.539l2.845,5.767h-3.073l-2.5-5.122h-4.059Zm3.794-9.75h-3.756v7.36h3.832c2.125,0,2.921-1.9,2.921-3.718C332.26,31.6,331.312,29.928,329.3,29.928Z" transform="translate(-260.217 -27.159)"></path>
                    </g>
                    <path class="logo-icon" d="M29.591,24.318H21.549l-1.442,4.4H31Zm21.549,4.4L46.929,15.744,49.66,7.36,39.531,0,32.4,5.2H18.741L11.609,0,1.48,7.36l2.732,8.384L0,28.719H13.316l-1.024-3.187,13.316-9.674,13.316,9.674L37.9,28.719Z"></path>
                </svg> 
              </a>
          </div>
        </header>
        <div className="App-body">
          <div class="container-flex">
            <div class="row">
              <div class="col-md-6">
                <h1 class="display-1 ab-orange">SoapUI Pro ROI Calculator</h1>
              </div>
              <div class="col-md-6">
                <h1 class="display-4">This is the functional testing demo.</h1>
              </div>

              <div class="col-md-3">
                <div className="config-column">
                  <Organization
                    orgSalaries = {this.state.orgSalaries}
                    orgCount = {this.state.orgCount}
                    calculatorData = {CalculatorData}
                    handleCountChange = {this.handleCountChange}
                    handleSalaryChange = {this.handleSalaryChange}
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div className="project-column-container">
                  <Project 
                    orgSalaries = {this.state.orgSalaries}
                    orgCount = {this.state.orgCount}
                    orgTime = {this.state.orgTime}
                    calculatorData = {CalculatorData}
                    handleTimeChange = {this.handleTimeChange}
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div className="savings-column-container">
                  <Savings 
                    savingsAmounts = {this.state.savingsAmounts}
                    handleSavingsCalc = {this.handleSavingsCalc}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
