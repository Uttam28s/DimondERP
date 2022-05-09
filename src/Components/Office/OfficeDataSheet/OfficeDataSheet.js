import Select from 'react-select'
import { connect } from "react-redux";
import React, {Component} from 'react';
import { MyContext } from "../OfficeIndex";
import Sidebar from "../../Common/Sidebar";
import "react-datasheet/lib/react-datasheet.css";
import ReturnOfficePacket from "../ReturnPacket";
import ReturnOfficeRough from "../ReturnOfficeRough";
import CreateOfficePacket from "../CreateOfficePacket";
import {
  getOfficeList,
  getOfficeSubList,
  getpacketSrNo,
  createSubPacket,
  returnOfficePacket,
} from "../../../Actions/Office";
import {getRoughPrefrence} from "../../../Actions/Rough";

class SelectEditor extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.state = {
      setValue : null,
      selectOpt: null,
    }
  }
  
  // handleChange = (e) => {
  //   this.setState({ setValue : e.target.value });
  // };

  
  handleChange (id,opt) {
    console.log(id,"id")
    console.log(opt.value,"opt")
   
    console.log([this.props],"this.props => SelectEditor")
    this.setState({ selectOpt: opt.value})
    
    const {onCommit, onRevert} = this.props
    if (!opt) {
      return onRevert()
    }
    console.log(onRevert,"onRevert")

    // const { e } = this.state
    // onCommit(opt.value,e) 
    console.log('COMMITTED', opt.value)

     //props pass Function call 
    this.props.cell.drop(opt,[this.props])
  }

  handleKeyDown (e) {
    if (e.which === 13 || e.which === 9) {
      e.persist()
      this.setState({ e })
    } else {
      this.setState({ e: null })
    }
  }
  
  render () {
    let seleted_option={label:this.props.value || "select..."}
    return (
      <Select
        id = {this.props.cell.id}
        // autoFocus
        openOnFocus
        closeOnSelect
        value={seleted_option}
        // placeholder="select..."
        onChange={(value)=> this.handleChange(this.props.cell.id, value)}
        // onChange={(e) => {this.handleChange(e)}}
        onInputKeyDown={this.handleKeyDown}
        options={[
          {label: '1', value: 1},
          {label: '2', value: 2},
          {label: '3', value: 3},
          {label: '4', value: 4},
          {label: '5', value: 5}
        ]}
      />
    )
  }
}


export class DataSheetIndex extends Component {
    constructor(props) {
      super(props);
      this.state = {
        // model: false,
        // manageDataSheet: false,
        // subPacketModel: false,
        pageinationRef: {
          totalCount: 0,
          limit: 10,
          skip: 0,
          currentPage: 1,
        },
        roughList: [],
        tabSelected: 0,
        isActive: false,
        // modelSheet: true,
        // subPacketpageinationRef: {
        //   totalCount: 0,
        //   limit: 10,
        //   skip: 0,  
        //   currentPage: 1,
        // },
        // tableData: [],
        // subPacketData: [],
        // officeSubId: "",
        // officeIdList: [], 
        // srno: 0,
        // // setValue: 5,
        // textbox_value: 0,
        // drop_value : 0,

        grid: [
          [{ readOnly: true, value: "Index"}, { readOnly: true, value: "Item"},{ readOnly: true, value: "Data 1"}, { readOnly: true, value: "Data 2"}, { readOnly: true, value: "Data 3" }, { readOnly: true, value: "Data 4"}, { readOnly: true, value: "Data 5"}, { readOnly: true, value: "Data 6"} ],
          [{ readOnly: true, value: 1},{ value: 'Ordinary Bitter'}, { value: '20 - 35'}, { readOnly: true, value: '5 - 12'}, { id: "dropdown", value: "", valueViewer:SelectEditor, drop: this.onCellsChanged }, { value: 150 }, { value: "india"}, { value: "india"}],
          [{ readOnly: true, value: 2}, { value: 'Special Bitter'}, { value: '28 - 40'}, {readOnly: true, value: '6 - 14'}, { value: "" , valueViewer: SelectEditor, drop: this.onCellsChanged }, { value: 150 }, { value: "india"}, { value: "india"}],
          [{ readOnly: true, value: 3}, { value: 'ESB'}, { value: '30 - 45'}, { value: '6 - 14'}, { value: "" , valueViewer: SelectEditor, drop: this.onCellsChanged }, { value: 150 }, { value: "india"}, { value: "india"}],
          [{ readOnly: true, value: 4}, { value: 'Scottish Light'}, { value: '9 - 20'}, { value: '6 - 15'}, { value: "" , valueViewer: SelectEditor, drop: this.onCellsChanged }, { value: 150 }, { value: "india"}, { value: "india"}],
          [{ readOnly: true, value: 5}, { value: 'Scottish Heavy'}, { value: '12 - 20'}, { value: '8 - 30'}, { value: "" , valueViewer: SelectEditor, drop: this.onCellsChanged }, { value: 150 }, { value: "india"}, { value: "india"}],
          [{ readOnly: true, value: 6}, { value: 'Scottish Export'}, { value: '15 - 25'}, { value: '9 - 19'}, { value: "" , valueViewer: SelectEditor, drop: this.onCellsChanged }, { value: 150 }, { value: "india"}, { value: "india"}],
          [{ readOnly: true, value: 7}, { value: 'English Summer Ale'}, { value: '20 - 30'}, { value: '3 - 7'}, { value: "" , valueViewer: SelectEditor, drop: this.onCellsChanged }, { value: 150 }, { value: "india"}, { value: "india"}],
          [{ readOnly: true, value: 8}, { value: 'English Pale Ale'}, { value: '20 - 40'}, { value: '5 - 12'}, { value: "" , valueViewer: SelectEditor, drop: this.onCellsChanged }, { value: 150 }, { value: "india"}, { value: "india"}],
          [{ readOnly: true, value: 9}, { value: 'English IPA'}, { value: '35 - 63'}, { value: '6 - 14'}, { value: "" , valueViewer: SelectEditor, drop: this.onCellsChanged }, { value: 150 }, { value: "india"}, { value: "india"}],
          [{ readOnly: true, value: 10}, { value: 'Strong Ale'}, { value: '30 - 65'}, { value: '8 - 21'}, { value: "" , valueViewer: SelectEditor, drop: this.onCellsChanged }, { value: 150 }, { value: "india"}, { value: "india"}],
          [{ readOnly: true, value: 11}, { value: 'Old Ale'}, { value: '30 -65'}, { value: '12 - 30'}, { value: "" , valueViewer: SelectEditor, drop: this.onCellsChanged }, { value: 150 }, { value: "india"}, { value: "india"}],
          [{ readOnly: true, value: 12}, { value: 'Pale Mild Ale'}, { value: '10 - 20'}, { value: '6 - 9'}, { value: "" , valueViewer: SelectEditor, drop: this.onCellsChanged }, { value: 150 }, { value: "india"}, { value: "india"}],
          [{ readOnly: true, value: 13}, { value: 'Dark Mild Ale'}, { value: '10 - 24'}, { value: '17 - 34'}, { value: "" , valueViewer: SelectEditor, drop: this.onCellsChanged }, { value: 150 }, { value: "india"}, { value: "india"}],
          [{ readOnly: true, value: 14}, { value: 'Brown Ale'}, { value: '12 - 25'}, { value: '12 - 17'}, { value: "" , valueViewer: SelectEditor, drop: this.onCellsChanged }, { value: 150 }, { value: "india"}, { value: "india"}]
        ],
  
        update_grid: []
      };
    }

