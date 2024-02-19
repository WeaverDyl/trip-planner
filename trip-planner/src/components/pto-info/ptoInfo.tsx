import classes from './ptoInfo.module.css';

import { NumberInput, Text } from "@mantine/core";

interface PtoInfoProps {
  currentBalance: string | number,
  updateCurrentBalance: (val: string | number) => void,
  hoursPerPeriod: string | number,
  updateHoursPerPeriod: (val: string | number) => void,
}

export default function PtoInfo({
  currentBalance,
  updateCurrentBalance,
  hoursPerPeriod,
  updateHoursPerPeriod,
}: PtoInfoProps) {
  return (
    <div className={classes.inputContainer}>
      <Text fw={700}>Current Date: {new Date().toLocaleDateString()}</Text>
      <NumberInput
        label="Enter Current PTO Balance"
        value={currentBalance}
        onChange={updateCurrentBalance}
      />

      <div>
        <NumberInput
          label="Enter Number of Hours Gained per Pay Period"
          value={hoursPerPeriod}
          onChange={updateHoursPerPeriod}
        />

        <Text fw={700}>Hours per year: {Number(hoursPerPeriod) * 24}</Text>
      </div>
    </div>
  )
}