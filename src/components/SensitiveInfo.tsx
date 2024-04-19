import React, {useState, useEffect} from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import './SensitiveInfo.scss';

interface SensitiveInfoProps {
    value: string | number;
}

export function SensitiveInfo({value}: SensitiveInfoProps) : React.ReactElement {
    const [showInfo, setShowInfo] = useState(false);
    const [obscuredValue, setObscuredValue] = useState<string>('');
    useEffect(() => {
        if (typeof value === 'string') {
            setObscuredValue(value.replace(/./g, '*'));
        } else if (typeof value === 'number') {
            setObscuredValue(value.toString().replace(/./g, '*'));
        }
    }, [value]);

  return (
    <Stack direction="row" spacing={0}>
        <span className='value'>{showInfo ? value : obscuredValue}</span>
        <IconButton style={{marginTop: '-5px'}} className="icon" onClick={() => setShowInfo(!showInfo)}>{showInfo ? <VisibilityOffIcon/> : <VisibilityIcon />}</IconButton>
        <IconButton style={{marginTop: '-5px'}} className="icon" onClick={() => navigator.clipboard.writeText(value.toString())}><ContentCopyIcon/></IconButton>
    </Stack>
    
  )
}