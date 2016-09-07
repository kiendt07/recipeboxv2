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

module.exports = RecipeBoxContainer;
