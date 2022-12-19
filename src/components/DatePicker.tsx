import React from 'react';
import { Box, BoxProps, Slider, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DATE_ORIGIN_MILLISECONDS } from '../constants';

// Slider Aria stuff
function valuetext(value: number) {
  return `${new Date(value)}`;
}

type DateBoxProps = {
  label: string,
  timestamp: number,
}

// Container box for title and date to be displayed
const DateBox = ({ label, timestamp }: DateBoxProps) => {
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
        {new Date(timestamp).toLocaleDateString("fi-FI")}
      </Typography>
    </Box>
  )
}

// Background gradient
const BackgroundBox = styled(Box)<BoxProps>(({ theme }) => ({
  background: `linear-gradient(
    to right,
    ${theme.palette.wallpaper.dark}, 
    ${theme.palette.wallpaper.main}, 
    #1d1e1f)`
}))

export default function DatePicker(props: {
  setTimeRange: Function,
  setIsRenderClicked: Function,
  isDataFetched: boolean,
  yMax: { current: Number}
}) {
  const { setTimeRange, setIsRenderClicked, isDataFetched, yMax } = props

  // Initial values
  const dateMin = DATE_ORIGIN_MILLISECONDS
  const dateMax = new Date().getTime()

  // Initial state
  const [value, setValue] = React.useState<number[]>([dateMin, dateMax]);

  // Slider change
  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  // Modify App state
  const handleClickRender = () => {
    setIsRenderClicked(true)

    yMax.current = 0

    setTimeRange({
      minValue: new Date(value[0]),
      maxValue: new Date(value[1])
    })
  }

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
        <DateBox label={"Start date"} timestamp={value[0]} />
        <Button
          variant='contained'
          onClick={handleClickRender}
          disabled={!isDataFetched}
        >
          Render!
        </Button>
        <DateBox label={"End date"} timestamp={value[1]} />
      </Box>
    </BackgroundBox>
  );
}
