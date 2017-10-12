var React = require('react')
var ReactPivot = require('react-pivot')
var createReactClass = require('create-react-class')

var rows = require('./data.json')

var dimensions = [
  { value: 'date', title: 'Date' },
  { value: 'host', title: 'Host' }
]

var increaseRowCount = function(row, type, memory) {
  return row.type === type
    ? (memory[type + 's'] || 0) + 1
    : memory[type + 's']
}

var reduce = function(row, memory) {
  memory.impressions = increaseRowCount(row, 'impression', memory)
  memory.displays = increaseRowCount(row, 'display', memory)
  memory.loads = increaseRowCount(row, 'load', memory)

  return memory
}

var calculations = [
  {
    title: 'Impressions',
    value: 'impressions'
  },
  {
    title: 'Loads',
    value: 'loads'
  },
  {
    title: 'Displays',
    value: 'displays'
  },
  {
    title: 'Load Rate',
    value: function (row) {
      return ((row.loads / row.impressions) * 100).toFixed(1) + '%'
    }
  },
  {
    title: 'Display Rate',
    value: function (row) {
      return ((row.displays / row.loads) * 100).toFixed(1) + '%'
    }
  }
];

module.exports = createReactClass({
  render () {
    return (
      <div>
        <ReactPivot
          rows={rows}
          dimensions={dimensions}
          calculations={calculations}
          reduce={reduce}
          activeDimensions={['Date', 'Host']}
        />
      </div>
    )
  }
})
