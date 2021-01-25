import React, {Component} from 'react'
import {Dimensions, StyleSheet, Text, View, ScrollView, SafeAreaView} from 'react-native'
import {DragSortableView} from 'react-native-drag-sort'
const {width} = Dimensions.get('window')

const parentWidth = width;
const childrenWidth = width;
const childrenHeight = 48;

const cellsNum = 10;
let testData = []
for (let i = 0; i < cellsNum; i++) {
  testData.push({txt: `Cell number ${i+1}`, testID: `cellId_${i}`, originalIndex: i});
}

export default class DragAndDropScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: testData,
      scrollEnabled: true,
    }
  }

  render() {
    return (
      <SafeAreaView style={{backgroundColor: '#fff',flex: 1}}>
        <ScrollView
          ref={(scrollView)=> this.scrollView = scrollView}
          scrollEnabled = {this.state.scrollEnabled}
          style={styles.container}>
          <DragSortableView
            dataSource={this.state.data}
            parentWidth={parentWidth}
            childrenWidth= {childrenWidth}
            childrenHeight={childrenHeight}
            scaleStatus={'scaleY'}
            onDragStart={(startIndex,endIndex)=>{
              this.setState({
                scrollEnabled: false
              })
            }}
            onDragEnd={(startIndex)=>{
              this.setState({
                scrollEnabled: true
              })
            }}
            onDataChange = {(data)=>{
              this.setState({
                data: data
              })
            }}
            keyExtractor={(item,index)=> item.testID}
            onClickItem={(data,item,index)=>{
              // Don't do anything, just an example
            }}
            renderItem={(item,index)=>{
              return this.renderItem(item,index)
            }}
          />
        </ScrollView>
        <Text style={styles.bottom_text}>
          {this.cellsOrderToText()}
        </Text>
      </SafeAreaView>
    )
  }

  renderItem(item,index) {
    return (
      <View style={styles.item} testID={item.testID}>
        <View style={styles.item_children}>
          <Text style={styles.item_text}>{item.txt}</Text>
        </View>
      </View>
    )
  }

  cellsOrderToText = () => {
    var text = `Cells order: `
    for (let i = 0; i < cellsNum; i++) {
      if (i > 0) {
        text += ', '
      }
      text += `${this.state.data[i].originalIndex + 1}`
    }

    return text;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3/4,
    backgroundColor: '#f0f0f0',
  },
  item: {
    width: childrenWidth,
    height: childrenHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item_children: {
    width: childrenWidth,
    height: childrenHeight-8,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  item_text: {
    color: '#344feb',
    marginLeft: 12,
    fontSize: 20
  },
  bottom_text: {
    flex: 1/4,
    color: '#1f2b36',
    fontSize: 20,
    marginTop: 12,
    marginHorizontal: 12
  }
})