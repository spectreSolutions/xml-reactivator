import React, { Component } from 'react';
import {Jumbotron, Input, Label} from 'reactstrap';
import FileTable from './FileTable';
import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'

class App extends Component {
    constructor(props) {
        super(props);
        this.fileSelectOnChange.bind(this);
        this.state = {files: []}
    }
    fileSelectOnChange = (event) => {
        let fNameArray = event.target.files[0].name.split('.');
        let fNameExt = fNameArray[fNameArray.length - 1];
        if (fNameExt.toLocaleLowerCase() !== "json") {
            return;
        }
        let file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (rfile) => {
            //console.log('fileContents: ', rfile);
            file.content = rfile.currentTarget.result;
            this.setState({files: [...this.state.files, file]});
        };
        reader.readAsText(file);

    }
    render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to the XML Reactivator</h1>
        </header>
          <div>
          <Jumbotron>
              <Label for="fileSelect"></Label>
              <Input type="file" id="fileSelect" onChange={this.fileSelectOnChange} />
          </Jumbotron>
          </div>
          <div>
              <FileTable files={this.state.files}></FileTable>
          </div>
      </div>
    );
  }
}


export default App;