  componentDidMount = () => {
    // this.props
    //   .getOfficeList(this.state.pageinationRef)
    //   .then((res) => {
        
    //     for(let date of res.data){
    //       if(date.return_date){
    //         const format_date = date => date.toISOString().slice(0, 10);
    //         const new_date = format_date(new Date(date.return_date))
    //         const modify_date = new_date.split("-").reverse().join("-"); 
    //         date.return_date = modify_date
    //       } 
    //     }

    //     this.setState({
    //       tableData: res.data,
    //       pageinationRef: {
    //         ...this.state.pageinationRef,
    //         totalCount: res.count,
    //       },
    //     });
    //   })
    //   .catch((e) => console.log(e));

    this.props
      .getRoughPrefrence()
      .then((res) => {
        this.setState({
          roughList: res.commonGet.caratList,
          // manageDataSheet: true
        });
      })
      .catch((e) => console.log(e));

    // this.props.getRoughPrefrence().then((res) => {
    //   console.log("RoughIndex -> componentDidMount -> res", res);
    //   this.setState({
    //     caratList: res.commonGet.caratList,
    //   });
    // });
  };

  closeModalSheet = () => {
    this.setState({
      // manageDataSheet: false,
      // modelSheet: false,
      // tabSelected: 0,
    });
  };

  // handelAddDataModal = () => {
  //   this.setState({
  //     model: true,
  //     isActive: false,
  //   });
  // };

  handleCreateSubpacket = (data) => {
     console.log("OfficeIndex -> handleCreateSubpacket -> data", data);
    this.props
      .createSubPacket(data)
      .then((res) => {
        console.log("OfficeIndex -> handleCreateSubpacket -> res", res)
      }
      )
      .catch((e) => console.log(e));
  };

  handelReturnOffice = (data) => {
    console.log("OfficeIndex -> handelReturnOffice -> data", data);
    this.props
      .returnOfficePacket(data)
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };
  
  openSheet = (textInput_start,textInput_end) => {
    const input_start = parseInt(textInput_start)
    const input_end = parseInt(textInput_end)

    console.log(input_start,"input_start box value...")
    console.log(input_end,"input_end box value...")

    var update = 
      input_start === 0 ? [] :
      [
        [
          { readOnly: true, value: "Index"}, 
          { readOnly: true, value: "Item"},
          { readOnly: true, value: "Data 1"}, 
          { readOnly: true, value: "Data 2"}, 
          { readOnly: true, value: "Data 3"}, 
          { readOnly: true, value: "Data 4"}, 
          { readOnly: true, value: "Data 5"}, 
          { readOnly: true, value: "Data 6"} 
        ]
      ]
      for(let i=input_start ; i<=input_end ; i++){
        if(input_start && input_end){
          update.push(this.state.grid[i])
        }
      }

      this.setState({ 
        update_grid: update,
        isActive: true,
        // model: false,
      })
  }

