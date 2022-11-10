import { Router } from "express";
import { Component } from "react";
import TheDate from "../TheDate/TheDate";
import Clock from "../Clock/Clock";
import News from "../News/News";
//Import your components here


//Still needs to be implemented but when MirrorDisplay gets called it will grab the users component array from firebase
//
//Example array
const comps = [[<BlankComp/>, <Clock/>, <TheDate/>],
               [<BlankComp/>, <BlankComp/>, <BlankComp/>],
               [<BlankComp/>, <BlankComp/>, <BlankComp/>],
               [<BlankComp/>, <News/>, <BlankComp/>]];



const MirrorDisplay = () => {

    const DivClick = () => 
    {
        Router.push("/workout");
    }

    console.log(comps[0]);
  return (
    <div className='MirrorBakgrnd' onclick={DivClick}>
        <table>
            {comps.map(row => <TableRow row={row}/>)}
        </table>
    </div>
  )
}

export default MirrorDisplay

class TableRow extends Component{
    render() {
        var row = this.props.row;
        return (
            <tr>
                {row.map(val => <td>{val}</td>)}
            </tr>
        )

    }
}

function BlankComp(){
    return (
        <div>
            {/* Blank Componant */}
        </div>
    )
}


