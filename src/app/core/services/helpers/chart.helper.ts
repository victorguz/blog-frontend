import { appLocale } from "../../constants.config"
import { valueToCurrency } from "../functions.service"
import { EChartsOption } from 'echarts';

export interface ChartHelperDataset {
  name: string,
  value: number,
  description: any
}

export class ChartHelper {

  static generatePieOptions(dataset: ChartHelperDataset[] = [], title: string = "", description: string = ""): EChartsOption {
    const chartOption: EChartsOption = {
      title: {
        text: title,
        subtext: description,
        left: 'left',
        top: 0,
        textStyle: {
          color: '#57577a'
        }
      },
      tooltip: {
        trigger: 'item',
        // position: "top",
        // formatter: (context) => {
        //   console.log(context[0])
        //   return valueToCurrencyMethod(context[0], currency, descriptions, isCurrency)
        // },
      },
      visualMap: {
        show: false,
        min: 80,
        max: 200,
        inRange: {
          colorLightness: [0.5]
        }
      },

      series: [
        {
          type: "pie",
          radius: '70%',
          center: ['50%', '50%'],
          data: dataset,
          animationDelay: (idx) => idx * 10,
          roseType: 'radius',
          label: {
            color: '#57577a'
          },
          labelLine: {
            lineStyle: {
              color: '#57577a'
            },
            smooth: 0.2,
            length: 5,
            length2: 5
          },
          itemStyle: {
            color: '#DD346D',
            shadowOffsetX: 5,
            shadowOffsetY: 5,
            shadowBlur: 30,
            shadowColor: 'rgba(136, 152, 170, 0.15)'
          },
          animationType: 'scale',
          animationEasing: 'elasticOut',
        },

      ],


    };
    return chartOption;
  }

  static generateBarOptions(dataset: ChartHelperDataset[], title: string = "", description: string = "", isCurrency: boolean = false, currency: string = "COP"): EChartsOption {
    const chartOption: EChartsOption = {
      color: ['#DD346D'],
      title: {
        text: title,
        subtext: description,
        left: 'left',
        top: 0,
        textStyle: {
          color: '#57577a'
        }
      },
      tooltip: {
        trigger: 'axis',
        position: "top",
        formatter: (context) => {
          return ChartHelper.valueToCurrencyMethod(context[0], currency, dataset[context[0].dataIndex].description, isCurrency)
        },
        axisPointer: {
          type: 'cross',
        },
      },
      xAxis: {
        type: 'category',
        data: dataset.map(val => val.name),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          type: "bar",
          data: dataset.map(val => val.value),
          animationDelay: (idx) => idx * 10,
        },
      ],

    };
    return chartOption
  }

  static generateLineOptions(dataset: Array<ChartHelperDataset[]>, title: string = "", description: string = "", isCurrency: boolean = false, currency: string = "COP"): EChartsOption {
    const chartOption: EChartsOption = {
      color: ['#DD346D'],
      title: {
        text: title,
        subtext: description,
        left: 'left',
        top: 0,
        textStyle: {
          color: '#57577a'
        }
      },
      tooltip: {
        trigger: 'axis',
        position: "top",
        formatter: (context) => {
          return ChartHelper.valueToCurrencyMethod(context[0], currency, "", isCurrency)
        },
        axisPointer: {
          type: 'cross',
        },
      },
      xAxis: {
        type: 'category',
        data: dataset[0].map(val => val.name),
      },
      yAxis: {
        type: 'value',
      },
      series: dataset.map(val => {
        return {
          type: "line",
          data: val,
          animationDelay: (idx) => idx * 10,
        }
      })

    };
    return chartOption
  }

  private static valueToCurrencyMethod(context: any, currency: string, description: string, isCurrency: boolean = false) {
    const value = isCurrency ? valueToCurrency(context.data, currency) : context.data
    return (description ? description + " - " : "") + value;
  }
}
