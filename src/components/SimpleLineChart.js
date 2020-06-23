import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

const CustomizedLabel = props => {
  const { x, y, stroke, value } = props
  return (
    <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
      {value}
    </text>
  )
}

const CustomizedAxisTick = props => {
  const { x, y, payload } = props

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">
        {payload.value}
      </text>
    </g>
  )
}

const SimpleLineChart = ({ coherenceValues }) => {
  //console.log(coherenceValues)

  const getRange = () => {
    const EDGE_RANGE = 0.0005
    const valueList = coherenceValues.map(obj => obj.coherence_value)

    let range = []
    let max = Number((Math.max(...valueList) + EDGE_RANGE).toPrecision(4))
    let min = Number((Math.min(...valueList) - EDGE_RANGE).toPrecision(4))
    range.push(min, max)
    return range
  }

  return (
    <div style={{ justifyContent: 'center' }}>
      <p className="display-4 font-weight-light text-center gradientText">
        Model Coherence Values
      </p>

      <LineChart
        width={1050}
        height={300}
        data={coherenceValues}
        margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="num_topics" height={60} tick={<CustomizedAxisTick />} />
        {/* todo make domain dynamic */}
        <YAxis type="number" domain={getRange()} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="coherence_value"
          stroke="#8884d8"
          label={<CustomizedLabel />}
        />
      </LineChart>
    </div>
  )
}

export default SimpleLineChart
