import React from 'react';

const App = ({ children, ...rest }) => (
  <div className="container" {...rest}>
    {children}
  </div>
);

export default App;
