import React from 'react'

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

module.exports = RecipeContainer;
