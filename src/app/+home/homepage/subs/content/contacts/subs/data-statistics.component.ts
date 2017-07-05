import {Component, OnInit} from "@angular/core";
@Component({
  selector: "data-statistics",
  templateUrl: "./data-statistics.component.html"
})
export class DataStatisticsComponent implements OnInit {
  public title: string;
  public option: any;

  constructor() {

  }

  ngOnInit() {
    this.title = '折柱混合';
    this.option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      toolbox: {
        feature: {
          dataView: {show: true, readOnly: false},
          magicType: {show: true, type: ['line', 'bar', 'pipe']},
          restore: {show: true},
          saveAsImage: {show: true}
        }
      },
      legend: {
        data: ['蒸发量', '降水量', '平均温度', '平均湿度']
      },
      xAxis: [
        {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '水量',
          min: 0,
          max: 250,
          interval: 50,
          axisLabel: {
            formatter: '{value} ml'
          }
        },
        {
          type: 'value',
          name: '温度',
          min: 0,
          max: 25,
          interval: 5,
          axisLabel: {
            formatter: '{value} °C'
          }
        }
      ],
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius : '30%',
          center: ['70%', '20%'],
          data:[
            {value:335, name:'直接访问'},
            {value:310, name:'邮件营销'},
            {value:234, name:'联盟广告'},
            {value:135, name:'视频广告'},
            {value:1548, name:'搜索引擎'}
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
              z: 100,
            }
          }
        },
        {
          name: '蒸发量',
          type: 'bar',
          data: [
            {value: 6.0, name: ''},
            {value: 4.9},
            {value: 7.0}
            ]
        },
        {
          name: '降水量',
          type: 'bar',
          data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
        },
        {
          name: '平均温度',
          type: 'line',
          yAxisIndex: 1,
          data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
        },
        {
          name: '平局湿度',
          type: 'line',
          yAxisIndex: 1,
          data: [
            {value: 6.0, name: ''},
            {value: 4.9},
            {value: 7.0}
          ]
        }
      ]
    };
  }
}
