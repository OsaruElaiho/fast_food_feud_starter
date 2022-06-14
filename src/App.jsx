import * as React from "react"
// IMPORT ANY NEEDED COMPONENTS HERE
import { createDataSet } from "./data/dataset"
import "./App.css"
import {Header} from "./components/Header/Header" 
// <Header />
import {Instructions} from "./components/Instructions/Instructions" 
// <Instructions />
import {Chip} from "./components/Chip/Chip"
import {NutritionalLabel} from "./components/NutritionalLabel/NutritionalLabel"


// don't move this!
export const appInfo = {
  title: `Fast Food Feud 🍔!`,
  tagline: `Folks' Favorite Friendly Fuel Finder For Food Facts`,
  description: `Finding healthy food is hard. Sometimes we just settle for what's available. That doesn't mean we shouldn't know what's going into our bodies! Fast Food Feud is here to arm the public with all the nutritional facts needed to make informed decisions about fast food consumption.`,
  dataSource: `All data pulled from the MenuStat.org interactive online database.`,
  instructions: {
    start: `Start by clicking on a food category on the left and a fast food joint from the list above. Afterwards, you'll be able to choose from a list of menu items and see their nutritional content.`,
    onlyCategory: `Now select a fast food restaurant from the list above!`,
    onlyRestaurant: `Now select a category from the list on the left!`,
    noSelectedItem: `Almost there! Choose a menu item and you'll have the fast food facts right at your fingertips!`,
    allSelected: `Great choice! Amazing what a little knowledge can do!`,
  },
}
// or this!
const { data, categories, restaurants } = createDataSet()

export function App() {
  // Store state for a category the user can select with the React.useState hook.
  const [selectedCategory,setSelectedCategory] = React.useState(null)
  const [selectedRestaurant,setSelectedRestaurant] = React.useState(null)
  const [selectedMenuItem,setSelectedMenuItem] = React.useState(null)

  // anonymous function passed to the Chip's onClick handler so that each Chip can be used 
  // to select a different category when clicked 
  const handleCategoryClick = (category) => {
    if(selectedCategory == category){
      setSelectedCategory(null)
    } else{
      setSelectedCategory(category)
    }
  }
  
  // anonymous function passed to the Chip's onClick handler so that each Chip can be used 
  // to select a different restaurant when clicked 
  const handleRestaurantClick = (restaurant) => {
    if(selectedRestaurant == restaurant){
      setSelectedRestaurant(null)
    } else{
      setSelectedRestaurant(restaurant)
    }
  }

  // anonymous function passed to the Chip's onClick handler so that each Chip can be used 
  // to select a different menu item when clicked 
  const handleMenuItemClick = (menuItem) => {
    if(selectedMenuItem == menuItem){
      setSelectedMenuItem(null)
    } else{
      setSelectedMenuItem(menuItem)
    }
  }

  // 
  function handleInstructions() {
    if(instructionsStart){
      return appInfo.instructions.start
    } else if (onlyCategory){
      return appInfo.instructions.onlyCategory
    } else if(onlyRestaurant){
      return appInfo.instructions.onlyRestaurant
    } else if(noSelectedItem){
      return appInfo.instructions.noSelectedItem
    } else if(allSelected){
      return appInfo.instructions.allSelected
    }
  }

  // start: `Start by clicking on a food category on the left and a fast food joint from the list above. 
  // Afterwards, you'll be able to choose from a list of menu items and see their nutritional content.`,
  const instructionsStart = (selectedCategory == null ) && (selectedRestaurant == null)
  // `Now select a fast food restaurant from the list above!`
  const onlyCategory = (selectedCategory != null ) && (selectedRestaurant == null)
  // `Now select a category from the list on the left!`
  const onlyRestaurant = (selectedCategory == null ) && (selectedRestaurant != null)
  // `Almost there! Choose a menu item and you'll have the fast food facts right at your fingertips!`
  const noSelectedItem = (selectedCategory != null ) && (selectedRestaurant != null) && (selectedMenuItem == null)
  // `Great choice! Amazing what a little knowledge can do!`
  const allSelected = (selectedCategory != null ) && (selectedRestaurant != null) && (selectedMenuItem != null)

  // filtering each item depending on if its .food_category attribute is equal to the selected 
  // category and the .restaurant attribute is equal to the selected restaurant.
  const currentMenuItems = data.filter((menuItem) => {
    // boolean value check
    return (menuItem.food_category === selectedCategory) && (menuItem.restaurant === selectedRestaurant)
  })


  return (
    <main className="App">
      {/* CATEGORIES COLUMN */}
      <div className="CategoriesColumn col">
        <div className="categories options">
          <h2 className="title">Categories</h2>
          {/* YOUR CODE HERE */}
          {categories.map((category) => {
            return(
              <Chip
              key={category}
              label={category}
              // true whenever that Chip's category is equal to the one in state
              isActive={category === selectedCategory}
              onClick={() => handleCategoryClick(category)}
              />
              )
          })}
        </div>
      </div>
    
      {/* MAIN COLUMN */}
      <div className="container">
        {/* HEADER GOES HERE */}
        <Header 
        title={appInfo.title}
        tagline={appInfo.tagline}
        description={appInfo.description}
        />
        
        {/* RESTAURANTS ROW */}
        <div className="RestaurantsRow">
          <h2 className="title">Restaurants</h2>
          <div className="restaurants options">
            {/* YOUR CODE HERE */}
            {restaurants.map((restaurant) => {
            return(
              <Chip
              key={restaurant}
              label={restaurant}
              // true whenever that Chip's restaurant is equal to the one in state
              isActive={restaurant === selectedRestaurant}
              onClick={() => handleRestaurantClick(restaurant)}
              />
              )
          })}
          </div>
        </div>

        {/* INSTRUCTIONS GO HERE */}
        <Instructions
        instructions= {handleInstructions()}
        />

        {/* MENU DISPLAY */}
        <div className="MenuDisplay display">
          <div className="MenuItemButtons menu-items">
            <h2 className="title">Menu Items</h2>
            {/* YOUR CODE HERE */}
            {currentMenuItems.map((menuItem) => {
            return(
              <Chip
              key={menuItem.item_name}
              label={menuItem.item_name}
              // true whenever that Chip's menu item is equal to the one in state
              isActive={menuItem === selectedMenuItem}
              onClick={() => handleMenuItemClick(menuItem)}
              />
              )
          })}
          </div>

          {/* NUTRITION FACTS */}
          <div className="NutritionFacts nutrition-facts">
            {/* YOUR CODE HERE */}
            {selectedMenuItem != null && <NutritionalLabel item = {selectedMenuItem}/>}
          </div>
        </div>

        <div className="data-sources">
          <p>{appInfo.dataSource}</p>
        </div>
      </div>
    </main>
  )
}

export default App
