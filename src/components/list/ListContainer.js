import React, { Component }from 'react';
import PropTypes from 'prop-types';

class ListContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
      // this is a container component state not application state
    };
    //bind functions here - ES6 does not autobind
  }

  render(){
    return(
      <div className="col-md-9">
        <div className="box box-primary">
          <div className="box-header">
            <h3 className="box-title">
              <span className={this.props.icon}></span> {this.props.title} </h3>
            <div className="box-tools">
              {this.props.tools}
            </div>
          </div>{/*box-header*/}
          <div className="box-body">
            {this.props.children}
          </div>{/*box-body*/}
          <div className="box-footer">
            {this.props.footer}
          </div>{/*box-footer*/}
        </div>{/*box*/}
      {/*col-md-9*/}
      </div>
    );
  }
}

ListContainer.propTypes = {
  title: PropTypes.string,
  children: PropTypes.object.isRequired,
  tools: PropTypes.object.isRequired,
  footer: PropTypes.object.isRequired
};

export default ListContainer;
