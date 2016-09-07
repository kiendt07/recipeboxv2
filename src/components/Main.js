require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react'
import {PropTypes} from 'react'
import {ReactFireMixin} from 'reactfire'

import LinkedStateMixin from '../mixins/LinkedStateMixin'

const Bt = require('react-bootstrap');
var Row = Bt.Row;
var Col = Bt.Col;
var Panel = Bt.Panel;

var RecipeStyle = {
  border: '1px solid #fff',
  borderRadius: '10px',
  margin: '1em 2em'
}

var RecipeDetailStyle = {
  margin: '1em',
  textAlign: 'left'
}

var EditableText = React.createClass({
  propTypes: {
    editable: React.PropTypes.bool.isRequired,
    valueLink: React.PropTypes.shape({
      value: React.PropTypes.string.isRequired,
      requestChange: React.PropTypes.func.isRequired
    })
  },

  requestChange (e) {
    e.preventDefault();
    this.props.valueLink.requestChange(e.target.value);
  },
  render () {
    return <input type="text" className="editableText" value={this.props.valueLink.value} onChange={this.requestChange} disabled={!this.props.editable} style={this.props.passingStyle}/>
  }
})

var RecipeDetail = function (props) {
  var passingStyle = {
    textAlign: 'left'
  }
  return (
      <div style={RecipeDetailStyle}>
        <EditableText {...props} passingStyle={passingStyle}/>
      </div>
  )
}

var RecipeName = function (props) {
  var {handleClick, ...other} = props;
  var passingStyle = {
    border: 'none',
    paddingTop: '5px',
    paddingBottom: '10px',
    cursor: 'pointer'
  }
  return (
    <div onClick={handleClick}>
      <EditableText {...other} passingStyle={passingStyle}/>
    </div>
  )
}

var RecipeContainer = React.createClass({
  // mixins: [LinkedStateMixin],
  propTypes: {
    name: React.PropTypes.string.isRequired,
    ingredients: React.PropTypes.array.isRequired
  },

  getInitialState () {
    return {
      toggleShow: false,
      toggleEditable: false,
      name: this.props.name,
      ingredients: this.props.ingredients
    }
  },

  linkState(stateName, index) {
    return {
      value: index === undefined  ? this.state[stateName] : this.state[stateName][index],
      requestChange: value => {
        if (index === undefined)
          this.state[stateName] = value;
        else
          this.state[stateName][index] = value;
        this.setState(this.state);
      }
    }
  },

  render () {
    return (
      <div className="text-center">
        <RecipeName editable={this.state.toggleEditable} handleClick={ ()=> this.setState({toggleShow: this.state.toggleEditable === true ? true : !this.state.toggleShow})} valueLink={this.linkState('name')}/>
        <Panel bsStyle="info" collapsible expanded={this.state.toggleShow} style={{backgroundColor: 'inherit'}}>
          {this.state.ingredients.map( (detail, i) => <RecipeDetail editable={this.state.toggleEditable} valueLink={this.linkState('ingredients', i)} />)}
          <Bt.Button bsStyle="primary" onClick={ ()=> {this.setState({toggleEditable: !this.state.toggleEditable}) }}>
            {this.state.toggleEditable === true ? 'Save' : 'Edit'}
          </Bt.Button>
        </Panel>
      </div>
    )
  }
})

var RecipeWrapper = function(props) {
  return (
    <Col md={3} style={RecipeStyle}>
      <RecipeContainer {...props}/>
    </Col>
  )
}

var RecipeBoxContainer = React.createClass({
  render () {
    return (
      <div className="row">
          <RecipeWrapper key={1} name='abc' ingredients={['a', 'b', 'c']}/>
          <RecipeWrapper key={2} name='abc' ingredients={['a', 'b', 'c']}/>
          <RecipeWrapper key={3} name='abc' ingredients={['a', 'b', 'c']}/>
          <RecipeWrapper key={4} name='abc' ingredients={['a', 'b', 'c']}/>
          <RecipeWrapper key={5} name='abc' ingredients={['a', 'b', 'c']}/>
      </div>
    )
  }
})

