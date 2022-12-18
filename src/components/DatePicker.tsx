import React from 'react';
import { Box, BoxProps, Slider, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DATE_ORIGIN_MILLISECONDS } from '../constants';

// TBD to date
function valuetext(value: number) {
  return `${value}°C`;
}

type DateBoxProps = {
  label: string,
  date: string,
}

// Container box for title and date to be displayed
const DateBox = ({ label, date}: DateBoxProps) => {
  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <Typography sx={{ color: "primary.main" }}>
        {label}
      </Typography>
      <Typography sx={{ color: "primary.main" }}>
        {date}
      </Typography>
    </Box>
  )
}

// Background gradient
const BackgroundBox = styled(Box)<BoxProps>(({ theme }) => ({
  background: `linear-gradient(
    to right,
    ${theme.palette.background.dark}, 
    #313233, 
    ${theme.palette.background.dark})`
}))

export default function DatePicker() {
  const dateMin = DATE_ORIGIN_MILLISECONDS
  const dateMax = new Date().getTime()

  const [value, setValue] = React.useState<number[]>([dateMin, dateMax]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const dateMinString = new Date(value[0]).toLocaleDateString("fi-FI")
  const dateMaxString = new Date(value[1]).toLocaleDateString("fi-FI")

  return (
    <BackgroundBox>
      <Box sx={{
        width: "calc(100%-2em)",
        padding: "2em 4em 0em 4em",
      }}>
        <Slider
          getAriaLabel={() => 'Date range'}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="off"
          getAriaValueText={valuetext}
          min={dateMin}
          max={dateMax}
          step={86400000} // Day in milliseconds
          disableSwap
        />
      </Box>
      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0em 2em 2em 2em",
      }}>
        <DateBox label={"Start date"} date={dateMinString} />
        <Button variant='contained'>
          Render!
        </Button>
        <DateBox label={"End date"} date={dateMaxString} />
      </Box>
    </BackgroundBox>
  );
}
