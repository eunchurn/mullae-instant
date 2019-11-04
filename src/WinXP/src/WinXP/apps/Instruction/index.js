import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';

const Instruction = () => {
  const [state, setState] = useState({ numPage: null, pageNumber: 1 });

  const onDocumentLoadSuccess = ({numPages}) => {
    setState({...state, numPages});
  }
  const { pageNumber} = state;
  return (
    <div>
      <Document file="/assets/instruction.pdf" onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
    </div>
  )
};

export default Instruction;
