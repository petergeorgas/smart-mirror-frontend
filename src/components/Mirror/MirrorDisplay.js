import { Component } from "react";
//Import your components here

//Still needs to be implemented but when MirrorDisplay gets called it will grab the users component array from firebase
//
//Example array
// const comps = [[<TestComp1/>, <BlankComp/>, <TestComp2/>],
//                [<BlankComp/>, <TestComp3/>, <BlankComp/>],
//                [<TestComp1 letter = 'B'/>, <TestComp2/>, <TestComp3/>],
//                [<BlankComp/>, <BlankComp/>, <BlankComp/>]];

var comps = [[]];

const MirrorDisplay = () => {
  console.log(comps[0]);
  return (
    <div className="MirrorBakgrnd">
      <table>
        {comps.map((row, i) => (
          <TableRow key={i} row={row} />
        ))}
      </table>
    </div>
  );
};

export default MirrorDisplay;

class TableRow extends Component {
  render() {
    var row = this.props.row;
    return (
      <tr>
        {row.map((va, il) => (
          <td key={i}>{val}</td>
        ))}
      </tr>
    );
  }
}
