import React, { useRef, useState } from 'react';
import { Button, TextField } from '@mui/material';

export default function CopyExample() {

  const [copySuccess, setCopySuccess] = useState('');
  const textAreaRef = useRef(null);

  function copyToClipboard(e) {
    navigator.clipboard.writeText(window.location.href);
    setCopySuccess('Copied!');
  };

  return (
    <div>
        <div>
            <Button 
            color={copySuccess ? "success": "primary"}
            variant="contained" 
            onClick={copyToClipboard}>{copySuccess ? "Copied" : "Copy"}</Button>
        </div>
         
        <TextField
          ref={textAreaRef}
          value={window.location.href}
          helperText="You can share your AnimeList by sharing the link above"
        />
      
    </div>
  );
}