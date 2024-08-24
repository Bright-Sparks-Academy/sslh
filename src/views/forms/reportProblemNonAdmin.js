import React from 'react';

const ReportProblem = () => {
  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div style={{ margin: 0, height: '100%', overflow: 'hidden' }}>
      <iframe
        src="https://tally.so/r/nGLj5O"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          border: 0,
          width: '100%',
          height: '100%'
        }}
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        title="Report a Problem"
      ></iframe>
    </div>
  );
};

export default ReportProblem;