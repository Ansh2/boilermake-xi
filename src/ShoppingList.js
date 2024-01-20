import React from "react";
// import { database } from "./database.js";

class ShoppingList extends React.Component {
  render() {
    return (
      <div>
        {/*Code to display all items in shopping list*/}
        <div style={{ textAlign: "center" }}></div>
        <div className="input-group">
          <input type="text" className="form-control" />
          <div className="input-group-append">
            {/*this will call on the function I created*/}
            {/* {/* <button onClick={this.addBookCard}>Add Book</button> */}
            <button onClick={this.editBookCard}>Edit Book</button>
            <button onClick={this.deleteBookCard}>Delete Book</button> */
          </div>
        </div>
      </div>
    );
  }
}

export default ShoppingList;


