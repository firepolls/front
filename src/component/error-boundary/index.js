import React, { Component } from 'react';

class ErrorBoundary extends Component {
  state = {
    error: null,
    errorInfo: null,
  }

  componentDidCatch(error, errorInfo) {
  // Catch errors in any components below and re-render error message
    this.setState({
      error, // shorthand of below
      errorInfo: errorInfo,
    });
  // Can log error messages to error reporting service here
  }
  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Something went wrong!</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    // Render children as normal if no error
    return this.props.children;
  }
}

export default ErrorBoundary;
