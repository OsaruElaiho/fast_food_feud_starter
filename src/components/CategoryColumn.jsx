import * as React from "react"
import  "./Chip/Chip.css"
import Chip from "./Chip/Chip"

export function CategoriesColumn(props) {
    return (
        <div className="CategoriesColumn col">
        <div className="categories options">
          <h2 className="title">Categories</h2>
          {props.categories.map((category) => {
              <Chip
              key={category}
              label={category}
              // true whenever that Chip's category is equal to the one in state
              isActive={category === props.selectedCategory}
              onClick={() => handleCategoryClick(category)}
              />
          })}
        </div>
      </div>
    )
  }