var InputState = React.createClass({
  requestChange (e) {
    e.preventDefault();
    this.props.valueLink.requestChange(e.target.value);
  },

  render () {
    return (
      <Bt.FormGroup controlId="formHorizontalEmail">
        <Bt.Col sm={2}>
          {
            this.props.showName === true ?
              <Bt.Col componentClass={Bt.ControlLabel} sm={2}>
                Name
              </Bt.Col>
              : ''
          }
        </Bt.Col>
        <Bt.Col sm={10}>
          <Bt.FormControl type="text" value={this.props.valueLink.value} onChange={this.requestChange}/>
        </Bt.Col>
      </Bt.FormGroup>
    )
  }
})

var RecipeModal = function (props) {
  let recipe = props.valueLink.value;
  let handleChange = function (e) {
    props.valueLink.requestChange(e.target.value);
  }

  return (
    <div className="row text-center" style={{marginTop: '2em', color: '#000'}}>
      <Bt.Button bsStyle="success" bsSize="large" onClick={props.onShow}>
        Add
      </Bt.Button>
      <Bt.Modal show={props.isShow} onHide={props.onHide}>
        <Bt.Modal.Header style={{color: '#fff', textAlign: 'center'}}>
          <Bt.Modal.Title>Add a recipe</Bt.Modal.Title>
        </Bt.Modal.Header>

        <Bt.Modal.Body className="text-center">
          <Bt.Form horizontal>

            <Bt.FormGroup controlId="formHorizontalEmail">
              <Bt.Col componentClass={Bt.ControlLabel} sm={2}>
                Name
              </Bt.Col>
              <Bt.Col sm={10}>
                <Bt.FormControl type="text" value={recipe.name} onChange={handleChange}/>
              </Bt.Col>
            </Bt.FormGroup>
            {recipe.ingredients.map((ingredient, index) => {
              return (
                <Bt.FormGroup controlId="formHorizontalEmail" key={index}>
                  <Bt.Col componentClass={Bt.ControlLabel} sm={2}>
                    #{index + 1}
                  </Bt.Col>
                  <Bt.Col sm={10}>
                    <Bt.FormControl type="text" value={ingredient} onChange={handleChange}/>
                  </Bt.Col>
                </Bt.FormGroup>
              )
            })}
            <Bt.Button bsStyle="success" onClick={props.addIngredients}>
              Add ingredient
            </Bt.Button>
          </Bt.Form>
        </Bt.Modal.Body>


        <Bt.Modal.Footer>
          <Bt.Button onClick={props.onHide}>Close</Bt.Button>
        </Bt.Modal.Footer>
      </Bt.Modal>
    </div>
  )
}

var AddingModal = React.createClass({
  mixins: [ReactFireMixin, LinkedStateMixin],
  getInitialState() {
    return {
      isShow: false,
      recipe: {
        name: '',
        ingredients: []
      }
    }
  },

  addIngredients () {
    this.state.recipe.ingredients.push('');
    this.setState(this.state);
  },

  handleShow () {
    this.setState({
      isShow: true
    })
  },

  handleHide () {
    this.setState({
      isShow: false
    })
  },

  render () {
    return (
      <RecipeModal onShow={this.handleShow} onHide={this.handleHide} isShow={this.state.isShow} valueLink={this.linkState('recipe')}
                   addIngredients={this.addIngredients}
      />
    )
  }
})

var RecipeBoxWrapper = function(props) {
  return (
    <div>
      <h1 className="text-center">Recipe Box</h1>
      <hr/>
      <RecipeBoxContainer />
      <AddingModal />
    </div>
  )
}

class AppComponent extends React.Component {
  render() {
    return (
        <div className="container">
          <RecipeBoxWrapper />
        </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