  closeModelSheet = () => {
    this.props.history.push("/office")
    this.setState({
      tabSelected: 0,
    })
  }

  valueRenderer = cell => cell.value;
  onCellsChanged = (opt,data,changes) => {
    console.log(opt,"opt...")
    console.log(data,"data...")
    console.log(changes,"changes of cell....")

    let newGrid = this.state.grid;
    let grid = this.state.update_grid;

    if(data !== undefined){ 
      data.forEach(({ cell, row, col, value }) => {
        if(this.state.isActive === true){
          grid[row][col] = { ...grid[row][col], value: opt.value }
        }
        else{
          newGrid[row][col] = { ...newGrid[row][col], value: opt.value }
        }
        console.log(newGrid[row][col],"newGrid[row][col]")
      });
      this.setState({newGrid});
      console.log(this.state.newGrid,"onCellsChanged")
    }
    else{
      opt.forEach(({ cell, row, col, value }) => {
        if(this.state.isActive === true){
          grid[row][col] = { ...grid[row][col] , value };
        }
        else{
          newGrid[row][col] = { ...newGrid[row][col], value };
        }
        console.log(row , col, "row and column")
      });
      this.setState({newGrid});
      console.log(this.state.newGrid,"onCellsChanged")
    }
  };
  onContextMenu = (e, cell, i, j) =>
    cell.readOnly ? e.preventDefault() : null;
 
    
    render() {
      console.log(this.state.update_grid,"this.state.update_grig - DataSheetIndex.js")

      const tabArray = [
        {
          id: "1",
          lebal: "Create Packet",
          tabContent: (
            <CreateOfficePacket
              modelSheet={true}
              // closeModelSheet={this.closeModelSheet}
              // closeModalSheet={this.closeModalSheet}
              grid={this.state.grid}
              openSheet={this.openSheet}
              close={this.closeModelSheet}
              caratList={this.state.roughList}
              handleCreateSubpacket={this.handleCreateSubpacket}
              data={this.state.isActive === true ? this.state.update_grid : this.state.grid}
              valueRenderer={this.valueRenderer}
              onContextMenu={this.onContextMenu}
              // onCellsChanged={this.state.isActive === true ? onRowChanged : onCellsChanged}
              onCellsChanged={this.onCellsChanged}
            />
          ),
        },
        {
          id: "2",
          lebal: "Return Packet",
          tabContent: (
            <ReturnOfficePacket
              modelSheet={true}
              // closeModelSheet={this.closeModelSheet}
              // closeModalSheet={this.closeModalSheet}
              grid={this.state.grid}
              openSheet={this.openSheet}
              close={this.closeModelSheet}
              caratList={this.state.roughList}
              handleCreateSubpacket={this.handleCreateSubpacket}
              data={this.state.isActive === true ? this.state.update_grid : this.state.grid}
              valueRenderer={this.valueRenderer}
              onContextMenu={this.onContextMenu}
              // onCellsChanged={this.state.isActive === true ? onRowChanged : onCellsChanged}
              onCellsChanged={this.onCellsChanged}
            />
          ),
        },
        {
          id: "3",
          lebal: "Return Rough",
          tabContent: (
            <ReturnOfficeRough
              modelSheet={true}
              // closeModelSheet={this.closeModelSheet}
              // closeModalSheet={this.closeModalSheet}
              grid={this.state.grid}
              openSheet={this.openSheet}
              close={this.closeModelSheet}
              caratList={this.state.roughList}
              handelReturnOffice={this.handelReturnOffice}
              data={this.state.isActive === true ? this.state.update_grid : this.state.grid}
              valueRenderer={this.valueRenderer}
              onContextMenu={this.onContextMenu}
              // onCellsChanged={this.state.isActive === true ? onRowChanged : onCellsChanged}
              onCellsChanged={this.onCellsChanged}
            />
          ),
        },
      ];
  
      return (  
        <>
          {/* <MyContext.Consumer>
            {data => this.setState({ tabarray: data })}
          </MyContext.Consumer>
          {console.log(this.state.tabarray,"this.state.tabarray - DatasheetIndex.js")} */}

          <div className='sheet-Container'>
            <Sidebar  
              data={this.state.grid}
              valueRenderer={this.valueRenderer}
              onContextMenu={this.onContextMenu}
              onCellsChanged={this.onCellsChanged}
              tab={tabArray}
              modelSheet={true}
            />  
          </div>
        </>
      );
    }
  }

const mapStateToProps = (state) => ({...state});
// const mapDispatchToProps = {};
export default connect(null, {
  getOfficeList,
  getOfficeSubList,
  getRoughPrefrence,
  getpacketSrNo,
  createSubPacket,
  returnOfficePacket,
})(DataSheetIndex);