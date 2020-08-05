import React from "react";
import logo from "../logo.svg";
import "../Styles/style.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCoins } from "../store/action/action.creator";

class CoinScreen extends React.Component {
  static propTypes = {
    coins: PropTypes.array,
    getCoins: PropTypes.func,
  };
  //set current page to be one
  //set the state of the arrays, and numberperpage
  state = {
    numberperPages: 10,
    numberOfPages: 0,
    pageList: [],
    currentPage: 1,
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.coins) {
      this.loadList(nextProps.coins);
    }
  }
  //when application starts fetch data from coinlore api
  componentDidMount() {
    this.props.getCoins();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentPage != this.state.currentPage) {
      this.loadList(prevProps.coins);
    }
  }

  //function for next page
  nextPage = () => {
    //always increase the page by one on click of the next button
    if (this.state.currentPage != this.getNumberOfPages())
      this.setState((prevState) => ({
        currentPage: prevState.currentPage + 1,
      })); //fire the loadlist function as callback
  };
  previousPage = () => {
    //always decrease the page by one on click of the previos button
    if (this.state.currentPage != 1) {
      this.setState((prevState) => ({
        currentPage: prevState.currentPage - 1,
      }));
    }
  };

  firstPage = () => {
    //always load first page
    this.setState({
      currentPage: 1,
    });
  };
  lastPage = () => {
    //always load last page
    this.setState({
      currentPage: this.state.numberOfPages,
    });
  };

  loadList = (data) => {
    //set the begin to always start from where it left of
    var begin = (this.state.currentPage - 1) * this.state.numberperPages;
    var end = begin + this.state.numberperPages;

    //use the begin and end to slice from the original array to the pageList array
    //hence 10 every slice
    this.setState({
      numberOfPages: this.getNumberOfPages(),
      pageList: data.slice(begin, end),
    });
  };

  //use this when you want to load the last page
  getNumberOfPages = () => {
    return Math.ceil(this.props.coins.length / this.state.numberperPages);
  };

  render() {
    let table = "";
    //if coinlore api does not return 0 result then display the table
    if (this.props.coins.length > 0) {
      table = (
        <div className="table-div">
          <table>
            <thead>
              <tr>
                <th>💰 Coin</th>
                <th>📄 Code</th>
                <th>🤑 Price</th>
                <th>📉 Total Supply</th>
              </tr>
            </thead>
            <tbody>
              {this.state.pageList.map((result, index) => (
                <tr key={index}>
                  <td key>{result.name}</td>
                  <td>{result.symbol}</td>
                  <td>{result.price_usd}</td>
                  <td>
                    {result.tsupply} {result.symbol}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>
                  <div className="btnPrev">
                    <button
                      type="button"
                      style={{
                        display: this.state.currentPage != 1 ? "block" : "none",
                      }}
                      id="previous"
                      onClick={this.previousPage}>
                      <i className="fas fa-arrow-left"></i> Previous
                    </button>
                  </div>
                </td>
                <td>{/*incase of load first page*/}</td>
                <td>{/*incase of load last page*/}</td>
                <td>
                  <div className="btnNext">
                    <button
                      type="button"
                      style={{
                        display:
                          this.state.currentPage == this.state.numberOfPages
                            ? "none"
                            : "block",
                      }}
                      id="next"
                      onClick={this.nextPage}>
                      Next <i className="fas fa-arrow-right"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      );
    }
    return <main className="table-container">{table}</main>;
  }
}

const mapStateToProps = (state) => ({
  coins: state.coins.item,
  err: state.coins.failed,
});
export default connect(mapStateToProps, { getCoins })(CoinScreen);
