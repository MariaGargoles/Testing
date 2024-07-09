const { suma, Room, Booking } = require("./suma");

test("sumar 1 + 2 es igual a 3, pero queremos probar que el test puede fallar asi que indicamos 4", () => {
  expect(suma(1, 2)).toBe(4);
});

test("isOccupied devuelve true si la habitación está ocupada en una fecha específica", () => {
  const room = new Room({
    name: "Room 1",
    bookings: [],
    rate: 10000,
    discount: 8,
  });

  const booking = new Booking({
    name: "Jane Doe",
    email: "janedoe@gmail.com",
    checkin: "2024-05-01",
    checkout: "2024-05-03",
    discount: 0,
    room: room,
  });

  room.addBooking(booking);

  expect(room.isOccupied("2024-05-01")).toBe(true);
  expect(room.isOccupied("2024-05-03")).toBe(true);
  expect(room.isOccupied("2024-05-11")).toBe(false);
});
