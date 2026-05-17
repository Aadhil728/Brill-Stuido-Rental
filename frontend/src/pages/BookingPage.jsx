import React from 'react';
import BookingForm from '../components/BookingForm.jsx';

function BookingPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-clay">Booking Request</p>
        <h1 className="mt-3 text-4xl font-black sm:text-5xl">Tell us what you need for your studio session.</h1>
      </div>
      <BookingForm />
    </div>
  );
}

export default BookingPage;
