import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  
  const DayListItems = props.days.map(day => {
    return ( 
      <DayListItem 
        key={day.name}
        name={day.name} 
        spots={day.spots} 
        selected={day.name === props.day}
        setDay={props.setDay}  
        />
    );

  });
  return DayListItems;
}