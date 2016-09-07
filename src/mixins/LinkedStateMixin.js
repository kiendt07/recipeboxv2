var LinkedStateMixin = {
  linkState: function(stateName, index) {
    return {
      value: index === undefined  ? this.state[stateName] : this.state[stateName][index],
      requestChange: value => {
        if (index === undefined)
          this.state[stateName] = value;
        else
          this.state[stateName][index] = value;
        this.setState(this.state);
      },
      child: (stateName, index) => {
        return {
          
        }
      }
    }
  }
}

module.exports = LinkedStateMixin;
