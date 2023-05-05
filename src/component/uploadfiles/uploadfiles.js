import React, { Component } from "react";
import UploadService from "../../services/uploadfiles";
import DataTable from 'react-data-table-component';
import "bootstrap/dist/css/bootstrap.css";
import "./uploadfiles.css"

export default class UploadFiles extends Component {
  constructor(props) {
    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.upload = this.upload.bind(this);

    this.state = {
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: ""
    };
  }

  employeeResponse = [];

  columns = [
    {
      selector: row => row.employeenumber,
      sortable: true,
      name: "Employee number",
      width: "150px"
    },
    {
      selector: row => row.firstname,
      sortable: true,
      name: "First Name",
      width: "150px"
    },
    {
      selector: row => row.lastname,
      sortable: true,
      name: "Last Name",
      width: "150px"
    },
    {
      selector: row => row.mobilenumber,
      sortable: true,
      name: "Mobile number",
      width: "150px"
    },
    {
      selector: row => row.email,
      sortable: true,
      name: "Email",
      width: "200px"
    },    
    {
      selector: row => row.message,
      sortable: true,
      name: "Message",
      wrap: true
    }
  ];

  conditionalRowStyles = [
    {
      when: row => row.responsetype === "error",
      style: {
        backgroundColor: 'red',
        color: 'white',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    }
  ];

  selectFile(event) {
    this.setState({
      selectedFiles: event.target.files,
    });
  }

  upload() {
    let currentFile = this.state.selectedFiles[0];

    this.setState({
      progress: 0,
      currentFile: currentFile,
    });

    UploadService.upload(currentFile, (event) => {
      this.setState({
        progress: Math.round((100 * event.loaded) / event.total),
      });
    })
      .then((response) => {
        this.setState({
          message: response.data.message,
        });
        this.employeeResponse = response.data;
      })
      .catch(() => {
        this.setState({
          progress: 0,
          message: "Could not upload the file!",
          currentFile: undefined,
        });
      });

    this.setState({
      selectedFiles: undefined,
    });
  }

  render() {
    const {
      selectedFiles,
      currentFile,
      progress,
      message
    } = this.state;

    return (
      <div>

        <div class="file-upload">
          <input type="file" id="input-file" onChange={this.selectFile} />
          <button id="upload-button" disabled={!selectedFiles}
            onClick={this.upload}>Upload</button>
            <div>
            {currentFile && (
                <div className="progress">
                  <div
                    className="progress-bar progress-bar-info progress-bar-striped"
                    role="progressbar"
                    aria-valuenow={progress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: progress + "%" }}
                    
                  >
                    {progress}%
                  </div>
                </div>
              )}
            </div>            
        </div>

        <div class="rdt_Table">
          <DataTable
            title="Summary Report"
            columns={this.columns}
            data={this.employeeResponse}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="900px"
            conditionalRowStyles={this.conditionalRowStyles}
            persistTableHead="true"
            wrap = "false"
          />
        </div>

      </div>
    );
  }
}