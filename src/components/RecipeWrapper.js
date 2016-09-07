var RecipeWrapper = function(props) {
  return (
    <Col md={3} style={RecipeStyle}>
      <RecipeContainer {...props}/>
    </Col>
  )
}
