class Room {
  constructor({ name, bookings, rate, discount }) {
    this._name = name;
    this._bookings = bookings;
    this._rate = rate;
    this._discount = discount;
  }

  addBooking = (booking) => {
    this._bookings.push(booking);
  };

  isOccupied = (date) => {
    return this._bookings.some((booking) => {
      const checkin = new Date(booking._checkin);
      const checkout = new Date(booking._checkout);
      const targetDate = new Date(date);
      return targetDate >= checkin && targetDate <= checkout;
    });
  };
}

class Booking {
  constructor({ name, email, checkin, checkout, discount, room }) {
    this._name = name;
    this._email = email;
    this._checkin = checkin;
    this._checkout = checkout;
    this._discount = discount;
    this._room = room;
  }
}

function suma(a, b) {
  return a + b;
}

module.exports = { suma, Room, Booking };
