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
}

const Booking = new Booking({
  name: "Lorem ipsun",
  email: "Loremipsun@gmail.com",
  checkin: "2024-05-20",
  checkout: "2024-05-23",
  discount: 15,
  room: RoomExample1,
});

module.exports = { suma, Room, Booking };
