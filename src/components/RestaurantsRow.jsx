import * as React from "react"
import  "./Chip/Chip.css"
import Chip from "./Chip/Chip"

export function CategoriesColumn(props) {
    return (
        <div className="RestaurantsRow">
          <h2 className="title">Restaurants</h2>
          <div className="restaurants options">
            {/* YOUR CODE HERE */}
            {props.restaurants.map((restaurant) => {
              <Chip
              key={restaurant}
              label={restaurant}
              // true whenever that Chip's restaurant is equal to the one in state
              isActive={restaurant === selectedRestaurant}
              onClick={() => handleRestaurantClick(restaurant)}
              />
          })}
          </div>
        </div>
    )
  }
