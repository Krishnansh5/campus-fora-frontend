import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, TextField, Divider } from '@mui/material';
import DetailsField from './DetailsField';

interface Person {
  name: string;
  rollNumber: string;
  branch: string;
  hometown: string;
  room: string;
  email: string;
}

const Details: React.FC = () => {
  const [person, setPerson] = useState<Person | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const defaultPerson: Person = {
        name: 'Pranjul Shikhar Verma',
        rollNumber: '220797',
        branch: 'BT/EE',
        hometown: 'Kanpur, UP',
        room: 'H13, D312',
        email: 'pranjulsv22@iitk.ac.in',
      };
      setPerson(defaultPerson);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='details-box'>
      {person ? (
        <div className='details'>
          <div className='sub-details'>
            <div className="fields">Name:</div>
            <DetailsField content={person.name} />
          </div>
          <div className='sub-details'>
            <div className="fields">Roll Number:</div>
            <DetailsField content={person.rollNumber} />
          </div>
          <div className='sub-details'>
            <div className="fields">Branch:</div>
            <DetailsField content={person.branch} />
          </div>
          <div className='sub-details'>
            <div className="fields">Hometown:</div>
            <DetailsField content={person.hometown} />
          </div>
          <div className='sub-details'>
            <div className="fields">Room:</div>
            <DetailsField content={person.room} />
          </div>
          <div className='sub-details'>
            <div className="fields">IITK Email:</div>
            <DetailsField content={person.email} />
          </div>
        </div>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default Details;
