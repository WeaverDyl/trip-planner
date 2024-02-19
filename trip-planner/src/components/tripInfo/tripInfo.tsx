import classes from './tripInfo.module.css';

import { SetStateAction, useState } from 'react';
import { Group, Button, Text, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { Trip } from './trip.model';

interface TripInfoProps {
  trips: Trip[],
  updateTrips: (updater: SetStateAction<Trip[]>) => void,
}

// TODO: take into account holidays
// TODO: take into account overlapping trips (don't double count)
// TODO: indexedDb for saving trip info
// TODO: populate header and footer
// TODO: light/dark mode toggle
// TODO: improve performance

export default function TripInfo({ trips, updateTrips}: TripInfoProps) {
  const [ptoHours, setPtoHours] = useState<number>(0);
  
  function addItem() {
    updateTrips([...trips, { tripName: '', startDate: null, endDate: null }]);
  }

  function removeItem(index: number) {
    updateTrips(trips.filter((_, i) => i !== index));
  }

  function isWeekday(date: Date) {
    const dayOfWeek = date.getDay();
    return dayOfWeek !== 0 && dayOfWeek !== 6; 
  }
  
  function calculateTripPtoHours(startDate: Date, endDate: Date): number {
    if (startDate > endDate) {
      return 0; // Base case: trip end is before start 
    }
  
    const isPtoDay = isWeekday(startDate) ? 8 : 0;
    return isPtoDay + calculateTripPtoHours(new Date(startDate.setDate(startDate.getDate() + 1)), endDate);
  }

  function updatePtoForTrips(trips: Trip[]) {
    const ptoHoursUsed = trips.reduce((currentPtoHours, trip) => {
      if (!trip.startDate || !trip.endDate) {
        return currentPtoHours;
      }

      return currentPtoHours + calculateTripPtoHours(new Date(trip.startDate), new Date(trip.endDate));
    }, 0);

    setPtoHours(ptoHoursUsed);
  }
  
  function updateItem(index: number, value: Trip) {
    updateTrips((prevTrips) => {
      const updatedTrips = prevTrips.map((trip, i) => (i === index ? value : trip));
      updatePtoForTrips(updatedTrips);
  
      return updatedTrips; 
    });
  }

  return (
    <>
      <Text size="lg" fw={700}>Trip Info:</Text>
      <Text fw={700}>PTO Hours used: {ptoHours}</Text>

      <Button onClick={addItem}>Add New Trip</Button>

      <Group>
        {trips.map((item, index) => (
          // TODO: flex
          <div
          className={classes.tripContainer}
          key={index}
          >
            <TextInput
              label="Enter a trip name"
              placeholder='Trip Name'
              value={item.tripName}
              onChange={(e) => updateItem(index, {
                ...trips[index],
                tripName: e.target.value,
              })} 
              />

            <DatePicker
              type="range"
              onChange={([start, end]) => updateItem(index, {
                ...trips[index],
                startDate: start,
                endDate: end,
              })}
              />


            <Button variant="light" color="red" onClick={() => removeItem(index)}>
              Remove Trip
            </Button>
          </div>
        ))}
      </Group>
    </>
  );
}