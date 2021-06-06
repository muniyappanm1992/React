import React from 'react';
const ListGroup = (props) => {
    console.log(props);
    const {items,valueProperty,textProperty,onItemSelect,selectedItem}=props;
    return ( 
    <ul className="list-group">
    {items.map(item=>
        <li onClick={()=>onItemSelect(item)} key={item[valueProperty]} className={item!==selectedItem? "list-group-item clickable":"list-group-item clickable active"} aria-current="true">{item[textProperty]}</li>
    )}
  </ul> )
}
ListGroup.defaultProps={
    valueProperty:"_id",
    textProperty:"name"
} 
export default ListGroup;