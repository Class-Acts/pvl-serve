import React from 'react';
import './styles/Header.css';
import ReactModal from 'react-modal';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sorting: false,
      sortedBy: this.props.sortedBy,
      sortOptions: [
        'Newest questions',
        'Newest answers',
        'Most answered',
        'Answers needed',
        'Most helpful answers'
      ]
    };
    this.isSorting = this.isSorting.bind(this);
    this.setSort = this.setSort.bind(this);
  }

  isSorting() {
    if (!this.state.sorting) {
      this.setState({sorting: true})
    } else {
      this.setState({sorting: false})
    }
  }

  componentDidMount() {
    this.setState({sortedBy: this.props.sortedBy })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.sortedBy !== this.props.sortedBy) {
      this.setState({ sortedBy: this.props.sortedBy })
    }
  }

  setSort(e) {
    let target = e.target;
    let name = target.name;
    this.props.sortBy(name);
  }

  render() {
    if (!this.state.sorting) {
      return (
        <div className="header">
          <h2 className="QnA">Questions & Answers</h2>
          <div className="ask">
            <button onClick={(e) => {e.preventDefault(); this.props.askQuestion()}} className="askHere green-button" type="button">Ask a question</button>
          </div>
          <div className="bottomRow">
            <span className="showing">1 - {' ' + this.props.length} of{' '}{this.props.length}{' '}Questions</span>
            <div className="sort">
              <div className="sort-container" onMouseEnter={this.isSorting} onMouseLeave={this.isSorting}>
                <div className="sortMe">Sort by:</div>
                <div className="sortedBy">{this.state.sortedBy}</div>
                <div className="arrow"></div>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="header">
        <h2 className="QnA">Questions & Answers</h2>
        <div className="ask">
          <button onClick={(e) => {e.preventDefault(); this.props.askQuestion()}} className="askHere green-button" type="button">Ask a question</button>
        </div>
        <div className="bottomRow">
          <span className="showing">1 - {' ' + this.props.length} of{' '}{this.props.length}{' '}Questions</span>
          <div className="sort">
            <div className="sort-container" onMouseEnter={this.isSorting}>
              <div className="sortMe">Sort by:</div>
              <div className="sortedBy">{this.state.sortedBy}</div>
              <div className="arrow"></div>
            </div>
            <div className="sort-menu" onMouseLeave={this.isSorting}>
              {this.state.sortOptions.map((option, index) => {
                return (
                  <button onClick={this.setSort} key={index} type="button" name={option} className="sort-option">{option}</button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      )
    }
  }
}

export default Header;

// onMouseLeave={this.isSorting}