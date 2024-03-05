// import { ResponsiveBar } from '@nivo/bar'
import {
  LineChart,
  BarChart,
  DonutChart,
  Legend,
  AreaChart
} from '@tremor/react'
import '../Dashboard.css'
import './test.module.css'
const HotelCharts = ({ user, data }) => {
  const chartdata = [
    {
      name: 'January',
      'Hotel 1': 890,
      'Hotel 2': 338,
      'Hotel 3': 538,
      'Hotel 4': 396,
      'Hotel 5': 138,
      'Hotel 6': 436
    },
    {
      name: 'February',
      'Hotel 1': 289,
      'Hotel 2': 233,
      'Hotel 3': 253,
      'Hotel 4': 333,
      'Hotel 5': 133,
      'Hotel 6': 533
    },
    {
      name: 'March',
      'Hotel 1': 380,
      'Hotel 2': 535,
      'Hotel 3': 352,
      'Hotel 4': 718,
      'Hotel 5': 539,
      'Hotel 6': 234
    },
    {
      name: 'April',
      'Hotel 1': 90,
      'Hotel 2': 98,
      'Hotel 3': 28,
      'Hotel 4': 33,
      'Hotel 5': 61,
      'Hotel 6': 53
    }
  ]

  console.log(`data:${data[0].category}`)
  // const dataFormatter = (number: number) =>
  // Intl.NumberFormat('us').format(number).toString();
  return (
    <div id="hotel">
      {/* <div style={{ height: '700px', width: '50%' }}>
        {data && data.length > 0 && (
          <ResponsiveBar
            data={data}
            indexBy="Hotel"
            keys={[
              'January',
              'February',
              'March',
              'April',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December'
            ]}
            colors={{ scheme: 'spectral' }}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Hotel',
              legendPosition: 'middle',
              legendOffset: 32,
              truncateTickAt: 0
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Bookings',
              legendPosition: 'middle',
              legendOffset: -40,
              truncateTickAt: 0
            }}
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            legends={[
              {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: -59,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemOpacity: 1
                    }
                  }
                ]
              }
            ]}
            // ... (chart configuration)
          />
        )}
      </div> */}
      <BarChart
        className="mt-6"
        data={data}
        index="Hotel"
        categories={['Bookings']}
        yAxisWidth={65}
        colors={['indigo', 'cyan']}
        // valueFormatter={dataFormatter}
      />
      <LineChart
        className="mt-6"
        data={data}
        index="Hotel"
        categories={['Bookings']}
        colors={['blue']}
        // valueFormatter={dataFormatter}
        yAxisWidth={48}
      />
      <div className="flex items-center justify-center space-x-6">
        <DonutChart
          data={data}
          category="Bookings"
          index="Hotel"
          // valueFormatter={valueFormatter}
          colors={[
            'blue',
            'cyan',
            'indigo',
            'violet',
            'fuchsia',
            'orange',
            'green',
            'yellow'
          ]}
          className="w-40"
        />
        <AreaChart
          className="mt-4 h-72"
          data={data}
          index="Hotel"
          categories={['Bookings']}
          colors={['blue']}
          yAxisWidth={48}
        />
        <BarChart
          className="mt-6"
          data={chartdata}
          index="name"
          categories={[
            'Hotel 1',
            'Hotel 2',
            'Hotel 3',
            'Hotel 4',
            'Hotel 5',
            'Hotel 6'
          ]}
          colors={['blue', 'teal', 'amber', 'rose', 'indigo', 'emerald']}
          // valueFormatter={dataFormatter}
          yAxisWidth={48}
        />
      </div>
    </div>
  )
}
export default HotelCharts
