import React, { Component } from "react";
import { FileDrop } from "react-file-drop";
import "./Drag.css";
import Button from "react-bootstrap/Button";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import PublishIcon from "@material-ui/icons/Publish";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: null,
      fileNames: null,
      allowedTypes: "application/pdf",
    };
    this.fileInput = null;
  }
  onTargetClick = () => {
    this.fileInput.click();
  };

  onFileInputChange_Drag = (event) => {
    if (event[0].type === this.state.allowedTypes)
      this.setState({ files: event[0], fileNames: event[0].name });
    else {
      this.props.setError("Please Upload PDF Only");
      this.props.setShowError(true);
    }
  };
  onFileInputChange_Select = (event) => {
    if (this.fileInput.files.length)
      if (this.fileInput.files[0].type === this.state.allowedTypes)
        this.setState({
          files: this.fileInput.files[0],
          fileNames: this.fileInput.files[0].name,
        });
      else {
        this.props.setError("Please Upload PDF Only");
        this.props.setShowError(true);
      }
  };
  setTextInputRef = (element) => {
    this.fileInput = element;
  };

  render() {
    return (
      <div>
        <div className="DragDrop-parent">
          <div
            style={{
              borderStyle: "dashed",
              margin: "5px",
              borderRadius: "10px",
            }}
          >
            <input
              onChange={this.onFileInputChange_Select}
              ref={this.setTextInputRef}
              type="file"
              hidden
              single="true"
              accept=".pdf"
            />
            <FileDrop
              onTargetClick={this.onTargetClick}
              onDrop={this.onFileInputChange_Drag}
              className="DragDrop "
            >
              <div>
                <PublishIcon className="DragDrop-UploadIcon" />
                <div className="DragDrop-inside">
                  <Button className="DragBtnFiles">
                    <h5>
                      {" "}
                      <NoteAddIcon /> Choose Files
                    </h5>
                  </Button>
                  <br />
                  or Drop Files Here
                  <h6 style={{ margin: "5px" }}> (Allowed Formats .pdf)</h6>
                </div>
              </div>

              <div
                style={{
                  fontSize: "18px",
                  display: this.state.fileNames ? "inline-block" : "none",
                }}
              >
                <div className="upload-file-view">
                  <InsertDriveFileIcon />
                  {this.state.fileNames}
                </div>
              </div>
            </FileDrop>
            <Button
              className="DragUploadBtn"
              onClick={() => {
                this.props.AddResume(this.state.files);
              }}
            >
              <CloudUploadIcon /> Upload
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default index;
