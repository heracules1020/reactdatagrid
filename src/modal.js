import React from 'react';
import Modal from 'react-modal';
import faker from "faker";
import $ from 'jquery';

const customStyles = {
  content : {
    top                   : '40%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    zindex                : '300',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('body');

class StatusModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      statustype: 'Excluded',
      textcomment: faker.random.alphaNumeric(50)
    };

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.modalIsOpen !== this.state.modalIsOpen) {
      this.setState({ modalIsOpen: nextProps.modalIsOpen });
    }

  }

  subStatusChange=()=>{
    document.querySelector('.textcomment').value=faker.random.alphaNumeric(50);
  }

 

  statusChange=() =>{ 
    $(".substatus").hide();
    if(event.target.value)
     $('.'+event.target.value).show();
    this.setState({statustype: event.target.value});
    this.subStatusChange();
  }
 

  afterOpenModal= () => {
    this.subtitle.style.color = '#f00';
  }
  closeModal=() => {
    this.props.onClose(false);
  }

  render() {

    return (
      <div className="divmodal col-lg-8 col-md-8 col-sm-8">
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Status Modal"
        >
          <div className="closeicon"> <h1 ref={subtitle => this.subtitle = subtitle}>Setting Status</h1></div>
          <div className="divheader">
          <label>Status</label>
            <select className="mdb-select md-form md-outline colorful-select dropdown-primary" name="status" onChange={this.statusChange}>
              <option value="Excluded">Excluded</option>
              <option value="With-SDR">With SDR</option>
              <option value="To-RightBound">To RightBound</option>
            </select>
            <label>Sub Status</label>
            <select className="mdb-select md-form md-outline colorful-select dropdown-primary substatus Excluded" name="substatus-Excluded" onChange={this.subStatusChange}>
              <option value="A">By prospect</option>
              <option value="B">Irrelevant company</option>
            </select>
            <select className="mdb-select md-form md-outline colorful-select dropdown-primary substatus With-SDR" name="substatus-With-SDR" onChange={this.subStatusChange}>
              <option value="A">New</option>
              <option value="B">In process</option>
              <option value="C">No response</option>
              <option value="D">Qualified lead</option>
              <option value="E">Deal closed</option>
              <option value="F">Other</option>
            </select>
            <select className="mdb-select md-form md-outline colorful-select dropdown-primary substatus To-RightBound" name="substatus-To-RightBound" onChange={this.subStatusChange}>
              <option value="A">Try other contacts in company</option>
              <option value="B">Try next month</option>
              <option value="C">Try next quarter</option>
              <option value="D">Try next year</option>
            </select>
            
          </div>
          <div className="divcommentheader">Comment</div>
          <div className="divcommentbody">
            <textarea className="textcomment" defaultValue={this.state.textcomment}>
                
            </textarea>
          </div>
          <div className="divbutton">
            <button className="btn btn-primary">Apply</button>
            <button className="btn btn-secondary" onClick={this.closeModal}>Cancel</button>
          </div>
        </Modal>
      </div>
    );
  }
}
export default StatusModal;