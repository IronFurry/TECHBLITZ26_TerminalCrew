export const doctors = [
  { id: 1, name: 'Dr. Priya Sharma', email: 'doctor@clinic.com', role: 'doctor', initials: 'PS' },
  { id: 2, name: 'Dr. Rohan Mehra', initials: 'RM' },
];

export const patients = [
  { id: 'CR-542', name: 'James Rodriguez', phone: '+1 234 567 890', age: 34, dob: 'Jan 12, 1991', lastVisit: '2 weeks ago', status: 'In Progress' },
  { id: 'CR-589', name: 'Sarah Mitchell', phone: '+1 234 567 891', age: 28, lastVisit: 'Today', status: 'Completed' },
  { id: 'CR-612', name: 'Henry Klein', phone: '+1 234 567 892', age: 45, lastVisit: '1 month ago', status: 'Upcoming' },
  { id: 'CR-705', name: 'Eleanor Bennett', phone: '+1 234 567 893', age: 31, lastVisit: '3 months ago', status: 'Upcoming' },
];

export const appointments = [
  { id: 1, patientId: 'CR-589', patientName: 'Sarah Mitchell', time: '09:00 AM', duration: '30 Min', type: 'Regular check-up', status: 'Completed' },
  { id: 2, patientId: 'CR-542', patientName: 'James Rodriguez', time: '10:30 AM', duration: '45 Min', type: 'Post-surgery consultation', status: 'In Progress' },
  { id: 4, patientId: 'CR-705', patientName: 'Eleanor Bennett', time: '12:30 PM', duration: '15 Min', type: 'Blood test results review', status: 'Confirmed' },
  { id: 5, patientId: 'CR-612', patientName: 'Henry Klein', time: '01:00 PM', duration: '60 Min', type: 'Annual physical examination', status: 'Rescheduled' },
];

export const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM'
];

export const bookedSlots = ['09:00 AM', '10:30 AM', '12:30 PM', '01:00 PM'];

export const patientUsers = [
  { id: 'p1', email: 'suresh@patient.com', password: 'demo1234',
    name: 'Suresh Patil', initials: 'SP', role: 'patient' },
  { id: 'p2', email: 'meena@patient.com', password: 'demo1234',
    name: 'Meena Kulkarni', initials: 'MK', role: 'patient' },
  { id: 'p3', email: 'amit@patient.com', password: 'demo1234',
    name: 'Amit Shah', initials: 'AS', role: 'patient' },
];
