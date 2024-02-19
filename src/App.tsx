import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import classes from './App.module.css';

import Header from './components/header/header';
import Footer from './components/footer/footer';
import PtoInfo from './components/ptoInfo/ptoInfo';
import TripInfo from './components/tripInfo/tripInfo';
import { useLocalStorage } from '@mantine/hooks';
import { SetStateAction, useState } from 'react';
import { Divider } from '@mantine/core';
import { Trip } from './components/tripInfo/trip.model';

function App() {
  const [currentBalance, setCurrentBalance] = useLocalStorage<string | number>({
    key: 'pto-balance',
    defaultValue: 0,
  });
  
  const [hoursPerPeriod, setHoursPerPeriod] = useLocalStorage<string | number>({
    key: 'pto-per-period',
    defaultValue: 0,
  });

  const [trips, setTrips] = useState<Trip[]>([]);

  function handleUpdateCurrentBalance(val: string | number) {
    setCurrentBalance(val);
  }

  function handleUpdateHoursPerPeriod(value: string | number) {
    setHoursPerPeriod(value);
  }

  function handleUpdateTrips(updater: SetStateAction<Trip[]>) {
    setTrips(updater);
  }

  return (
    <>
      <div className={classes.appContainer}>
        <Header />

        <div className={classes.contentContainer}>
          <PtoInfo
            currentBalance={currentBalance}
            updateCurrentBalance={handleUpdateCurrentBalance}
            hoursPerPeriod={hoursPerPeriod}
            updateHoursPerPeriod={handleUpdateHoursPerPeriod}
          />

          <Divider />

          <TripInfo
            trips={trips}
            updateTrips={handleUpdateTrips}
          />
        </div>

        <Footer />
      </div>
    </>
  )
}

export default App;
