import React from 'react'
import { PieChart, Pie, Sector } from 'recharts'

const data = [
  { name: 'Topic 2', value: 38.52 },
  { name: 'Topic 3', value: 5.78 },
  { name: 'Topic 4', value: 4.28 },
  { name: 'Topic 5', value: 23.71 },
  { name: 'Topic 7', value: 9.95 },
  { name: 'Topic 10', value: 9.05 },
  { name: 'Topic 11', value: 6.33 },
  { name: 'Topic 13', value: 2.3 },
]

const renderActiveShape = props => {
  const RADIAN = Math.PI / 180
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props
  const sin = Math.sin(-RADIAN * midAngle)
  const cos = Math.cos(-RADIAN * midAngle)
  const sx = cx + (outerRadius + 10) * cos
  const sy = cy + (outerRadius + 10) * sin
  const mx = cx + (outerRadius + 30) * cos
  const my = cy + (outerRadius + 30) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 22
  const ey = my
  const textAnchor = cos >= 0 ? 'start' : 'end'

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={10} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${value}%`}</text>
    </g>
  )
}

class CustomPiechart extends React.Component {
  constructor(props) {
    super()
    this.state = {
      activeIndex: 0,
    }
  }

  getInitialState = () => {
    return {
      activeIndex: 0,
    }
  }

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
    })
  }

  render() {
    console.log(this.props.topics)
    return (
      <div style={{ justifyContent: 'center', textAlign: '-webkit-center' }}>
        <p className="display-4 font-weight-light text-center gradientText">
          Document Breakdown
        </p>

        {this.props.topics.length > 0 ? (
          <PieChart width={400} height={400}>
            <Pie
              activeIndex={this.state.activeIndex}
              activeShape={renderActiveShape}
              data={this.props.topics}
              cx={200}
              cy={150}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              onMouseEnter={this.onPieEnter}
            />
          </PieChart>
        ) : (
          <h1 style={{ textAlign: 'center', marginTop: 90 }}>
            Please analyze a document
          </h1>
        )}
      </div>
    )
  }
}

export default CustomPiechart
