import * as React from "react"
import  "./Chip/Chip.css"
import Chip from "./Chip/Chip"

export function CategoriesColumn(props) {
    return (
        <div className="MenuDisplay display">
        <div className="MenuItemButtons menu-items">
          <h2 className="title">Menu Items</h2>
          {/* YOUR CODE HERE */}
          {currentMenuItems.map((menuItem) => {
            <Chip
            key={menuItem.item_name}
            label={menuItem.item_name}
            // true whenever that Chip's menu item is equal to the one in state
            isActive={menuItem === selectedMenuItem}
            onClick={() => handleMenuItemClick(menuItem)}
            />
        })}
        </div>

        {/* NUTRITION FACTS */}
        <div className="NutritionFacts nutrition-facts">
          {/* YOUR CODE HERE */}
          {selectedMenuItem != null && <NutritionalLabel item = {selectedMenuItem}/>}
        </div>
      </div>
    )
  }
